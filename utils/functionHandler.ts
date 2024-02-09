import { FunctionCallHandler, nanoid } from "ai";

const getCandidates = async (
  skills: string,
  budgetRange: string,
  employmentType: string,
  yearsOfExperience: string
) => {
  const response = await fetch("/api/candidates", {
    method: "POST",
    body: JSON.stringify({
      skills,
      budgetRange,
      employmentType,
      yearsOfExperience,
    }),
  });

  const json = await response.json();
  return json.matches;
};

export const functionCallHandler: FunctionCallHandler = async (
  chatMessages,
  functionCall
) => {
  if (functionCall.name === "getCandidates") {
    if (functionCall.arguments) {
      // Parsing here does not always work since it seems that some characters in generated code aren't escaped properly.
      const parsedFunctionCallArguments: {
        skills: string;
        budgetRange: string;
        employmentType: string;
        yearsOfExperience: string;
      } = JSON.parse(functionCall.arguments);

      const matches = await getCandidates(
        parsedFunctionCallArguments.skills as string,
        parsedFunctionCallArguments.budgetRange as string,
        parsedFunctionCallArguments.employmentType as string,
        parsedFunctionCallArguments.yearsOfExperience as string
      );

      const functionResponse = {
        messages: [
          ...chatMessages,
          {
            id: nanoid(),
            name: "getCandidates",
            role: "function" as const,
            content: functionCall.arguments,
            data: matches,
          },
        ],
      };
      return functionResponse;
    }
  }
};
