import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { useEffect, useState } from 'react';
import { GetAllImageData ,GetImageData} from '../api/backend';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



export function TimeGraph() {

   const [angry,setAngry] = useState<any>([]);
   const [sad,setSad] = useState<any>([]);
   const [neutral,setNeutral] = useState<any>([]);
   const [fear,setFear] = useState<any>([]);
   const [disgust,setDisgust] = useState<any>([]);
   const [happy,setHappy] = useState<any>([]);
   const [surprise,setSurprise] = useState<any>([]);

  //  useEffect(()=>{
  //   GetAllImageData().then((e)=>{
  //             console.log(e);
  //          e.map((data:any)=>{
  //            console.log(data);
  //           setAngry((angry:any)=>[...angry,data.Angry]);
  //           setDisgust((disgust:any)=>[...disgust,data.Disgust]);
  //           setFear((fear:any)=>[...fear,data.Fear]);
  //           setHappy((happy:any)=>[...happy,data.Happy]);
  //           setNeutral((neutral:any)=>[...neutral,data.Neutral]);
  //           setSad((sad:any)=>[...sad,data.Sad]);
  //           setSurprise((surprise:any)=>[...surprise,data.Surprise]);
  //          });
  //   });
  //  },[]);

   useEffect(()=>{
     var ID='';
        GetImageData().then((e)=>{
          if(ID!=e._id)
          {
          setAngry((angry:any)=>[...angry,e.Angry]);
          setDisgust((disgust:any)=>[...disgust,e.Disgust]);
          setFear((fear:any)=>[...fear,e.Fear]);
          setHappy((happy:any)=>[...happy,e.Happy]);
          setNeutral((neutral:any)=>[...neutral,e.Neutral]);
          setSad((sad:any)=>[...sad,e.Sad]);
          setSurprise((surprise:any)=>[...surprise,e.Surprise]);
          ID=e._id
          }
        })
   })

     const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Line Chart',
          },
          scales: {
            X: {
              type: 'time',
              time: {
                unit: 'minute'
              }
            },
            y: {
              beginAtZero: true
            }
          },
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Angry',
            data: angry,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Sad',
            data: sad,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Happy',
            data: happy,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Neutral',
            data: neutral,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Fear',
            data: fear,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Disgust',
            data: disgust,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Surprise',
            data: surprise,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          
        ],
      };
      
    return <Line options={options} data={data} />;
}

export default TimeGraph