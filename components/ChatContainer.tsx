import MessageCard from "./MessageCard";
import Suggestions from "./Suggestions";
import IconSparkle from "./icons/IconSparkle";
import IconUser from "./icons/IconUser";

const messageList = [
  {
    senderName: "You",
    content: "How many members exist in the pre-vetting pool?",
  },
  {
    senderName: "AI",
    content: "There are 500+ candidates in the pre-vetting pool.",
  },
  {
    senderName: "You",
    content: "Give me exact number",
  },
  {
    senderName: "You",
    content: {
      info: {
        bio: "",
        expectedPartTimeSalary: "",
        expectedFullTimeSalary: "",
      },
      projects: [],
      skills: [],
      workExperiences: [],
    },
  },
];

const ChatContainer = () => {
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
            {message.senderName === "AI" ? (
              <span className="w-7 h-7 rounded-full bg-amber-400 p-1">
                <IconSparkle className="w-5 h-5" />
              </span>
            ) : (
              <span className="w-7 h-7 rounded-full bg-emerald-400 p-1">
                <IconUser className="w-5 h-5" />
              </span>
            )}
            <span>
              <p className="font-semibold">{message.senderName}</p>
              {typeof message.content === "string" ? (
                <p>{message.content}</p>
              ) : (
                <MessageCard details={message.content} />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatContainer;
