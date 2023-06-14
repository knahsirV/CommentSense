import Image from "next/image";
import YTInput from "@/app/components/YTInput";
import Link from "next/link";
import { Github } from "react-bootstrap-icons";
import {
  CodeBracketIcon,
  PlayIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import DistChart from "@/app/components/DistChart";
import { use } from "react";
import CommentsView from "@/app/components/CommentsView";
import MobileView from "@/app/components/MobileView";
import {
  EmotionData,
  VideoData,
  emoteLabels,
  emotionReasons,
} from "@/app/ConstData";

async function page({ params }: { params: { id: string } }) {
  const emotionData: EmotionData = await getSentiments(params.id);
  const mostCommonEmotion = emotionData.aggregate.most_common_sentiment;
  const total_comments = emotionData.aggregate.total_comments;
  const emotions = emotionData.sentiments;
  const video_details = await getVideoDetails(params.id);

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
      <div className="items-top justify-between lg:flex">
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
          href={`https://youtube.com/watch?v=${params.id}`}
          target="_blank"
          className="mx-auto flex h-min w-max items-center gap-2 rounded-xl bg-zinc-900 px-4 py-1.5 font-bold text-white transition duration-200 hover:bg-white hover:text-zinc-800 lg:mx-0"
        >
          <PlayIcon className="h-5 w-5 rounded bg-red-500 p-1 text-white" />
          <span>Watch Video</span>
        </Link>
      </div>
      <div className=" min-h-0 lg:grid lg:grid-cols-12  lg:grid-rows-2 lg:place-content-start lg:gap-10">
        <div className=" grid-rows-[auto_1fr_auto] rounded-xl bg-zinc-900 p-4 lg:col-start-1 lg:col-end-5 lg:grid lg:p-8">
          <h6 className="font-semibold lg:text-xl">
            This {"video's"} comment section is feeling . . .
          </h6>
          <h1 className="my-auto text-center text-3xl font-bold lg:text-6xl">
            {emoteLabels[mostCommonEmotion]}
          </h1>
          <h6 className="text-right font-semibold lg:text-xl">
            . . . about this video
          </h6>
        </div>
        <div className=" col-start-5 col-end-8 row-span-1 hidden place-content-center rounded-xl bg-zinc-900 p-8 lg:grid">
          <h1 className="my-auto mb-2 text-center text-8xl font-bold">
            {total_comments}
          </h1>
          <h6 className="text-center text-2xl font-semibold">
            Comment{total_comments > 1 && "s"} Analyzed
          </h6>
        </div>
        <div className=" col-start-1 col-end-4 row-span-1 row-start-2 hidden grid-rows-[auto_minmax(0,_1fr)] rounded-xl bg-zinc-900 p-8 lg:grid">
          <h5 className=" mb-4 text-xl font-bold text-zinc-500">
            {"What's"} going on here?
          </h5>
          <div className="scrollbar-hide overflow-scroll rounded-md">
            <h6 className=" font-semibold leading-loose">
              {emotionReasons[mostCommonEmotion]}
            </h6>
          </div>
        </div>
        <div className=" col-start-4 col-end-8 row-span-1 row-start-2 hidden grid-rows-[auto_minmax(0,_1fr)] rounded-xl bg-zinc-900 p-8 lg:grid">
          <h5 className=" mb-4 text-center text-xl font-bold text-zinc-500">
            Sentiment Distribution
          </h5>
          <div className="scrollbar-hide overflow-scroll rounded-md">
            <DistChart
              emoteData={[
                emotions.joy.length,
                emotions.anger.length,
                emotions.fear.length,
                emotions.sadness.length,
                emotions.surprise.length,
                emotions.disgust.length,
                emotions.neutral.length,
              ]}
            />
          </div>
        </div>
        <div className="col-start-8 col-end-13 row-span-2 hidden grid-rows-[auto_minmax(0,_1fr)] gap-8 rounded-xl bg-zinc-900 p-8 lg:grid">
          <CommentsView
            data={emotionData}
            defaultChoice={emoteLabels[mostCommonEmotion].substring(3)}
          />
        </div>
        <MobileView emotionData={emotionData} />
      </div>
    </main>
  );
}

async function getSentiments(id: string) {
  const data: EmotionData = await fetch(
    `http://flask-env.eba-psh44mba.us-east-2.elasticbeanstalk.com/${id}/sentiments`
  ).then((res: any) => res.json());
  return data;
}

async function getVideoDetails(id: string) {
  const data: VideoData = await fetch(
    `http://flask-env.eba-psh44mba.us-east-2.elasticbeanstalk.com/${id}/details`
  ).then((res: any) => res.json());
  return data;
}

export default page;
