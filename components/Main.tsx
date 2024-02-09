"use client";
import ChatContainer from "@/components/ChatContainer";
import IconReturn from "@/components/icons/IconReturn";

import IconStopCircle from "./icons/IconStopCircle";
import { useChat } from "ai/react";
import { functionCallHandler } from "@/utils/functionHandler";

const Main = () => {
  const {
    messages,
    setInput,
    handleSubmit,
    isLoading,
    handleInputChange,
    input,
  } = useChat({
    api: "/api/chat",
    experimental_onFunctionCall: functionCallHandler,
  });

  return (
    <>
      <ChatContainer setInput={setInput} messages={messages} />

      {/* Input */}
      <div className="w-full relative mt-2 rounded-md shadow-sm">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            value={input}
            className="block w-full rounded-xl border-0 p-4 pr-16 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-ellipsis focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
            placeholder="Suggest me a top ranked Next.js developer"
            onChange={handleInputChange}
          />
          <div
            className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading ? (
              <IconStopCircle className="w-6 h-6 text-gray-400 " />
            ) : (
              <button
                type="submit"
                disabled={!input}
                className="rounded-lg disabled:bg-gray-300 bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <IconReturn className="w-6 h-6 fill-white" />
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Main;
