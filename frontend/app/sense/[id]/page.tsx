import Image from "next/image";
import YTInput from "@/app/components/YTInput";
import EmoteChoice from "@/app/components/EmoteChoice";
import Link from "next/link";
import { Github } from "react-bootstrap-icons";
import { CodeBracketIcon, PlayIcon } from "@heroicons/react/20/solid";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <main className="grid h-screen grid-rows-[auto_auto_1fr] p-10">
      <div className="mb-4 grid grid-cols-[300px_1fr_300px] items-center gap-4">
        <div className="mb-6 flex items-center gap-4">
          <Image
            width={200}
            height={200}
            src={"/logo.png"}
            alt="logo"
            className="aspect-square w-12"
          />
          <h1 className=" text-2xl font-bold">Comment Sense</h1>
        </div>
        <div className="mx-auto w-3/4">
          <YTInput onDashboard />
        </div>
        <div className="mb-6 flex justify-end gap-4 whitespace-nowrap">
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
      <div className="mb-10 flex items-center justify-between">
        <h1 className=" text-4xl font-bold">
          Are Americans Bad At Philosophy?
        </h1>
        <Link
          href="https://youtube.com/watch?v=9Q9foLt9k9Q"
          target="_blank"
          className="flex h-min w-max items-center gap-2 rounded-xl bg-zinc-800 px-4 py-1.5 font-bold  text-white transition duration-200 hover:bg-white hover:text-zinc-800"
        >
          <PlayIcon className="h-5 w-5 rounded bg-red-500 p-1 text-white" />
          <span>Watch Video</span>
        </Link>
      </div>
      <div className="grid h-full grid-cols-12 grid-rows-2 gap-10">
        <div className=" col-start-1 col-end-5 row-span-1 grid grid-rows-[auto_1fr_auto] rounded-xl bg-zinc-800 p-10">
          <h6 className="text-xl font-semibold">
            This {"video's"} comment section is feeling . . .
          </h6>
          <h1 className="my-auto text-center text-6xl font-bold">😄 Joyful</h1>
          <h6 className="text-right text-xl font-semibold">
            . . . about this video
          </h6>
        </div>
        <div className=" col-start-5 col-end-8 row-span-1 grid place-content-center rounded-xl bg-zinc-800 p-10">
          <h1 className="my-auto mb-2 text-center text-8xl font-bold">100</h1>
          <h6 className="text-center text-2xl font-semibold">
            Comments Analyzed
          </h6>
        </div>
        <div className=" col-start-1 col-end-4 row-span-1 row-start-2  rounded-xl bg-zinc-800 p-10">
          <h5 className=" mb-4 text-xl font-bold text-zinc-500">
            {"What's"} going on here?
          </h5>
          <h6 className=" font-semibold leading-loose">
            This video’s viewers seem to really like this video. This could be
            because they agree with the message of it, or because they found it
            quite entertaining.
          </h6>
        </div>
        <div className=" col-start-4 col-end-8 row-span-1 row-start-2 rounded-xl bg-zinc-800 p-10">
          <h5 className=" mb-4 text-center text-2xl font-bold text-zinc-500">
            Sentiment Distribution
          </h5>
        </div>
        <div className="col-start-8 col-end-13 row-span-2 grid grid-rows-[auto_minmax(0,_1fr)] gap-8 overflow-scroll rounded-xl bg-zinc-800 p-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h5 className="font-bold">View all comments that are</h5>
              <EmoteChoice />
            </div>
            <span className="text-sm font-semibold text-zinc-500">
              27 comments
            </span>
          </div>
          <div className="scrollbar-hide max-h-[30rem] space-y-8 overflow-scroll rounded-xl">
            {[...Array(27)].map((_, i) => (
              <div
                key={i}
                className=" max-w-[75%] rounded-xl bg-amber-300 bg-opacity-30 p-4 even:ml-auto"
              >
                <span className=" font-semibold text-amber-300">
                  I thought this video was really cool. well explained
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
