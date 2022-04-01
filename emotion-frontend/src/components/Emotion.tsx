import {Bar} from 'react-chartjs-2';
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
      
      const labels = ['Angry', 'Sad', 'Disgust', 'Neutral', 'Happy', 'Suprise'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Emotions',
            data: [1,2,3,4,5,6],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      };
      
    
      return <Bar options={options} data={data} />;
     
}

export default Emotion