import {
  IndexModel,
  ScoredPineconeRecord,
  Pinecone as pc,
} from "@pinecone-database/pinecone";

export const indexName = "search-v1";

class Pinecone {
  pinecone: pc;

  constructor() {
    this.pinecone = new pc({
      apiKey: process.env.PINECONE_API_KEY ?? "",
    });
  }

  async getIndex(): Promise<IndexModel> {
    const indexList = await this.pinecone.listIndexes();

    const prevIndex = indexList.indexes?.find(
      (index) => index.name === indexName
    );
    if (!prevIndex) {
      return this.pinecone.createIndex({
        name: indexName,
        dimension: 1536,
        metric: "cosine",
        spec: {
          pod: {
            pods: 1,
            podType: "p1.x1",
            environment: "gcp-starter",
          },
        },
      }) as unknown as IndexModel;
    }
    return prevIndex;
  }

  // The function `getMatchesFromEmbeddings` is used to retrieve matches for the given embeddings
  async getMatchesFromEmbeddings(
    embeddings: number[],
    topK: number
  ): Promise<ScoredPineconeRecord[]> {
    const index = await this.getIndex();

    // Get the namespace
    const pineconeNamespace = this.pinecone.Index(index.name).namespace("");

    try {
      // Query the index with the defined request
      const queryResult = await pineconeNamespace.query({
        vector: embeddings,
        topK,
        includeMetadata: true,
      });
      return queryResult.matches || [];
    } catch (e) {
      throw new Error(`Error querying embeddings: ${e}`);
    }
  }
}

const pinecone = new Pinecone();

export default pinecone;
