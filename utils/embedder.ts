import openai from "@/app/_clients/openai";
import { PineconeRecord } from "@pinecone-database/pinecone/dist/data/types";
import { UserData } from "@/utils/types";

class Embedder {
  async embedQuery(data: string): Promise<number[]> {
    try {
      // Generate OpenAI embeddings for the query
      const embedding = await openai.getEmbeddings(data);

      return embedding;
    } catch (error) {
      throw new Error(`Error embedding document: : ${error}`);
    }
  }

  async embedUserRecord(data: UserData): Promise<PineconeRecord> {
    try {
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

      // ? Approach-1: Constraining some fields by making into a sentence with required fields
      // const doc = `${data.name} have knowledge in ${data.skills.join(
      //   " "
      // )} with having experiences of ${
      //   data.workExperiences
      // } and qualifications of ${data.educations}
      //      and can contribute ${
      //        data.fullTimeStatus === "yes"
      //          ? ` either part-time for $${data.partTimeSalary} per month or full-time for $${data.fullTimeSalary} per month`
      //          : `only part-time for ${data.partTimeSalary} per month`
      //      }`;

      // Generate OpenAI embeddings for the user data
      const embedding = await openai.getEmbeddings(doc);

      // Return the vector embedding object
      return {
        id: data.userId, // The ID of the vector is the userId of the data
        values: embedding, // The vector values are the OpenAI embeddings
        metadata: {
          ...data, // Meta data will contain entire user data to show in the frontend
          fullTimeAvailability: data.fullTimeAvailability ?? "",
          partTimeAvailability: data.partTimeAvailability ?? "",
          educations: data.educations ? JSON.stringify(data.educations) : "[]",
          workExperiences: data.workExperiences
            ? JSON.stringify(data.workExperiences)
            : "[]",
        },
      } as PineconeRecord;
    } catch (error) {
      throw new Error(`Error embedding document: : ${error}`);
    }
  }

  async embedBatch(
    data: UserData[],
    batchSize: number,
    onDoneBatching: (embeddings: PineconeRecord[]) => Promise<void>
  ) {
    const iterCount = Math.ceil(data.length / batchSize);
    for (const i of Array.from(Array(iterCount).keys())) {
      const embeddings = await Promise.all(
        data.slice(i, i + batchSize).map((d) => this.embedUserRecord(d))
      );
      await onDoneBatching(embeddings);
    }
  }
}

const embedder = new Embedder();

export default embedder;
