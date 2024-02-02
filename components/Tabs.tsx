import { UserData } from "@/utils/types";
import { FC, useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  { name: "Education", id: 1 },
  { name: "Work Experience", id: 2 },
  { name: "Skills", id: 3 },
];

const TabContent: FC<{ tab: number; details: UserData }> = ({
  tab,
  details,
}) => {
  switch (tab) {
    case 1:
      return (
        <div className="flex flex-col gap-4">
          {details.educations.map((education, index) => (
            <div
              key={index}
              className="border-[0.5px] border-gray-300 rounded-lg grid grid-cols-2 gap-2 p-6"
            >
              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">
                  Degree
                </label>
                <p>{education.degree || "-"}</p>
              </span>

              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">
                  Major
                </label>
                <p>{education.major || "-"}</p>
              </span>

              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">
                  Grade
                </label>
                <p>{education.grade || "-"}</p>
              </span>

              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">
                  From
                </label>
                <p>{education.startDate || "-"}</p>
              </span>

              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">To</label>
                <p>{education.endDate || "-"}</p>
              </span>

              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">
                  School
                </label>
                <p>{education.school || "-"}</p>
              </span>
            </div>
          ))}
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col gap-4">
          {details.workExperiences.map((experience, index) => (
            <div
              key={index}
              className="border-[0.5px] rounded-lg grid grid-cols-2 gap-y-4 p-6"
            >
              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">
                  Company
                </label>
                <p>{experience.company || "-"}</p>
              </span>

              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">
                  Role
                </label>
                <p>{experience.role || "-"}</p>
              </span>

              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">
                  From
                </label>
                <p>{experience.startDate || "-"}</p>
              </span>

              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">To</label>
                <p>{experience.endDate || "-"}</p>
              </span>

              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">
                  Location
                </label>
                <p>{experience.location || "-"}</p>
              </span>

              <span className="text-sm col-span-2">
                <label className="text-gray-400 font-medium text-xs">
                  Description
                </label>
                <p className="text-justify">{experience.description || "-"}</p>
              </span>
            </div>
          ))}
        </div>
      );
    case 3:
      return (
        <div className="flex gap-2 flex-wrap">
          {details.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
            >
              {skill}
            </span>
          ))}
        </div>
      );
    default:
      return null;
  }
};

const Tabs: FC<{ details: UserData }> = ({ details }) => {
  const [currentItem, setCurrentItem] = useState<number>(1);
  return (
    <>
      {/* Tab pane */}
      <div className="xs:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-gray-600 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          defaultValue={tabs[currentItem - 1].name}
          style={{ border: "0.5px solid rgb(209 213 219)" }}
          onChange={(e) => setCurrentItem(+e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.id}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden xs:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={classNames(
                  tab.id === currentItem
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                )}
                onClick={() => setCurrentItem(tab.id)}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab content */}
      <div className="h-96 overflow-y-scroll">
        <TabContent key={currentItem} tab={currentItem} details={details} />
      </div>
    </>
  );
};

export default Tabs;
