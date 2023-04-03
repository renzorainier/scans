import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

function StudentChart({ student, onClose }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

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
  }, [student]);

  function formatChartData() {
    const data = {
      labels: ["A", "B", "C", "D", "E"],
      datasets: [
        {
          label: "time at school",
          data: [
            new Date(student.A.seconds * 1000)
              .toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })
              .split(":")
              .slice(0, 2)
              .join(":"),
            new Date(student.B.seconds * 1000)
              .toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })
              .split(":")
              .slice(0, 2)
              .join(":"),
            new Date(student.C.seconds * 1000)
              .toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })
              .split(":")
              .slice(0, 2)
              .join(":"),
            new Date(student.D.seconds * 1000)
              .toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })
              .split(":")
              .slice(0, 2)
              .join(":"),
            new Date(student.E.seconds * 1000)
              .toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })
              .split(":")
              .slice(0, 2)
              .join(":"),
          ],
          backgroundColor: "rgba(79, 209, 197, 0.2)",
          borderColor: "rgba(79, 209, 197, 1)",
          borderWidth: 2,
        },
      ],
    };
    return data;
  }

  return (
<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md p-4 w-3/4 h-1/2">
      <button
        className=" text-lg font-bold absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700"
        onClick={() => onClose()}
      >
        X
      </button>
      <p className="pt-4 text-lg font-bold mb-4">{student.name}</p>
      <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
        <canvas
          id={`chart-${student.id}`}
          ref={chartRef}
          className="w-full h-full"
        ></canvas>
      </div>
      <div>
  {["As", "Bs", "Cs", "Ds", "Es"].map((grade) => (
    <div
      className={`bg-${
        student[grade] === "late"
          ? "#EC7063"
          : student[grade] === "ontime"
          ? "#F7DC6F"
          : "#2ECC71"
      } h-6 w-6 rounded-sm inline-block mr-1`}
      key={grade}
    ></div>
  ))}
</div>


    </div>
  );
}

export default StudentChart;
