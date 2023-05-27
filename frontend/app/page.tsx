import Image from "next/image";
import {
  LinkIcon,
  ArrowRightIcon,
  CodeBracketIcon,
} from "@heroicons/react/20/solid";
import { Github } from "react-bootstrap-icons";
import Link from "next/link";
export default function Home() {
  return (
    <main className="grid h-screen place-items-center">
      <div className="w-max">
        <div className="mb-6 flex items-center justify-center gap-4">
          <Image
            width={200}
            height={200}
            src={"/logo.png"}
            alt="logo"
            className="aspect-square w-16"
          />
          <h1 className=" text-5xl font-bold">Comment Sense</h1>
        </div>
        <p className=" mb-6 font-semibold">
          Paste in a youtube link to see how its comment section is feeling
          about the video
        </p>
        <div className="mb-6 grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-full bg-zinc-800 pl-4">
          <LinkIcon className="h-5 w-5 text-zinc-600" />
          <input
            className=" w-full bg-transparent py-3 font-semibold placeholder:text-zinc-600 focus:outline-none"
            placeholder="https://www.youtube.com/watch?v=..."
          />
          <button className="group h-full rounded-r-full px-4 transition-colors duration-200 hover:bg-red-500">
            <ArrowRightIcon className="h-5 w-5 text-zinc-600 transition-colors duration-200 group-hover:text-white" />
          </button>
        </div>
        <div className="flex justify-center gap-4">
          <Link
            href="https://github.com/knahsirV/CommentSense"
            target="_blank"
            className=" flex w-max items-center gap-2 rounded-xl bg-zinc-800 px-4 py-1.5 font-bold  text-white transition duration-200 hover:bg-white hover:text-zinc-800"
          >
            <Github className="h-4 w-4" />
            <span>View Repo</span>
          </Link>
          <Link
            href="https://www.vrishank.dev/projects"
            target="_blank"
            className="flex w-max items-center gap-2 rounded-xl bg-zinc-800 px-4 py-1.5 font-bold  text-white transition duration-200 hover:bg-white hover:text-zinc-800"
          >
            <CodeBracketIcon className="h-4 w-4" />
            <span>More Projects</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
