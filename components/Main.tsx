"use client";
import ChatContainer from "@/components/ChatContainer";
import IconReturn from "@/components/icons/IconReturn";

import { useCallback, useEffect } from "react";
import { useSendChat } from "@/hooks/useSendChat";
import { useAppState } from "@/hooks/useAppContext";

const Main = () => {
  const [appState, setAppState] = useAppState();
  const { data, refetch } = useSendChat(
    { prompt: appState.query },
    { enabled: false, refetchOnMount: false, refetchOnWindowFocus: false }
  );

  const handleSubmit = useCallback(() => {
    refetch();
    setAppState((prev) => ({
      query: "",
      chat: [...prev.chat, { role: "user", content: appState.query }],
    }));
  }, [appState.query]);

  useEffect(() => {
    if (data && "result" in data)
      setAppState((prev) => ({ ...prev, chat: [...prev.chat, data.result] }));
  }, [data]);

  return (
    <>
      <ChatContainer messageList={appState.chat} />

      {/* Input */}
      <div className="w-full relative mt-2 rounded-md shadow-sm">
        <input
          type="text"
          name="search"
          value={appState.query}
          className="block w-full rounded-xl border-0 p-4 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-ellipsis focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
          placeholder="Suggest me a top ranked Next.js developer"
          onChange={(e) =>
            setAppState((prev) => ({ ...prev, query: e.target.value }))
          }
        />
        <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3">
          <button
            type="button"
            disabled={!appState.query}
            className="rounded-lg disabled:bg-gray-300 bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => handleSubmit()}
          >
            <IconReturn className="w-6 h-6 fill-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;
