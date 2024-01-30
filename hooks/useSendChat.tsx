import { Chat, Message } from "@/utils/types";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useSendChat = (
  data: { chat: Chat },
  options?: Pick<
    UseQueryOptions,
    "enabled" | "refetchOnMount" | "refetchOnReconnect"
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

  return { ...queryData, data: queryData.data as Message[] };
};
