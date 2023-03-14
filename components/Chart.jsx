import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';

const LineGraph = () => {
  const chartRef = useRef();

  useEffect(() => {
    const chartCtx = chartRef.current.getContext('2d');

    const mockData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Scanning Data',
          data: [12, 19, 3, 5, 2, 3],
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          lineTension: 0.1,
        },
      ],
    };

    new Chart(chartCtx, {
      type: 'line',
      data: mockData,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    });
  }, []);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineGraph;
