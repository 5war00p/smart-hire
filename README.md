# SmartHire - AI powered

### Install dependencies

```bash
pnpm install
```

### Run Localhost

```bash
pnpm dev
```

### Setup ENV

Follow the env keys from `.env.example` and set your own values by creating `.env` file.

## How it works?

#### Tools & Frameworks used:
- Node.js
- TypeScript
- Next.js App router - Server with SSR and edge
- React.js - Frontend framework
- TailwindCSS - Styling
- HeadlessUI - UI Component library
- TanstackQuery
- Sequelize - MySQL ORM
- Lodash - Functional Programming approach to manipulate data strucures
- OpenAI - Embeddings and Completions
- Pineconce: for VectorDB

#### Flow chart
<img width="1263" alt="image" src="https://github.com/5war00p/smart-hire/assets/57614947/8e0ba4e1-6fe3-469d-9a24-f14ac1126d9a">
<br/>
User can initiate a query either by clicking one of the suggestion or entering own query. Once the query is submitted, Assistant will process it.

Assistant is instructed to carry out the following tasks:
1. Keeps context of entire session (chat)
2. Process the query and look for required params
3. If any data/clarifications needed then ask follow up questions to the user
4. Execute a tool_call(_**getCandidates**_ fuction_call) when the required details are obtained.


The current implementation uses ChatCompleteion API as we depend on simple RAG interactions, by passing the entire chat as context for every query. The reason for this is this application doesn't need more chat to keep in the context, it will be hardly 5-10 prompts and then results. But this can be done with Assistant's API without local context management.

definition of `getCandidates` function_call:
```ts
 {
  type: "function",
  function: {
    name: "getCandidates",
    description: "Get candidate matches using the given requirements",
    parameters: {
      type: "object",
      properties: {
        skills: {
          type: "string",
          description:
            "Skills for the role, e.g. Python, Node.js, React.js",
        },
        budgetRange: {
          type: "string",
          description:
            "Budget range, e.g. < $10k per month, $2k-$10k per month",
        },
        employmentType: {
          type: "string",
          description: "Employment type, e.g. part-time, full-time",
        },
        yearsOfExperience: {
          type: "string",
          description: "Experience required, e.g. > 2 years",
        },
      },
      required: ["skills", "budgetRange", "employmentType"],
    },
  },
},
```
the above function is responsible to convert the data into a meaningful sentence and sends to OpenAI embed model to get vectorized query.

Query Formulation:
```ts
const query = `Get me candidates who's skills matches fully or partially with these skills: ${skills}
under budget range of ${budgetRange} with the availability of ${employmentType} having ${yearsOfExperience} experience`;
```

Once query got vectorized the Similarity Search on pinecone index will be executed. Finally the matches will be parsed accordingly and shown in the UI.

## Seeding

With the help of `sequelize` ORM the MySQl data will be extracted → processed → formulated → upserted to Vector DB.

In data processing step the required data will be converted as a single javascript object using `lodash` and `sequelize` methods which will have the following fields:
```ts
interface Education {
  degree: string;
  startDate: string;
  endDate: string;
  grade: string;
  school: string;
  major: string;
}

interface WorkExperience {
  company: string;
  location: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface UserData {
  userId: string;
  name: string;
  location: string;
  email: string;
  phone: string;
  ocrGithubUsername: string;
  preferredRole: string;
  fullTimeStatus: "yes" | "no" | "both";
  workAvailability: string;
  fullTimeSalary: string;
  partTimeSalary: string;
  fullTime: number;
  fullTimeAvailability: number | null;
  partTime: number;
  partTimeAvailability: number | null;
  skills: string[];
  educations: Education[];
  workExperiences: WorkExperience[];
}
```

Now to make it Assistant friendly, the data will be formulated like below:
```ts
const doc = `
Candidate details:
  - Name: ${data.name}
  - Location: ${data.location}
  - Email: ${data.email}
  - Phone: ${data.phone}
  - PreferredRole: ${data.preferredRole}
  - InterestedInFullTime: ${
    data.fullTime === 1 || data.fullTimeStatus === "both"
  }
  - InterestedInPartTime: ${
    data.partTime === 1 || data.fullTimeStatus === "both"
  };
  - WorkAvailability: ${data.workAvailability}
  - ExpectedFullTimeSalary: ${data.fullTimeSalary}
  - ExpectedPartTimeSalary: ${data.partTimeSalary}
  - FullTimeAvailability: ${data.fullTimeAvailability}
  - PartTimeAvailability:${data.partTimeAvailability}
  - Skills: ${data.skills}
  - Educations: ${data.educations}
  - WorkExperiences: ${data.workExperiences}
`;
```

So at the embedding step each user object will become a string with all the required fields. But emebbeding and upsert will happen by batching 100 users data together.

Thats it. Now, pinceone dashboard will show up stats of the upserted indexes.
