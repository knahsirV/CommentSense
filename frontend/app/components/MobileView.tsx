"use client";
import { useState } from "react";
import Modal from "./Modal";
import DistChart from "./DistChart";
import { EmotionData, emoteLabels, emotionReasons } from "../ConstData";
import CommentsView from "./CommentsView";

const MobileView = ({ emotionData }: { emotionData: EmotionData }) => {
  const [explanationModalOpen, setExplanationModalOpen] = useState(false);
  const [sentimentModalOpen, setSentimentModalOpen] = useState(false);
  const [allCommentsModalOpen, setAllCommentModalOpen] = useState(false);
  const emotions = emotionData.sentiments;
  const mostCommonEmotion = emotionData.aggregate.most_common_sentiment;
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-6 lg:hidden">
      <button
        onClick={() => setExplanationModalOpen(true)}
        className="w-1/3 rounded-xl bg-zinc-900 p-4 font-semibold "
      >
        {"What's"} going on here?
      </button>
      <button
        onClick={() => setSentimentModalOpen(true)}
        className=" rounded-xl bg-zinc-900 p-4  font-semibold "
      >
        Sentiment Distribution
      </button>
      <button
        onClick={() => setAllCommentModalOpen(true)}
        className=" rounded-xl bg-zinc-900 p-4 font-semibold"
      >
        All comments for each emotion
      </button>
      <Modal isOpen={explanationModalOpen} setIsOpen={setExplanationModalOpen}>
        <h5 className="mb-4 text-xl font-bold text-zinc-500">
          {"What's"} going on here?
        </h5>
        <div className="scrollbar-hide overflow-scroll rounded-md">
          <h6 className=" text-justify font-semibold leading-loose">
            {emotionReasons[mostCommonEmotion]}
          </h6>
        </div>
      </Modal>
      <Modal isOpen={sentimentModalOpen} setIsOpen={setSentimentModalOpen}>
        <h5 className=" mb-4 text-center text-xl font-bold text-zinc-500">
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
      </Modal>
      <Modal isOpen={allCommentsModalOpen} setIsOpen={setAllCommentModalOpen}>
        <div className="grid h-[75vh] grid-rows-[auto_minmax(0,_1fr)] gap-4">
          <CommentsView
            data={emotionData}
            defaultChoice={emoteLabels[mostCommonEmotion].substring(3)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default MobileView;
