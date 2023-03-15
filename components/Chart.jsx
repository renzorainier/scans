import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

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

      // Format data for line graph
      const graphData = {
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

      Object.keys(data).forEach((section) => {
        const sectionData = data[section];
        const studentsByMinute = {};
        Object.keys(sectionData).forEach((studentId) => {
          const studentData = sectionData[studentId];
          if (studentData["lastScan"]) {
            const scanTime = new Date(studentData["lastScan"]);
            const minute = scanTime.getMinutes();
            if (!studentsByMinute[minute]) {
              studentsByMinute[minute] = 0;
            }
            studentsByMinute[minute]++;
          }
        });

        Object.keys(studentsByMinute).forEach((minute) => {
          graphData.labels.push(`${section} - ${minute}`);
          graphData.datasets[0].data.push(studentsByMinute[minute]);
        });
      });

      console.log(graphData);
      setAttendanceData(graphData);
    };

    fetchData();
  }, []);

  return {
    attendanceData,
  };
}



const LineGraph = () => {
  const chartRef = useRef();
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const chartCtx = chartRef.current.getContext('2d');

    const mockData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', "Jul"],
      datasets: [
        {
          label: 'Scanning Data',
          data: [12, 19, 3, 5, 2, 3],
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
      data: mockData,
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
  }, []);

  return (

    <div className="bg-white rounded-lg shadow-md m-4 overflow-hidden">
      <canvas ref={chartRef} className="w-full h-full"></canvas>
    </div>
  );
};

export default LineGraph;
