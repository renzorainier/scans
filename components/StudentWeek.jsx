import React from 'react';
import Chart from 'chart.js/auto';

function StudentDetails({ student, onClose }) {
  const chartRef = React.useRef(null);

  React.useEffect(() => {
    if (chartRef.current) {
      const myChart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['A', 'B', 'C', 'D', 'E'],
          datasets: [{
            label: 'Grades',
            data: [student.A, student.B, student.C, student.D, student.E],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [student]);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md p-4">
      <button className=" text-lg font-bold absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700" onClick={() => onClose()}>
        X
      </button>
      <p className="pt-4 text-lg font-bold mb-4">{student.name}</p>
      <canvas ref={chartRef} />
    </div>
  );
}

export default StudentDetails;
