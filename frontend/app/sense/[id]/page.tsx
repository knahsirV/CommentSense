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
    <main className="grid h-screen grid-rows-[auto_auto_1fr] p-10">
      <div className="mb-4 grid grid-cols-[300px_1fr_300px] items-center gap-4">
        <Link href="/" className="mb-6 flex items-center gap-4">
          <Image
            width={200}
            height={200}
            src={"/logo.png"}
            alt="logo"
            className="aspect-square w-12"
          />
          <h1 className=" text-2xl font-bold">Comment Sense</h1>
        </Link>
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
      <div className="items-top mb-10 flex justify-between">
        <div>
          <h1 className=" max-w-[50ch] truncate text-4xl font-bold">
            {video_details.title}
          </h1>
          <span className="flex items-center text-xl font-semibold text-zinc-500">
            <UserCircleIcon className="mr-1 inline-block h-5 w-5" />
            {video_details.channel}
          </span>
        </div>
        <Link
          href={`https://youtube.com/watch?v=${params.id}`}
          target="_blank"
          className="flex h-min w-max items-center gap-2 rounded-xl bg-zinc-800 px-4 py-1.5 font-bold  text-white transition duration-200 hover:bg-white hover:text-zinc-800"
        >
          <PlayIcon className="h-5 w-5 rounded bg-red-500 p-1 text-white" />
          <span>Watch Video</span>
        </Link>
      </div>
      <div className="grid h-full grid-cols-12 grid-rows-2 gap-10">
        <div className=" col-start-1 col-end-5 row-span-1 grid grid-rows-[auto_1fr_auto] rounded-xl bg-zinc-800 p-8">
          <h6 className="text-xl font-semibold">
            This {"video's"} comment section is feeling . . .
          </h6>
          <h1 className="my-auto text-center text-6xl font-bold">
            {emoteLabels[mostCommonEmotion]}
          </h1>
          <h6 className="text-right text-xl font-semibold">
            . . . about this video
          </h6>
        </div>
        <div className=" col-start-5 col-end-8 row-span-1 grid place-content-center rounded-xl bg-zinc-800 p-8">
          <h1 className="my-auto mb-2 text-center text-8xl font-bold">
            {total_comments}
          </h1>
          <h6 className="text-center text-2xl font-semibold">
            Comment{total_comments > 1 && "s"} Analyzed
          </h6>
        </div>
        <div className=" col-start-1 col-end-4 row-span-1 row-start-2  rounded-xl bg-zinc-800 p-8">
          <h5 className=" mb-4 text-xl font-bold text-zinc-500">
            {"What's"} going on here?
          </h5>
          <h6 className=" font-semibold leading-loose">
            {emotionReasons[mostCommonEmotion]}
          </h6>
        </div>
        <div className=" col-start-4 col-end-8 row-span-1 row-start-2 rounded-xl bg-zinc-800 p-8">
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
        <div className="col-start-8 col-end-13 row-span-2 grid grid-rows-[auto_minmax(0,_1fr)] gap-8 overflow-scroll rounded-xl bg-zinc-800 p-8">
          <CommentsView
            data={emotionData}
            defaultChoice={emoteLabels[mostCommonEmotion].substring(3)}
          />
        </div>
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
