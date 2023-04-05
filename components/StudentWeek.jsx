import { Fragment } from "react";

function StudentChart({ student, onClose }) {
  const grades = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const times = ["A", "B", "C", "D", "E"];

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
      <div className="flex justify-between items-center px-4 py-2 md:py-4 border-b border-gray-200">
        <p className="text-lg md:text-xl font-bold">{student.name}</p>
        <button
          className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-full p-1 md:p-2"
          onClick={() => onClose()}
        >
            X
        </button>
      </div>

      <div className="px-4 py-2 md:p-4">
        <p className="text-lg md:text-xl font-bold">{`${student.strand}-${student.section}`}</p>
      </div>

      <div className="grid grid-cols-5 gap-4 p-4">
        {grades.map((grade, index) => {
          let gradeValue;
          switch (grade) {
            case "Mon":
              gradeValue = "As";
              break;
            case "Tue":
              gradeValue = "Bs";
              break;
            case "Wed":
              gradeValue = "Cs";
              break;
            case "Thu":
              gradeValue = "Ds";
              break;
            case "Fri":
              gradeValue = "Es";
              break;
            default:
              break;
          }
          let color = "";
          switch (student[gradeValue]) {
            case "late":
              color = "bg-red-500";
              break;
            case "ontime":
              color = "bg-yellow-400";
              break;
            case "early":
              color = "bg-green-500";
              break;
            default:
              color = "bg-gray-400";
              break;
          }
          const timeValue = student[times[index]];
          return (
            <div
              key={index}
              className={`flex flex-col items-center justify-between ${color} h-28 rounded-md shadow-lg p-2`}
            >
              <p className="text-xs md:text-sm font-semibold text-gray-600">{grade}</p>
              <div className="w-6 h-6 rounded-full bg-white"></div>
              {timeValue && times.includes(times[index]) ? (
                <Fragment>
                  <div className="w-full h-px bg-gray-200 my-2"></div>
                  <p className="text-xs md:text-sm font-semibold text-gray-600">
                    {new Date(timeValue.seconds * 1000).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </p>
                </Fragment>
              ) : (
                <p className="text-xs md:text-sm font-semibold text-gray-600">no record</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentChart;