import React, { useEffect, useRef, useState } from 'react';

function Rank({ data, onClose }) {
  const earliestStudents = {};

  Object.keys(data).forEach((section) => {
    const sectionData = data[section];
    earliestStudents[section] = [];
    Object.keys(sectionData).forEach((student) => {
      const studentData = sectionData[student];
      const lastScan = studentData["lastScan"];
      if (lastScan) {
        const scanTime = lastScan.seconds * 1000;
        const formattedTime = new Date(scanTime).toLocaleTimeString();
        if (!earliestStudents[section][9] || scanTime < earliestStudents[section][9].scanTime) {
          // If the student is one of the top 10 earliest, add them to the list
          earliestStudents[section].push({ name: studentData.name, student, scanTime, formattedTime });
          earliestStudents[section].sort((a, b) => a.scanTime - b.scanTime);
          earliestStudents[section].splice(10);
        }
      }
    });
  });

  return (
    <div>
      {Object.keys(earliestStudents).map((section) => (
        <div key={section}>
          <h2>{section}</h2>
          <ol>
            {earliestStudents[section].map(({ name, student, formattedTime }) => (
              <li key={student}>{name} - {formattedTime}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

export default Rank;






/* <div>
<div className="fixed z-50 top-0 left-0 w-screen h-screen backdrop-blur-xl bg-gray/90"></div>
<div className="fixed z-50 top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-xl p-8 w-4/5 h-4/5 max-w-md">
  <button
    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
    onClick={onClose}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>

  </div>
</div> */