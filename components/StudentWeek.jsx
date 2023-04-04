import React from "react";

function StudentChart({ student, onClose }) {
  const grades = ["As", "Bs", "Cs", "Ds", "Es"];
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md p-4 w-3/4 h-1/2">
      <button
        className="text-lg font-bold absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={() => onClose()}
      >
        X
      </button>
      <p className="pt-4 text-lg font-bold">{student.name}</p>
      <p className="text-base">
        {student.strand}-{student.section}
      </p>
      <div>
        {grades.map((grade, index) => {
          return (
            <div key={index} className="flex items-center mb-3">
              <p className="w-20 mr-3">{daysOfWeek[index]}</p>
              <div
                className={`${
                  student[grade] === "late"
                    ? "bg-[#EC7063]"
                    : student[grade] === "ontime"
                    ? "bg-[#F7DC6F]"
                    : student[grade] === "early"
                    ? "bg-[#2ECC71]"
                    : "bg-[#BDCDD6]"
                } h-6 w-6 rounded-sm inline-block`}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentChart;
