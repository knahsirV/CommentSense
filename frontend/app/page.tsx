import Image from "next/image";
import Link from "next/link";
import { CodeBracketIcon } from "@heroicons/react/20/solid";
import { Github } from "react-bootstrap-icons";
import YTInput from "./components/YTInput";

export default function Home() {
  return (
    <main className="grid h-[75vh] animate-fade-in-down place-content-center p-6">
      <div className="mb-6 flex items-center justify-center gap-4">
        <Image
          width={200}
          height={200}
          src={"/logo.png"}
          alt="logo"
          className="aspect-square w-12 lg:w-16"
        />
        <h1 className="text-4xl font-bold lg:text-5xl">Comment Sense</h1>
      </div>
      <p className=" mb-6 text-center font-semibold">
        Paste in a youtube link to see how its comment section is feeling about
        the video
      </p>
      <YTInput />
      <div className="flex justify-center gap-4">
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
    </main>
  );
}
