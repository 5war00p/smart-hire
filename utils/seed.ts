import openai from "@/app/_clients/openai";
import pinecone from "@/app/_clients/pinecone";
import { PineconeRecord } from "@pinecone-database/pinecone/dist/data/types";
import { UserData } from "./types";

async function embedUserRecord(doc: UserData): Promise<PineconeRecord> {
  try {
    // Generate OpenAI embeddings for the document content
    const embedding = await openai.getEmbeddings(`${doc}`);

    // Return the vector embedding object
    return {
      id: doc.userId, // The ID of the vector is the hash of the document content
      values: embedding, // The vector values are the OpenAI embeddings
      metadata: {
        ...doc,
      },
    } as PineconeRecord;
  } catch (error) {
    throw new Error(`Error embedding document: : ${error}`);
  }
}

const seed = async () => {
  pinecone;
};
