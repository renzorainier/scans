import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineGraph = () => {
  const chartRef = useRef();
  const chartInstanceRef = useRef(null);

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

    if (chartInstanceRef.current) {
      // Destroy previous chart if it exists
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartCtx, {
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

    // Clean up function to destroy chart when component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineGraph;
