import React, { useRef, useEffect } from "react";

function StudentChart({ student, onClose }) {
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
        <div>
          {student.As === "late" && (
            <div className="bg-[#EC7063] h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
          {student.As === "ontime" && (
            <div className="bg-[#F7DC6F]  h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
          {student.As === "early" && (
            <div className="bg-[#2ECC71]  h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
          {student.As === "" && (
            <div className="bg-[#BDCDD6]  h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
          {student.Bs === "late" && (
            <div className="bg-[#EC7063] h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
          {student.Bs === "ontime" && (
            <div className="bg-[#F7DC6F]  h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
          {student.Bs === "early" && (
            <div className="bg-[#2ECC71]  h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
          {student.Bs === "" && (
            <div className="bg-[#BDCDD6]  h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
          {student.Cs === "late" && (
            <div className="bg-[#EC7063] h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
          {student.Cs === "ontime" && (
            <div className="bg-[#F7DC6F]  h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
          {student.Cs === "early" && (
            <div className="bg-[#2ECC71]  h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
          {student.Cs === "" && (
            <div className="bg-[#BDCDD6]  h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
          {student.Ds === "late" && (
            <div className="bg-[#EC7063] h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
          {student.Ds === "ontime" && (
            <div className="bg-[#F7DC6F]  h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
          {student.Ds === "early" && (
            <div className="bg-[#2ECC71]  h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
          {student.Ds === "" && (
            <div className="bg-[#BDCDD6]  h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
          {student.Es === "late" && (
            <div className="bg-[#EC7063] h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
          {student.Es === "ontime" && (
            <div className="bg-[#F7DC6F]  h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
          {student.Es === "early" && (
            <div className="bg-[#2ECC71]  h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
          {student.Es === "" && (
            <div className="bg-[#BDCDD6]  h-6 w-6 rounded-sm inline-block m-3"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentChart;
