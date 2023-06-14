"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

const DistChart = ({ emoteData }: { emoteData: number[] }) => {
  const colors = [
    "#fcd34d", // amber-300
    "#ef4444", // red-500
    "#8B5CF6", // violet-500
    "#2563EB", // blue-600
    "#4ade80", // green-400
    "#D9F99D", // lime-200
    "#64748b", // slate-500
  ];
  const data = {
    labels: [
      "Joy",
      "Anger",
      "Fear",
      "Sadness",
      "Suprise",
      "Disgust",
      "Neutral",
    ],
    datasets: [
      {
        label: "# of Comments",
        data: emoteData,
        backgroundColor: colors,
        borderColor: colors,
      },
    ],
  };
  return (
    <div className="grid h-full max-h-40 place-items-center">
      <Doughnut
        data={data}
        options={{
          cutout: "75%",
        }}
      />
    </div>
  );
};

export default DistChart;
