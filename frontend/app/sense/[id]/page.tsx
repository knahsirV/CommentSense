import Image from "next/image";
import YTInput from "@/app/components/YTInput";
import Link from "next/link";
import { Github } from "react-bootstrap-icons";
import VideoHeading from "@/app/components/VideoHeading";
import { CodeBracketIcon } from "@heroicons/react/20/solid";
import SentimentDashboard from "@/app/components/SentimentDashboard";

function page({ params }: { params: { id: string } }) {
  return (
    <main className="grid h-[100dvh] grid-rows-[auto_auto_1fr] gap-4 p-6 lg:h-screen lg:p-10">
      <div className="grid-cols-[300px_1fr_300px] items-center gap-4 lg:grid">
        <Link
          href="/"
          className=" mb-6 flex items-center justify-center gap-4 lg:justify-start"
        >
          <Image
            width={200}
            height={200}
            src={"/logo.png"}
            alt="logo"
            className="aspect-square w-8 lg:w-12"
          />
          <h1 className=" text-2xl font-bold">Comment Sense</h1>
        </Link>
        <div className=" w-full lg:mx-auto lg:w-3/4">
          <YTInput onDashboard />
        </div>
        <div className="mb-6 flex justify-evenly gap-4 whitespace-nowrap lg:justify-end">
          <Link
            href="https://github.com/knahsirV/CommentSense"
            target="_blank"
            className=" flex w-max items-center gap-2 rounded-xl bg-zinc-900 px-4 py-1.5 font-bold  text-white transition duration-200 hover:bg-white hover:text-zinc-800"
          >
            <Github className="h-4 w-4" />
            <span>View Repo</span>
          </Link>
          <Link
            href="https://www.vrishank.dev/projects"
            target="_blank"
            className="flex w-max items-center gap-2 rounded-xl bg-zinc-900 px-4 py-1.5 font-bold  text-white transition duration-200 hover:bg-white hover:text-zinc-800"
          >
            <CodeBracketIcon className="h-4 w-4" />
            <span>More Projects</span>
          </Link>
        </div>
      </div>
      <VideoHeading id={params.id} />
      <SentimentDashboard id={params.id} />
    </main>
  );
}

export default page;
