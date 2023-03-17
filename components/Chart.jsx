import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";


function useAttendanceData() {
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = {};
      const sectionDocs = await getDocs(collection(db, "STEM"));
      sectionDocs.forEach((doc) => {
        const fields = doc.data();
        const section = doc.id;
        if (!data[section]) {
          data[section] = {};
        }
        Object.keys(fields).forEach((fieldName) => {
          const studentId = fieldName.substring(0, 2);
          const fieldNameWithoutNumber = fieldName.replace(/[0-9]/g, "");
          if (!data[section][studentId]) {
            data[section][studentId] = {};
          }
          data[section][studentId][fieldNameWithoutNumber] = fields[fieldName];
        });
      });
      console.log(data);
      console.log("hehe");
      setAttendanceData(data);
    };

    fetchData();
  }, []);

  const formatChartData = () => {
    const chartData = {
      labels: [],
      datasets: [
        {
          label: "Scanning Data",
          data: [],
          fill: false,
          borderColor: "#4FD1C5",
          backgroundColor: "#4FD1C5",
          pointBorderColor: "transparent",
          pointBackgroundColor: "transparent",
          lineTension: 0.3,
          type: "line", // added to change chart type to line chart
        },
      ],
    };

    const minuteData = {};
    Object.keys(attendanceData).forEach((section) => {
      const sectionData = attendanceData[section];
      Object.keys(sectionData).forEach((student) => {
        const studentData = sectionData[student];
        const lastScan = studentData["lastScan"];
        if (lastScan) {
          const minute = new Date(lastScan.seconds * 1000).getMinutes();
          const hour = new Date(lastScan.seconds * 1000).getHours();
          if (hour >= 18 && hour < 24 && minute >= 0 && minute <= 59) { // added to adjust time range
            if (!minuteData[minute]) {
              minuteData[minute] = 1;
            } else {
              minuteData[minute]++;
            }
          }
        }
      });
    });

    Object.keys(minuteData).forEach((minute) => {
      if (minute % 5 === 0) { // added to adjust x-axis labels
        chartData.labels.push(`${minute}:00`);
        chartData.datasets[0].data.push(minuteData[minute]);
      }
    });

    console.log("1")
    console.log(chartData)
    console.log("nice")

    return chartData;
  };


  return {
    attendanceData,
    formatChartData,
  };


}





const LineGraph = () => {
  const chartRef = useRef();
  const chartInstanceRef = useRef(null);
  const { formatChartData } = useAttendanceData();

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
  }, [formatChartData]);

  return (
    <div className="bg-white rounded-lg shadow-md m-4 overflow-hidden">
      <canvas ref={chartRef} className="w-full h-full"></canvas>
    </div>
  );
};

export default LineGraph;

