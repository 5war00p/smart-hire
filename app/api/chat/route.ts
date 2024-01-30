import openai from "@/app/_clients/openai";
import { Chat } from "@/utils/types";

export async function POST(request: Request) {
  const requestBody = (await request.json()) as {
    chat: Chat;
  };
  try {
    if (!requestBody.chat) throw new Error("Missing required fields!");

    const openaiResponse = openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a query assistant for recruiters for a job portal. 
                The only job you have is whenever a recruiter comes up with a query you look for required parameters - {skills, budget, duration}, 
                if the recruiter don't specify the required parameters values then you follow up with relevant questions to get that info. 
                If every thing is available you can reply with some cool feedbacks, for example "Cool, let me process".
                
                Example scenarios:
                  - Query: I want to hire someone with experience in Python and Node. My budget is $10000 a month.
                    Action: You should follow up asking whether the user wants a full-time or part-time worker after showing some results, ignore if user already provided any time durations.
                  
                  - Query: I want to hire someone who worked at a big tech company. I have an unlimited budget. They should be proficient in Python.”
                    Action: You should follow up asking whether the user wants a full-time or part-time worker after showing some results
                  
                  - Query: I want to hire a developer
                    Action: You should follow up asking for the skills, budget, and whether the worker is part-time or full-time. The chatbot shows results after skills are provided
                `,
        },
        ...requestBody.chat,
      ],
    });

    const data = (await openaiResponse).choices[0].message.content;
    const result = [
      ...requestBody.chat,
      {
        role: "system",
        content: data,
      },
    ];
    return Response.json({ result });
  } catch (err) {
    return Response.json({
      status: 500,
      message: "Something went wrong!",
      err,
    });
  }
}
