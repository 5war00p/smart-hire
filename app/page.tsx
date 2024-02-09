import Main from "@/components/Main";
import { StreamComp } from "@/components/streamComp";

export default function Home() {
  return (
    <main className="min-h-screen min-w-screen">
      <StreamComp />
      <div className="flex flex-col min-h-screen max-w-3xl items-center mx-auto justify-between px-8 py-8 md:px-0 overflow-hidden">
        <Main />
      </div>
    </main>
  );
}
