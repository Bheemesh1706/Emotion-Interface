import {Bar} from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { GetImageData } from '../api/backend';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function Emotion() {

    const [graphdata,setGraphData] = useState<any>();

    useEffect(()=>{
        GetImageData().then((e)=>{
          setGraphData(e)
        });
    })
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Bar Chart',
          },
        },
      };
      
      const labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Suprise' ,'Neutal'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Emotions',
            data: [graphdata?.angry*10,graphdata?.disgust*10,graphdata?.fear*10,graphdata?.happy*10,graphdata?.sad*10,graphdata?.suprise*10,graphdata?.neutral*10],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      };
      
    
      return <Bar options={options} data={data} />;
     
}

export default Emotion