import React, { useState, useEffect } from "react";
function Rank({ data, onClose }) {
  // Create an array of sections from the keys of the data object
  const sections = Object.keys(data);

  // Create an object to hold the top 10 students for each section
  const top10Students = {};

  // Loop through each section and find the top 10 students based on their lastScan field
  sections.forEach(section => {
    // Create an array of students for the current section from the keys of the section object
    const students = Object.keys(data[section]);

    // Sort the students by their lastScan field in ascending order (earliest scans first)
    const sortedStudents = students.sort((a, b) => {
      const aLastScan = data[section][a].lastScan;
      const bLastScan = data[section][b].lastScan;
      return aLastScan - bLastScan;
    });

    // Slice the first 10 students from the sorted array and add them to the top10Students object
    top10Students[section] = sortedStudents.slice(0, 10).map(studentId => {
      // Get the student object for the current studentId
      const student = data[section][studentId];

      // Return an object that contains the studentId, name, and lastScan fields
      return {
        studentId,
        name: student.name,
        lastScan: student.lastScan,
      };
    });
  });

  // Render the component with the top 10 students for each section
  return (
    <div>
      {sections.map(section => (
        <div key={section}>
          <h2>{section}</h2>
          <ul>
            {top10Students[section].map(student => (
              <li key={student.studentId}>
                {student.name} - {student.lastScan}
              </li>
            ))}
          </ul>
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