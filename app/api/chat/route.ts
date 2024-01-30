import openai from "@/app/_clients/openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function POST(request: Request) {
  const requestBody = (await request.json()) as {
    chat: ChatCompletionMessageParam[];
  };
  try {
    if (!requestBody.chat) throw new Error("Missing required fields!");

    const openaiResponse = openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a chat assistant for recruiters for a job portal.
            The only job you have is whenever a recruiter comes up with a query you look for skill, budget and duration(part-time/full-time) in the query, 
            If the query doesn't have any one of the required parameter value then you ask the follow up relevant question to get the required info. 
            If every thing is available you can reply with some cool feedbacks, for example "Cool, let me process".
            Note: You don't need to greet for the first prompt.
          `,
        },
        ...requestBody.chat,
      ],
    });

    const data = (await openaiResponse).choices[0].message.content;
    const result = {
      role: "system",
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
