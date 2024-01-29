import ChatContainer from "@/components/ChatContainer";
import IconReturn from "@/components/icons/IconReturn";

export default function Home() {
  return (
    <main className="min-h-screen min-w-screen">
      <div className="flex flex-col min-h-screen max-w-3xl items-center mx-auto justify-between px-8 py-8 md:px-0 overflow-hidden">
        <ChatContainer />
        <div className="w-full relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="search"
            className="block w-full rounded-xl border-0 p-4 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-ellipsis focus:ring-inset focus:outline-none sm:text-sm sm:leading-6"
            placeholder="Suggest me a top ranked Next.js developer"
          />
          <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              type="button"
              disabled
              className="rounded-lg disabled:bg-gray-300 bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <IconReturn className="w-6 h-6 fill-white" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
