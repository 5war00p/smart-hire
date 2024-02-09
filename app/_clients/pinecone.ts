import {
  IndexModel,
  RecordMetadata,
  Pinecone as pc,
} from "@pinecone-database/pinecone";

export const indexName = "search-v1";

class Pinecone {
  public pinecone: pc;

  public constructor() {
    this.pinecone = new pc({
      apiKey:
        process.env.PINECONE_API_KEY ?? "d037fc31-4cbc-4a71-847f-eb755857c3b8",
    });
  }

  public async getIndex(
    customIndexName: string = indexName
  ): Promise<IndexModel> {
    const indexList = await this.pinecone.listIndexes();

    const prevIndex = indexList.indexes?.find(
      (index) => index.name === customIndexName
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
        waitUntilReady: true,
      }) as unknown as IndexModel;
    }
    return prevIndex;
  }

  // The function `getMatchesFromEmbeddings` is used to retrieve matches for the given embeddings
  public async getMatchesFromEmbeddings(
    embeddings: number[],
    topK: number
  ): Promise<RecordMetadata[]> {
    const index = await this.getIndex();

    // Get the namespace
    const pineconeNamespace = this.pinecone.Index(index.name).namespace("");

    try {
      // Query the index with the defined request
      const queryResult = await pineconeNamespace.query({
        vector: embeddings,
        topK,
        includeValues: false,
        includeMetadata: true,
      });

      let result: RecordMetadata[] = [];
      queryResult.matches.forEach((match) => {
        if (match.metadata) {
          result.push(match.metadata);
        }
      });

      return result || [];
    } catch (e) {
      throw new Error(`Error querying embeddings: ${e}`);
    }
  }
}

const pinecone = new Pinecone();

export default pinecone;
