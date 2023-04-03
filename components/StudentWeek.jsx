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


    function StatusDot({ status }) {
      let color = "";
      switch (status) {
        case "late":
          color = "#EC7063";
          break;
        case "ontime":
          color = "#F7DC6F";
          break;
        case "early":
          color = "#2ECC71";
          break;
        default:
          color = "transparent";
      }

      return (
        <div className={`bg-${color} h-6 w-6 rounded-sm inline-block mr-1`}></div>
      );
    }

  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md p-4 w-3/4 h-1/2">
    <button
      className="text-lg font-bold absolute top-2 right-2 text-gray-500 hover:text-gray-700"
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
  <StatusDot status={student.As} />
  <StatusDot status={student.Bs} />
  <StatusDot status={student.Cs} />
  <StatusDot status={student.Ds} />
  <StatusDot status={student.Es} />
</div>

  </div>

  );
}

export default StudentChart;


// {/* <div>
//         {student.As === "late" && (
//           <div className="bg-[#EC7063] h-6 w-6 rounded-sm inline-block mr-1"></div>
//         )}
//         {student.As === "ontime" && (
//           <div className="bg-[#F7DC6F]  h-6 w-6 rounded-sm inline-block mr-1"></div>
//         )}
//         {student.As === "early" && (
//           <div className="bg-[#2ECC71]  h-6 w-6 rounded-sm inline-block mr-1"></div>
//         )}
//         {student.Bs === "late" && (
//           <div className="bg-[#EC7063] h-6 w-6 rounded-sm inline-block mr-1"></div>
//         )}
//         {student.Bs === "ontime" && (
//           <div className="bg-[#F7DC6F]  h-6 w-6 rounded-sm inline-block mr-1"></div>
//         )}
//         {student.Bs === "early" && (
//           <div className="bg-[#2ECC71]  h-6 w-6 rounded-sm inline-block mr-1"></div>
//         )}
//         {student.Cs === "late" && (
//           <div className="bg-[#EC7063] h-6 w-6 rounded-sm inline-block mr-1"></div>
//         )}
//         {student.Cs === "ontime" && (
//           <div className="bg-[#F7DC6F]  h-6 w-6 rounded-sm inline-block mr-1"></div>
//         )}
//         {student.Cs === "early" && (
//           <div className="bg-[#2ECC71]  h-6 w-6 rounded-sm inline-block mr-1"></div>
//         )}
//         {student.Ds === "late" && (
//           <div className="bg-[#EC7063] h-6 w-6 rounded-sm inline-block mr-1"></div>
//         )}
//         {student.Ds === "ontime" && (
//           <div className="bg-[#F7DC6F]  h-6 w-6 rounded-sm inline-block mr-1"></div>
//         )}
//         {student.Ds === "early" && (
//           <div className="bg-[#2ECC71]  h-6 w-6 rounded-sm inline-block mr-1"></div>
//         )}
//         {student.Es === "late" && (
//           <div className="bg-[#EC7063] h-6 w-6 rounded-sm inline-block mr-1"></div>
//         )}
//         {student.Es === "ontime" && (
//           <div className="bg-[#F7DC6F]  h-6 w-6 rounded-sm inline-block mr-1"></div>
//         )}
//         {student.Es === "early" && (
//           <div className="bg-[#2ECC71]  h-6 w-6 rounded-sm inline-block mr-1"></div>
//         )}
//       </div> */}