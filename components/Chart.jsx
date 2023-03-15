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
        },
      ],
    };

    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0); // set start time to 5:00 AM
    const endTime = new Date();
    endTime.setHours(24, 0, 0, 0); // set end time to 7:00 AM

    const minuteData = {}
    let currentTime = startTime;
    while (currentTime < endTime) {
      const minute = currentTime.getMinutes();
      chartData.labels.push(`${currentTime.getHours()}:${minute < 10 ? '0' + minute : minute}`);
      if (!minuteData[minute]) {
        chartData.datasets[0].data.push(0);
      } else {
        chartData.datasets[0].data.push(minuteData[minute]);
      }
      currentTime.setMinutes(currentTime.getMinutes() + 5); // increment time by 5 minutes
    }

    console.log(chartData);

    // Change chart type to line
    chartData.datasets[0].type = 'line';

    return chartData;
  };

  formatChartData();

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

