import { UserCircleIcon, PlayIcon } from "@heroicons/react/20/solid";
import { VideoData } from "../ConstData";
import Link from "next/link";
import { Suspense } from "react";

const VideoHeading = ({ id }: { id: string }) => {
  
  return (
    <div className="items-top justify-between lg:flex">
      <Suspense fallback={<Skel />}>
        {/* @ts-expect-error Async Server Component */}
        <Content id={id} />
      </Suspense>
    </div>
  );
};

const Content = async ({ id }: { id: string }) => {
    const video_details = await getVideoDetails(id);
    return (
      <>
<div className="mb-2 lg:mb-0">
          <h1 className=" mb-2 text-center text-xl font-bold lg:mb-0 lg:max-w-[50ch] lg:truncate lg:text-left lg:text-2xl xl:text-4xl">
            {video_details.title}
          </h1>
          <h3 className="flex items-center justify-center text-center text-lg font-semibold text-zinc-600 lg:justify-start lg:text-left lg:text-xl">
            <UserCircleIcon className="mr-1 inline-block h-6 w-6" />
            {video_details.channel}
          </h3>
        </div>
        <Link
          href={`https://youtube.com/watch?v=${id}`}
          target="_blank"
          className="mx-auto flex h-min w-max items-center gap-2 rounded-xl bg-zinc-900 px-4 py-1.5 font-bold text-white transition duration-200 hover:bg-white hover:text-zinc-800 lg:mx-0"
        >
          <PlayIcon className="h-5 w-5 rounded bg-red-500 p-1 text-white" />
          <span>Watch Video</span>
        </Link>
      </>
    );
  };

const Skel = () => {
  return (
    <>
      <div className="mb-2 w-full animate-pulse lg:mb-0">
        <div className=" mb-2 h-8 w-full rounded-full bg-zinc-900 lg:w-1/2" />
        <div className="flex items-center justify-center text-zinc-900 lg:justify-start lg:text-left lg:text-xl">
          <UserCircleIcon className="mr-1 inline-block h-6 w-6" />
          <div className="h-4 w-20 rounded-full bg-zinc-900" />
        </div>
      </div>
      <button
        disabled
        className="mx-auto flex h-min w-max cursor-not-allowed items-center gap-2 whitespace-nowrap rounded-xl bg-zinc-900 px-4 py-1.5 font-bold text-zinc-700 lg:mx-0"
      >
        <PlayIcon className="h-5 w-5 rounded bg-zinc-800 p-1 text-zinc-700" />
        <span>Watch Video</span>
      </button>
    </>
  );
};

async function getVideoDetails(id: string) {
  const data: VideoData = await fetch(
    `http://flask-env.eba-psh44mba.us-east-2.elasticbeanstalk.com/${id}/details`
  ).then((res: any) => res.json());
  return data;
}

export default VideoHeading;
