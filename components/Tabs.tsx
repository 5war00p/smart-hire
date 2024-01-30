import { FC, useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  { name: "Education", id: 1 },
  { name: "Work Experience", id: 2 },
  { name: "Skills", id: 3 },
];

const TabContent: FC<{ tab: number }> = ({ tab }) => {
  switch (tab) {
    case 1:
      return (
        <div className="flex flex-col gap-4">
          {Array.from(Array(4)).map((each) => (
            <div
              key={each}
              className="border-[0.5px] border-gray-300 rounded-lg grid grid-cols-2 gap-2 p-6"
            >
              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">
                  Degree
                </label>
                <p>B.Tech</p>
              </span>

              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">
                  Major
                </label>
                <p>Computer Science & Technology</p>
              </span>

              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">
                  Grade
                </label>
                <p>9.25</p>
              </span>

              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">
                  From
                </label>
                <p>2022</p>
              </span>

              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">To</label>
                <p>2024</p>
              </span>

              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">
                  School
                </label>
                <p>
                  Indian Institute of Engineering Science and Technology, Shepur
                </p>
              </span>
            </div>
          ))}
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col gap-4">
          {Array.from(Array(3)).map((each, index) => (
            <div
              key={index}
              className="border-[0.5px] rounded-lg grid grid-cols-2 gap-y-4 p-6"
            >
              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">
                  Company
                </label>
                <p>Amazon Development Center</p>
              </span>

              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">
                  Role
                </label>
                <p>KDP Analyst</p>
              </span>

              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">
                  From
                </label>
                <p>2019</p>
              </span>

              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">To</label>
                <p>2022</p>
              </span>

              <span className="text-sm">
                <label className="text-gray-400 font-medium text-xs">
                  Location
                </label>
                <p>Hyderabad, India</p>
              </span>

              <span className="text-sm col-span-2">
                <label className="text-gray-400 font-medium text-xs">
                  Description
                </label>
                <p className="text-justify">
                  To access and improve the performance of KDP business by
                  interpreting different forms of data. Automated the data
                  reporting process by collecting data from different
                  sources(Excel, SQL, Tableau). Improved the customer service
                  experience over the website by creating dashboards using power
                  BI. Analyzed publisher&apos;s Data and used the output to
                  automate the process using selenium so that publishing books
                  will be easy for the publishers. Automation helped in
                  decreasing the manual problem solving by 50%. Communicate with
                  the publishers and gathering all sort of issues they&apos;re
                  facing during publishing the books. The gathered information
                  was useful for us to design strategies based on regression
                  analysis. Also worked with the internal development and QA
                  teams to resolve the issues or bugs and reprocess the books
                  which are stuck due to these issues. Handle various tools
                  which to resolve the formatting issues involved and also the
                  concerns related to availability of the books published on
                  Amazon. Super headed a process restructure to automatically
                  detect the fraudulent books which are submitted to be
                  published which again helped us in reducing the manual
                  verification. Coached new joiners with all the process
                  knowledge to be gained before hitting to the work.
                </p>
              </span>
            </div>
          ))}
        </div>
      );
    case 3:
      return (
        <div className="flex gap-2 flex-wrap">
          {Array.from(Array(550)).map((each, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
            >
              Node.js
            </span>
          ))}
        </div>
      );
    default:
      return null;
  }
};

const Tabs = () => {
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
        <TabContent key={currentItem} tab={currentItem} />
      </div>
    </>
  );
};

export default Tabs;
