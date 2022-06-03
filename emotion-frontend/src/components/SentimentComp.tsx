import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { GetSentimentData } from "../api/backend";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SentimentComp() {
  const [senti, setSenti] = useState<any>();

  useEffect(() => {
    GetSentimentData().then((e) => {
      setSenti(e);
    });
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Bar Chart",
      },
    },
  };

  const labels = ["Happy", "Neutal", "Sad"];

  const data = {
    labels,
    datasets: [
      {
        label: "Sentiments",
        data: [senti?.Happy * 10, senti?.Neutral * 10, senti?.Sad * 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default SentimentComp;
