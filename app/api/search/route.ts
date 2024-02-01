import openai from "@/app/_clients/openai";
import pinecone from "@/app/_clients/pinecone";

export const runtime = "edge";

export async function POST(request: Request) {
  const requestBody = (await request.json()) as {
    query: string;
  };
  try {
    if (!requestBody.query) throw new Error("Missing required fields!");

    const embedding = await openai.getEmbeddings(requestBody.query);

    // Retrieve the matches for the embeddings from the specified namespace
    const matches = await pinecone.getMatchesFromEmbeddings(embedding, 3);

    return Response.json({ matches });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Something went wrong!",
      err,
    });
  }
}
