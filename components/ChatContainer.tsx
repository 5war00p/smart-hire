"use client";
import ResultList from "./ResultsList";
import Suggestions from "./Suggestions";
import IconSparkle from "./icons/IconSparkle";
import IconUser from "./icons/IconUser";
import { FC } from "react";
import { Chat } from "@/utils/types";

const ChatContainer: FC<{
  messageList: Chat;
  responses: Record<number, string>;
}> = ({ messageList, responses }) => {
  if (messageList.length === 0) {
    return (
      <>
        <span className="m-auto">
          <IconSparkle className="w-8 h-8 mx-auto" />
          <h2 className="text-2xl font-mono m-auto">SmartHire with AI</h2>
        </span>
        <Suggestions />
      </>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-130px)] overflow-y-scroll no-scrollbar">
      <div className="space-y-8 mx-8 my-4">
        {messageList.map((message, index) => (
          <div key={index} className="flex gap-2 w-full items-start">
            {message.role === "assistant" ? (
              <span className="w-7 h-7 rounded-full bg-amber-400 p-1">
                <IconSparkle className="w-5 h-5" />
              </span>
            ) : (
              <span className="w-7 h-7 rounded-full bg-emerald-400 p-1">
                <IconUser className="w-5 h-5" />
              </span>
            )}
            <div className="w-full">
              <p className="font-semibold">
                {message.role === "assistant" ? "Assistant" : "You"}
              </p>
              <div className="flex flex-col gap-4">
                <p>{message.content}</p>
                {message.role === "assistant" &&
                  !!responses[index] &&
                  responses[index] !== "[]" && (
                    <ResultList stringifiedData={responses[index]} />
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatContainer;
