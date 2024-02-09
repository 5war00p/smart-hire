"use client";
import ResultList from "./ResultsList";
import Suggestions from "./Suggestions";
import IconSparkle from "./icons/IconSparkle";
import IconUser from "./icons/IconUser";
import { Dispatch, FC, SetStateAction } from "react";
import { Message } from "ai";

const ChatContainer: FC<{
  setInput: Dispatch<SetStateAction<string>>;
  messages: Message[];
}> = ({ messages, setInput }) => {
  if (messages.length === 0) {
    return (
      <>
        <span className="m-auto">
          <IconSparkle className="w-8 h-8 mx-auto" />
          <h2 className="text-2xl font-mono m-auto">SmartHire with AI</h2>
        </span>
        <Suggestions setInput={setInput} />
      </>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-130px)] overflow-y-scroll no-scrollbar">
      <div className="space-y-8 mx-8 my-4">
        {messages.map((message, index) => (
          <>
            {message.content && (
              <div key={index} className="flex gap-2 w-full items-start">
                {message.role === "user" ? (
                  <span className="w-7 h-7 rounded-full bg-emerald-400 p-1">
                    <IconUser className="w-5 h-5" />
                  </span>
                ) : (
                  <span className="w-7 h-7 rounded-full bg-amber-400 p-1">
                    <IconSparkle className="w-5 h-5" />
                  </span>
                )}
                <div className="w-full">
                  {message.content && (
                    <p className="font-semibold">
                      {message.role === "user" ? "You" : "Assistant"}
                    </p>
                  )}
                  <div className="flex flex-col gap-4">
                    {message.role === "function" ? (
                      <ResultList stringifiedData={message.data as string} />
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default ChatContainer;
