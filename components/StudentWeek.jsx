import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';

function StudentChart({ student }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext('2d');

    new Chart(myChartRef, {
      type: 'bar',
      data: {
        labels: ['A', 'B', 'C', 'D', 'E'],
        datasets: [
          {
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
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }, [student]);

  return <canvas id={`chart-${student.studentId}`} ref={chartRef} />;
}

export default StudentChart;
