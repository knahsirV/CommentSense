import DistChart from "@/app/components/DistChart";
import CommentsView from "@/app/components/CommentsView";
import MobileView from "@/app/components/MobileView";
import { EmotionData, emoteLabels, emotionReasons } from "@/app/ConstData";
import { Suspense } from "react";

const SentimentDashboard = ({ id }: { id: string }) => {
  return (
    <div className=" min-h-0 lg:grid lg:grid-cols-12  lg:grid-rows-2 lg:place-content-start lg:gap-10">
      <Suspense fallback={<Skel />}>
        {/* @ts-expect-error Async Server Component */}
        <Content id={id} />
      </Suspense>
    </div>
  );
};

const Content = async ({ id }: { id: string }) => {
  const emotionData: EmotionData = await getSentiments(id);
  const mostCommonEmotion = emotionData.aggregate.most_common_sentiment;
  const total_comments = emotionData.aggregate.total_comments;
  const emotions = emotionData.sentiments;
  return (
    <>
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
    </>
  );
};

const Skel = () => {
  return (
    <>
      <div className=" animate-pulse grid-rows-[auto_1fr_auto] rounded-xl bg-zinc-900 p-4 lg:col-start-1 lg:col-end-5 lg:grid lg:p-8"></div>
      <div className=" col-start-5 col-end-8 row-span-1 hidden animate-pulse place-content-center rounded-xl bg-zinc-900 p-8 lg:grid"></div>
      <div className=" col-start-1 col-end-4 row-span-1 row-start-2 hidden animate-pulse grid-rows-[auto_minmax(0,_1fr)] rounded-xl bg-zinc-900 p-8 lg:grid"></div>
      <div className=" col-start-4 col-end-8 row-span-1 row-start-2 hidden animate-pulse grid-rows-[auto_minmax(0,_1fr)] rounded-xl bg-zinc-900 p-8 lg:grid"></div>
      <div className="col-start-8 col-end-13 row-span-2 hidden animate-pulse grid-rows-[auto_minmax(0,_1fr)] gap-8 rounded-xl bg-zinc-900 p-8 lg:grid"></div>
      <div className="mt-6 flex animate-pulse flex-wrap justify-center gap-6 lg:hidden">
        <button className="w-1/3 rounded-xl bg-zinc-900 p-4 font-semibold "></button>
        <button className=" rounded-xl bg-zinc-900 p-4  font-semibold "></button>
        <button className=" rounded-xl bg-zinc-900 p-4 font-semibold"></button>
      </div>
    </>
  );
};

async function getSentiments(id: string) {
  const data: EmotionData = await fetch(
    `http://flask-env.eba-psh44mba.us-east-2.elasticbeanstalk.com/${id}/sentiments`
  ).then((res: any) => res.json());
  return data;
}

export default SentimentDashboard;
