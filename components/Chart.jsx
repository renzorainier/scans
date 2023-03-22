import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";

const LineGraph = ({ attendanceData }) => {
  const chartRef = useRef();
  const chartInstanceRef = useRef(null);

  const formatChartData = () => {
    const chartData = {
      labels: [],
      datasets: [
        {
          label: 'Students per minute',
          data: [],
          fill: false,
          borderColor: '#A9AFE3',
          backgroundColor: '#A9AFE3',
          pointBorderColor: '#A9AFE3',
          pointBackgroundColor: '#A9AFE3',
          lineTension: 0.4,
        },
      ],
    };

    let earliestScanTime = null;
    let latestScanTime = null;
    const minuteData = {};
    Object.keys(attendanceData).forEach((section) => {
      const sectionData = attendanceData[section];
      Object.keys(sectionData).forEach((student) => {
        const studentData = sectionData[student];
        const lastScan = studentData['lastScan'];
        if (lastScan) {
          const scanTime = lastScan.seconds * 1000;
          if (earliestScanTime === null || scanTime < earliestScanTime) {
            earliestScanTime = scanTime;
          }
          if (latestScanTime === null || scanTime > latestScanTime) {
            latestScanTime = scanTime;
          }
          const minute = new Date(scanTime).getMinutes();
          const hour = new Date(scanTime).getHours();
          const formattedMinute = `${hour.toString().padStart(2, '0')}:${minute
            .toString()
            .padStart(2, '0')}`;
          if (!minuteData[formattedMinute]) {
            minuteData[formattedMinute] = 1;
          } else {
            minuteData[formattedMinute]++;
          }
        }
      });
    });

    const earliestTime = new Date(earliestScanTime);
    const latestTime = new Date(latestScanTime);

    // Create empty data points for all minutes between earliest and latest scan time
    for (let i = earliestTime.getMinutes(); i <= latestTime.getMinutes(); i++) {
      const formattedMinute = `${earliestTime.getHours().toString().padStart(2, '0')}:${i
        .toString()
        .padStart(2, '0')}`;
      if (!minuteData[formattedMinute]) {
        minuteData[formattedMinute] = 0;
      }
    }

    // Sort minuteData by date of the minute
    const sortedMinuteData = Object.entries(minuteData).sort(([a], [b]) => {
      const aDate = new Date(`2022-01-01 ${a}`);
      const bDate = new Date(`2022-01-01 ${b}`);
      return aDate - bDate;
    });

    // Update chartData labels and data
    sortedMinuteData.forEach(([minute, data]) => {
      chartData.labels.push(minute);
      chartData.datasets[0].data.push(data);
    });

    return chartData;
  };

  useEffect(() => {
    const chartCtx = chartRef.current.getContext('2d');

    const chartData = formatChartData();

    if (chartInstanceRef.current) {
      // Destroy previous chart if it exists
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartCtx, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          yAxes: [
            {
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
  }, [formatChartData]);

  return (
    <div className="bg-white rounded-lg shadow-md m-4 overflow-hidden">
      <canvas ref={chartRef} className="w-full h-full"></canvas>
    </div>
  );
};

export default LineGraph;

