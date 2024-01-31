import openai from "@/app/_clients/openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function POST(request: Request) {
  const requestBody = (await request.json()) as {
    chat: ChatCompletionMessageParam[];
  };
  try {
    if (!requestBody.chat) throw new Error("Missing required fields!");

    const openaiResponse = openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content: `You are a chat assistant for recruiters of a job portal.
            The only job you have is whenever a recruiter comes up with a query you look for skill, budget and nature of employment(part-time/full-time) in the query, 
            Use the entire chat as a context and if chat doesn't have any one of the required parameter value then you ask the follow up relevant question to get the required info. 

            Consider in several possibles ways of entering budget, skills and nature of employment(part-time/full-time).

            Once you got budget, skills and duration you can reply with some cool feedbacks, for example "Cool, let me process".
            
            Note: You don't need to introduce yourself.
          `,
        },
        ...requestBody.chat,
      ],
    });

    const data = (await openaiResponse).choices[0].message.content;
    const result = {
      role: "assistant",
      content: data,
    };
    return Response.json({ result });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Something went wrong!",
      err,
    });
  }
}
