import { Pinecone } from "@pinecone-database/pinecone";

export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY ?? "",
});

export const indexName = "search-v1";
export const getIndex = async () => {
  const indexList = await pinecone.listIndexes();

  const prevIndex = indexList.indexes?.find(
    (index) => index.name === indexName
  );
  if (!prevIndex) {
    return pinecone.createIndex({
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
    });
  } else {
    return prevIndex;
  }
};
