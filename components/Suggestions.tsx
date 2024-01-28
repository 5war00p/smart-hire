import IconReturn from "./icons/IconReturn";

const suggestionList = [
  {
    title: "Give me available candidates",
    description: "who are recently added to pre-vetting pool",
  },
  {
    title: "Freshers with freelance experience",
    description: "who are capable to deal JS and Python",
  },
  {
    title: "I need a frontend developer",
    description: "with >2 years of experience",
  },
  {
    title: "Rank all developers",
    description: "who are capable of handling both JS/TS and Python",
  },
];
const Suggestions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
      {suggestionList.map((suggestion, index) => (
        <div
          key={index}
          className="relative rounded-lg border text-sm p-4 hover:cursor-pointer group hover:bg-gray-100"
        >
          <p className="font-medium text-ellipsis">{suggestion.title}</p>
          <p className="text-gray-400 text-ellipsis">
            {suggestion.description}
          </p>
          <span className="absolute hidden group-hover:block right-4 bottom-5 backdrop-blur-xl bg-white rounded-md p-1">
            <IconReturn className="w-5 h-5" />
          </span>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
