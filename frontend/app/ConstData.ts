export interface EmotionData {
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
}

export interface VideoData {
  title: string;
  channel: string;
}

export const emoteLabels = {
  joy: "😄 Joyful",
  anger: "😡 Angry",
  sadness: "😢 Sad",
  fear: "😨 Fearful",
  surprise: "😮 Surprised",
  disgust: "🤢 Disgusted",
  neutral: "😐 Neutral",
};

export const emotionReasons = {
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
