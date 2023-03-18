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

    const minuteData = {};
    const studentsByMinute = {};
    Object.values(attendanceData).forEach((section) => {
      Object.values(section).forEach((student) => {
        const lastScan = student.lastScan;
        if (lastScan) {
          const hour = new Date(lastScan.seconds * 1000).getHours();
          const minute = new Date(lastScan.seconds * 1000).getMinutes();
          const key = `${hour}:${minute}`;
          if (!minuteData[key]) {
            minuteData[key] = 1;
            studentsByMinute[key] = [student];
          } else {
            minuteData[key]++;
            studentsByMinute[key].push(student);
          }
        }
      });
    });

    // Create an array of timestamps for each minute between the first and last scan
    const timestamps = Object.keys(minuteData).sort((a, b) => {
      const dateA = new Date(`1970-01-01T${a}:00`);
      const dateB = new Date(`1970-01-01T${b}:00`);
      return dateA - dateB;
    });
    const firstTimestamp = timestamps[0];
    const lastTimestamp = timestamps[timestamps.length - 1];
    if (firstTimestamp && lastTimestamp) {
      const [firstHour, firstMinute] = firstTimestamp.split(":").map((num) => parseInt(num, 10));
      const [lastHour, lastMinute] = lastTimestamp.split(":").map((num) => parseInt(num, 10));

      const minutesInBetween = (lastHour - firstHour) * 60 + (lastMinute - firstMinute) + 1;
      let currentHour = firstHour;
      let currentMinute = firstMinute;

      // Push each minute's data into the chart data, even if there isn't any data for that minute
      for (let i = 0; i < minutesInBetween; i++) {
        const currentTimestamp = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
        chartData.labels.push(currentTimestamp);
        chartData.datasets[0].data.push(minuteData[currentTimestamp] || 0);

        currentMinute++;
        if (currentMinute === 60) {
          currentMinute = 0;
          currentHour++;
        }
      }
    }

    console.log(chartData);

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

