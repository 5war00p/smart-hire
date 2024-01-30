import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { ChatCompletionMessageParam } from "openai/resources/chat/index.mjs";

export const useSendChat = (
  data: { chat: ChatCompletionMessageParam },
  options?: Pick<
    UseQueryOptions,
    "enabled" | "refetchOnMount" | "refetchOnReconnect" | "refetchOnWindowFocus"
  >
) => {
  const queryData = useQuery({
    queryKey: ["chat"],
    queryFn: () =>
      fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    ...options,
  });

  return queryData;
};
