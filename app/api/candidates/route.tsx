import pinecone from "@/app/_clients/pinecone";
import embedder from "@/utils/embedder";

export async function POST(request: Request) {
  const { skills, budgetRange, employmentType, yearsOfExperience } =
    await request.json();

  const query = `Get me candidates who's skills 
        matches fully or partially with these skills: ${skills} under budget 
        range of ${budgetRange} with the availability of ${employmentType} having ${yearsOfExperience} experience`;

  const embeddings = await embedder.embedQuery(query);

  const matches = await pinecone.getMatchesFromEmbeddings(embeddings, 2);
  return Response.json({ matches: JSON.stringify(matches) });
}
