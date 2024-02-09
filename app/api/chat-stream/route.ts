import openai from "@/app/_clients/openai";
import pinecone from "@/app/_clients/pinecone";
import embedder from "@/utils/embedder";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const runtime = "edge";

const getCandidates = async (
  skills: string,
  budgetRange: string,
  employmentType: string,
  yearsOfExperience: string
) => {
  const query = `Get me candidates who's skills 
    matches fully or partially with these skills: ${skills} under budget 
    range of ${budgetRange} with the availability of ${employmentType} having ${yearsOfExperience} experience`;

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

    const openaiResponse = await openai.openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          role: "system",
          content: `A helpful chat assistant for recruiters of a job portal.

            Duties of assistant:
             - Making sure that user has given skills, budget and nature of employment (part-time/full-time) before calling getCandidates function.
             - If user has entered insufficient info then followup with relevant questions by using the entire chat as a context.
             - Assistant must provide a feedback message to the user e.g. "I'm processing results for you" before calling getCandidates function and don't mention anything about function calling.

            Function
             - getCandidates, to the all matched candidates with the given skills, budgetRange, employmentType and years of experience

            Note: Consider $ as US Dollars if none mentioned
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
                yearsOfExperience: {
                  type: "string",
                  description: "Experience required, e.g. > 2 years",
                },
              },
              required: ["skills", "budgetRange", "employmentType"],
            },
          },
        },
      ],
      stream: true,
      n: 1,
    });

    // For function calling https://community.openai.com/t/functions-calling-with-streaming/305742

    return new Response(openaiResponse.toReadableStream());
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Something went wrong!",
      err,
    });
  }
}
