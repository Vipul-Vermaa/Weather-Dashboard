import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement, Legend);

export const LineChart = ({forecastData}) => {
    const labels = getDays()

  const temps = forecastData.map(item => item.main.temp);



  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Temperature Trends',
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temps,
        borderColor: 'rgba( 184, 59, 176,1)',
        backgroundColor: '#B83BB0',
      },
    ],
  };



  return (
    <Line options={options} data={data} />
    
  );
};


export function getDays(){
    const labels=[]
    const days=[
        'Saturday',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        
    ]

    const currentDay=new Date().getDay()
    const remain=6-currentDay

    for(let i=currentDay;i<days.length;i--){
        const element=days[i]
        labels.unshift(element)
        if (i===0) break
    }

    for (let i = 6; i > remain; i--) {
        if (i === currentDay) break;
        const element = days[i];
        labels.unshift(element);
      }

      return labels
}