import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useSendChat = (
  data: { prompt: string },
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
