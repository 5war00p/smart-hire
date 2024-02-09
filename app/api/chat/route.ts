import oai from "@/app/_clients/openai";
import {
  Function,
  OpenAIStream,
  StreamingTextResponse,
  experimental_StreamData,
} from "ai";

export const runtime = "edge";

const functions: Function[] = [
  {
    name: "getCandidates",
    description: "Get candidate matches using the given requirements",
    parameters: {
      type: "object",
      properties: {
        skills: {
          type: "string",
          description: "Skills for the role, e.g. Python, Node.js, React.js",
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
];

export async function POST(request: Request) {
  const { messages } = await request.json();
  try {
    if (!messages) throw new Error("Missing required fields!");

    const openaiResponse = await oai.openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [
        {
          role: "system",
          content: `A helpful chat assistant for recruiters of a job portal.

            Duties of assistant:
             - Making sure that user has given skills, budget and nature of employment (part-time/full-time) before calling getCandidates function.
             - If user has entered insufficient info then followup with relevant questions by using the entire chat as a context.

            Function
             - getCandidates, to the all matched candidates with the given skills, budgetRange, employmentType and years of experience

            Note: Consider $ as US Dollars if none mentioned and don't provide any suggestions about dashboard and job portals
          `,
        },
        ...messages,
      ],
      functions,
      function_call: "auto",
      stream: true,
    });

    const data = new experimental_StreamData();
    const stream = OpenAIStream(openaiResponse);

    return new StreamingTextResponse(stream);

    /**
      ! DEBT: Waiting for message (second response) after tool calling increases latency
      const secondResponse = await openai.openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        // ...requestBody.chat,
        data,
        {
          tool_call_id: data.tool_calls[0].id,
          role: "tool",
          content: functionResponse,
        },
       ],
     }); */
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Something went wrong!",
    });
  }
}
