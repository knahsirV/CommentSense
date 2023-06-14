"use client";
import { useState } from "react";
import EmoteChoice from "./EmoteChoice";
import { EmotionData } from "../sense/[id]/page";

const CommentsView = ({
  defaultChoice,
  data,
}: {
  defaultChoice: string;
  data: EmotionData;
}) => {
  const emotes = [
    { em: "Joyful", bg: "bg-amber-300", text: "text-amber-300" },
    { em: "Angry", bg: "bg-red-500", text: "text-red-500" },
    { em: "Fearful", bg: "bg-violet-500", text: "text-violet-500" },
    { em: "Sad", bg: "bg-blue-600", text: "text-blue-600" },
    { em: "Suprised", bg: "bg-green-400", text: "text-green-400" },
    { em: "Disgusted", bg: "bg-lime-200", text: "text-lime-200" },
    { em: "Neutral", bg: "bg-slate-500", text: "text-slate-500" },
  ];
  const emoteLabels = {
    Joyful: "joy",
    Angry: "anger",
    Sad: "sadness",
    Fearful: "fear",
    Suprised: "surprise",
    Disgusted: "disgust",
    Neutral: "neutral",
  };
  const [selectedEmote, setSelectedEmote] = useState(defaultChoice);
  const comments: string[] =
    data.sentiment_data.sentiments[
      emoteLabels[
        selectedEmote as keyof typeof emoteLabels
      ] as keyof typeof data.sentiment_data.sentiments
    ];
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h5 className="font-bold">View all comments that are</h5>
          <EmoteChoice
            emotes={emotes.map((emote) => emote.em)}
            selectedEmote={selectedEmote}
            setSelectedEmote={setSelectedEmote}
          />
        </div>
        <span className="text-sm font-semibold text-zinc-500">
          {comments.length} comments
        </span>
      </div>
      <div className="scrollbar-hide max-h-[30rem] space-y-8 overflow-scroll rounded-xl">
        {comments.map((comment: string) => (
          <div
            key={comment}
            className={` w-max max-w-[75%] rounded-xl ${
              emotes.find((emote) => emote.em === selectedEmote)?.bg
            } bg-opacity-30 p-4 even:ml-auto even:text-right`}
          >
            <span
              className={` font-semibold ${
                emotes.find((emote) => emote.em === selectedEmote)?.text
              } `}
            >
              {comment}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentsView;
