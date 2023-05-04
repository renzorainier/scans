import React, { useEffect, useRef, useState, useCallback } from "react";
import Chart from "chart.js/auto";
import { collection, getDocs } from "firebase/firestore";

const NumberLineGraph = ({ data }) => {
  console.log(data);
  const chartRef = useRef();
  const chartInstanceRef = useRef(null);

  const formatChartData = useCallback(() => {
    const chartData = {
      labels: [],
      datasets: [
        {
          label: "Number of Students",
          data: [],
          fill: false,
          borderColor: "#42A5F5",
          backgroundColor: "#42A5F5",
          pointBorderColor: "#42A5F5",
          pointBackgroundColor: "#42A5F5",
          lineTension: 0.4,
        },
      ],
    };

    let earliestScanTime = null;
    let latestScanTime = null;
    const minuteData = {};

    Object.keys(data).forEach((section) => {
      const sectionData = data[section];
      Object.keys(sectionData).forEach((student) => {
        const studentData = sectionData[student];
        const lastScan = studentData["lastScan"];
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
          const formattedMinute = `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`;
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
    const hourDiff = latestTime.getHours() - earliestTime.getHours();

    // Create empty data points for all minutes between earliest and latest scan time
    for (let i = earliestTime.getMinutes(); i <= latestTime.getMinutes(); i++) {
      const formattedMinute = `${earliestTime
        .getHours()
        .toString()
        .padStart(2, "0")}:${i.toString().padStart(2, "0")}`;
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
    let cumulativeSum = 0;
    sortedMinuteData.forEach(([minute, data]) => {
      cumulativeSum += data;
      chartData.labels.push(minute);
      chartData.datasets[0].data.push(cumulativeSum);
    });

    console.log(chartData);

    return chartData;
  }, [data]);

  useEffect(() => {
    const chartCtx = chartRef.current.getContext("2d");

    const chartData = formatChartData();

    if (chartInstanceRef.current) {
      // Destroy previous chart if it exists
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartCtx, {
      type: "line",
      data: chartData,
      options: {
        events: [],
        scales: {
          yAxes: [
            {
              gridLines: {
                color: "#F5F5F5",
                zeroLineColor: "#F5F5F5",
              },
              ticks: {
                fontColor: "#888",
                beginAtZero: true,
                maxTicksLimit: 5,
                padding: 10,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                color: "#F5F5F5",
                zeroLineColor: "#F5F5F5",
              },
              ticks: {
                fontColor: "#888",
                padding: 5,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          backgroundColor: "#4FD1C5",
          bodyFontColor: "#FFF",
          titleFontColor: "#FFF",
          titleMarginBottom: 10,
          bodySpacing: 5,
          xPadding: 10,
          yPadding: 10,
          mode: "nearest",
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
    <div id="canvas" className="bg-white rounded-lg shadow-md mt-4 mb-4 overflow-hidden">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default NumberLineGraph;
