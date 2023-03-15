import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function useAttendanceData() {
  const [attendanceData, setAttendanceData] = useState([]);

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

      // Process the data
      const formattedData = Object.keys(data).map((section) => {
        const studentScans = {};
        Object.keys(data[section]).forEach((studentId) => {
          Object.keys(data[section][studentId]).forEach((fieldName) => {
            if (fieldName.startsWith("scan")) {
              const timestamp = data[section][studentId][fieldName];
              const minute = moment(timestamp).startOf("minute").format();
              if (!studentScans[minute]) {
                studentScans[minute] = 0;
              }
              studentScans[minute]++;
            }
          });
        });
        const scansPerMinute = Object.keys(studentScans).map((minute) => ({
          x: minute,
          y: studentScans[minute],
        }));
        return { section, scansPerMinute };
      });
      console.log(data)
      console.log(formattedData)
      setAttendanceData(formattedData);
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
