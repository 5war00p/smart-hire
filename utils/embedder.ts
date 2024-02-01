import openai from "@/app/_clients/openai";
import { PineconeRecord } from "@pinecone-database/pinecone/dist/data/types";
import { UserData } from "@/utils/types";
import { randomUUID } from "crypto";

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
      const doc = `${data.name} have knowledge in ${data.skills.join(" ")}
           and can contribute ${
             data.fullTimeStatus === "yes"
               ? ` either part-time for $${data.partTimeSalary} per month or full-time for $${data.fullTimeSalary} per month`
               : `only part-time for ${data.partTimeSalary} per month`
           }`;
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
          educations: JSON.stringify(data.educations),
          workExperiences: JSON.stringify(data.workExperiences),
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
