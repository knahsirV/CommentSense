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

export interface EmotionData {
  sentiment_data: {
    aggregate: {
      most_common_sentiment:
        | "joy"
        | "anger"
        | "sadness"
        | "fear"
        | "surprise"
        | "disgust"
        | "neutral";
      total_comments: number;
    };
    sentiments: {
      joy: string[];
      anger: string[];
      sadness: string[];
      fear: string[];
      surprise: string[];
      disgust: string[];
      neutral: string[];
    };
  };
  video_details: {
    title: string;
    channel: string;
  };
}

async function page({ params }: { params: { id: string } }) {
  const emotionData: EmotionData = await getSentiments(params.id);
  const mostCommonEmotion =
    emotionData.sentiment_data.aggregate.most_common_sentiment;
  const total_comments = emotionData.sentiment_data.aggregate.total_comments;
  const emotions = emotionData.sentiment_data.sentiments;
  const video_details = emotionData.video_details;
  const emoteLabels = {
    joy: "😄 Joyful",
    anger: "😡 Angry",
    sadness: "😢 Sad",
    fear: "😨 Fearful",
    surprise: "😮 Surprised",
    disgust: "🤢 Disgusted",
    neutral: "😐 Neutral",
  };
  const emotionReasons = {
    joy: "This video’s viewers seem to really like this video. This could be because they agree with the message of it, or because they found it quite entertaining.",
    anger:
      "This video’s viewers seem to be quite angry. This could be because they disagree with the message of it, or because they found it quite offensive.",
    sadness:
      "This video’s viewers seem to be quite sad. This could be because they the video was quite depressing, or because it triggered some bad memories.",
    fear: "This video’s viewers seem to be quite fearful. This could be because they find the material concerning, or because they are scared of the topic.",
    surprise:
      "This video’s viewers seem to be quite surprised. This could be because they found the video quite shocking, or because they were not expecting the video to be about this topic.",
    disgust:
      "This video’s viewers seem to be quite disgusted. This could be because they found the video quite offensive, or because they were not expecting the video to be about this topic.",
    neutral:
      "This video’s viewers seem to be quite neutral. This could be becuase the video did not evoke any strong emotions in them.",
  };
  return (
    <main className="grid h-[100dvh] grid-rows-[auto_auto_1fr] p-6 lg:p-10">
      <div className="grid-cols-[300px_1fr_300px] items-center gap-4 lg:mb-4 lg:grid">
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
      <div className="items-top mb-5 justify-between lg:flex">
        <div className="mb-2 lg:mb-0">
          <h1 className=" mb-2 text-center text-xl font-bold lg:mb-0 lg:max-w-[50ch] lg:truncate lg:text-left lg:text-4xl">
            {video_details.title}
          </h1>
          <h3 className="flex items-center justify-center text-center text-lg font-semibold text-zinc-500 lg:justify-start lg:text-left lg:text-xl">
            <UserCircleIcon className="mr-1 inline-block h-6 w-6" />
            {video_details.channel}
          </h3>
        </div>
        <Link
          href={`https://youtube.com/watch?v=${params.id}`}
          target="_blank"
          className="mx-auto flex h-min w-max items-center gap-2 rounded-xl bg-zinc-800 px-4 py-1.5 font-bold text-white transition duration-200 hover:bg-white hover:text-zinc-800 lg:mx-0"
        >
          <PlayIcon className="h-5 w-5 rounded bg-red-500 p-1 text-white" />
          <span>Watch Video</span>
        </Link>
      </div>
      <div className="grid h-full grid-cols-2 grid-rows-3 gap-6 lg:grid-cols-12 lg:grid-rows-2 lg:gap-10">
        <div className=" col-start-1 col-end-3 row-span-1 grid-rows-[auto_1fr_auto] rounded-xl bg-zinc-800 p-4 lg:col-start-1 lg:col-end-5 lg:grid lg:p-8">
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
        <div className=" col-start-5 col-end-8 row-span-1 hidden place-content-center rounded-xl bg-zinc-800 p-8 lg:grid">
          <h1 className="my-auto mb-2 text-center text-8xl font-bold">
            {total_comments}
          </h1>
          <h6 className="text-center text-2xl font-semibold">
            Comment{total_comments > 1 && "s"} Analyzed
          </h6>
        </div>
        <div className=" col-start-1 col-end-4 row-span-1 row-start-2  hidden rounded-xl bg-zinc-800 p-8 lg:block">
          <h5 className=" mb-4 text-xl font-bold text-zinc-500">
            {"What's"} going on here?
          </h5>
          <h6 className=" font-semibold leading-loose">
            {emotionReasons[mostCommonEmotion]}
          </h6>
        </div>
        <div className=" col-start-4 col-end-8 row-span-1 row-start-2 hidden rounded-xl bg-zinc-800 p-8 lg:block">
          <h5 className=" mb-4 grid grid-rows-[auto_1fr] text-center text-xl font-bold text-zinc-500">
            Sentiment Distribution
          </h5>
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
        <div className="col-start-8 col-end-13 row-span-2 hidden grid-rows-[auto_minmax(0,_1fr)] gap-8 overflow-scroll rounded-xl bg-zinc-800 p-8 lg:grid">
          <CommentsView
            data={emotionData}
            defaultChoice={emoteLabels[mostCommonEmotion].substring(3)}
          />
        </div>
        <button className="col-start-1 col-end-2 row-start-2 rounded-xl bg-zinc-800 p-4 text-lg font-semibold lg:hidden">
          {"What's"} going on here?
        </button>
        <button className="col-start-1 col-end-2 row-start-3 rounded-xl bg-zinc-800 p-4 text-lg font-semibold lg:hidden">
          Sentiment Distribution
        </button>
        <button className="col-start-2 col-end-3 row-span-2 row-start-2 rounded-xl bg-zinc-800 p-4 text-lg font-semibold lg:hidden">
          All comments for each emotion
        </button>
      </div>
    </main>
  );
}

async function getSentiments(id: string) {
  const data: EmotionData = await fetch(
    `http://flask-env.eba-psh44mba.us-east-2.elasticbeanstalk.com/sentiments/${id}`
  ).then((res: any) => res.json());
  return data;
}

export default page;
