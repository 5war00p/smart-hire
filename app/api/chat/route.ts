import openai from "@/app/_clients/openai";
import pinecone from "@/app/_clients/pinecone";
import embedder from "@/utils/embedder";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const runtime = "edge";

export const getCandidates = async (
  skills: string,
  budgetRange: string,
  employmentType: string
) => {
  const query = `Get me candidates who's skills 
    matches fully or partially with these skills: ${skills} under budget 
    range of ${budgetRange} with the availability of ${employmentType}`;

  const embeddings = await embedder.embedQuery(query);

  const matches = await pinecone.getMatchesFromEmbeddings(embeddings, 2);

  return JSON.stringify(matches);
};

export async function POST(request: Request) {
  const requestBody = (await request.json()) as {
    chat: ChatCompletionMessageParam[];
  };
  try {
    if (!requestBody.chat) throw new Error("Missing required fields!");

    const openaiResponse = openai.openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content: `You are a helpful chat assistant for recruiters of a job portal.
            The only job you have is whenever a recruiter comes up with a query you look for skill, budget and nature of employment(part-time/full-time) in the query,
            Use the entire chat as a context and if chat doesn't have any one of the required parameter value then you ask the follow up relevant question to get the required info.
            
            Consider several possibles ways of entering budget, skills and nature of employment(part-time/full-time) from the user.

            Once you got budget, skills and duration before using the getCandidates function you should *always* tell user that you are processing results without mentioning the given data.

            Function:
            - getCandidates, when user provides skills, budget and employment type

            Note: You don't need to introduce or hallucinate yourself.
          `,
        },
        ...requestBody.chat,
      ],
      tools: [
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
              },
              required: ["skills", "budgetRange", "employmentType"],
            },
          },
        },
      ],
    });

    const data = (await openaiResponse).choices[0].message;
    const message = data.content;

    // console.log(">>> message", message);

    if (data.tool_calls) {
      const functionArgs = JSON.parse(data.tool_calls[0].function.arguments);
      const functionResponse = await getCandidates(
        functionArgs.skills,
        functionArgs.budgetRange,
        functionArgs.employmentType
      );
      // const secondResponse = await openai.openai.chat.completions.create({
      //   model: "gpt-4-1106-preview",
      //   messages: [
      //     // ...requestBody.chat,
      //     data,
      //     {
      //       tool_call_id: data.tool_calls[0].id,
      //       role: "tool",
      //       content: functionResponse,
      //     },
      //   ],
      // });

      const result = {
        role: "assistant",
        content: JSON.stringify({ message, results: functionResponse }), //secondResponse.choices[0].message.content,
      };
      return Response.json({ result });
    }
    const result = {
      role: "assistant",
      content: message,
    };
    return Response.json({ result });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Something went wrong!",
      err,
    });
  }
}
