import pinecone from "@/app/_clients/pinecone";
import { getUserData } from "@/utils/crawl";
import embedder from "@/utils/embedder";
import { SingleBar, Presets } from "cli-progress";

const progressBar = new SingleBar({}, Presets.shades_classic);

export async function GET(request: Request) {
  let counter = 0;

  const users = (await getUserData()) ?? [];

  const indexDetails = await pinecone.getIndex();
  const index = pinecone.pinecone.Index(indexDetails.name);

  // Start the progress bar
  progressBar.start(users.length, 0);

  embedder.embedBatch(users, 100, async (embeddings) => {
    counter += embeddings.length;
    // Whenever the batch embedding process returns a batch of embeddings, insert them into the pinecone index
    await index.upsert(embeddings);
    progressBar.update(counter);
  });

  progressBar.stop();

  const indexStats = await index.describeIndexStats();

  return Response.json({ indexStats: indexStats });
}
