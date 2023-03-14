import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineGraph = ({ attendanceData }) => {
  const chartRef = useRef();
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const chartCtx = chartRef.current.getContext('2d');

    const data = [];
    Object.keys(attendanceData).forEach((studentId) => {
      Object.keys(attendanceData[studentId]).forEach((time) => {
        data.push({
          x: time,
          y: attendanceData[studentId][time],
        });
      });
    });

    const chartData = {
      datasets: [
        {
          label: 'Scanning Data',
          data,
          fill: false,
          borderColor: '#4FD1C5',
          backgroundColor: '#4FD1C5',
          pointBorderColor: 'transparent',
          pointBackgroundColor: 'transparent',
          lineTension: 0.3,
        },
      ],
    };

    if (chartInstanceRef.current) {
      // Destroy previous chart if it exists
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartCtx, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          yAxes: [{
            gridLines: {
              color: '#F5F5F5',
              zeroLineColor: '#F5F5F5',
            },
            ticks: {
              fontColor: '#888',
              beginAtZero: true,
              maxTicksLimit: 5,
              padding: 10,
            },
          }],
          xAxes: [{
            gridLines: {
              color: '#F5F5F5',
              zeroLineColor: '#F5F5F5',
            },
            ticks: {
              fontColor: '#888',
              padding: 5,
            },
          }],
        },
        legend: {
          display: false,
        },
        tooltips: {
          backgroundColor: '#4FD1C5',
          bodyFontColor: '#FFF',
          titleFontColor: '#FFF',
          titleMarginBottom: 10,
          bodySpacing: 5,
          xPadding: 10,
          yPadding: 10,
          mode: 'nearest',
          intersect: 0,
        },
      },
    });

    // Clean up function to destroy chart when component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [attendanceData]);

  return (
    <div className="bg-white rounded-lg shadow-md m-4 overflow-hidden">
      <canvas ref={chartRef} className="w-full h-full"></canvas>
    </div>
  );
};

export default LineGraph;
