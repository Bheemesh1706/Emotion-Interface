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

function Sentiment() {
  const [sentidata, setSentiData] = useState<any>();

  useEffect(() => {
    GetSentimentData().then((e) => {
      setSentiData(e);
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
        data: [
          sentidata?.Happy * 10000000000000000,
          sentidata?.Neutral * 10000000000000000,
          sentidata?.Sad * 10000000000000000,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default Sentiment;
