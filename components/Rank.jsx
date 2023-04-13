import React, { useEffect, useRef, useState } from "react";

function Rank({ data, onClose }) {
  const earliestStudents = {};
  const overallEarliest = [];

  const [activeTab, setActiveTab] = useState("");

  const handleTabClick = (dayCode) => {
    setActiveTab(dayCode);
  };

  useEffect(() => {
    const days = ["A", "B", "C", "D", "E"];
    const today = new Date().getDay();
    setActiveTab(days[today - 1]);
  }, []);

  Object.keys(data).forEach((section) => {
    const sectionData = data[section];
    earliestStudents[section] = [];
    Object.keys(sectionData).forEach((student) => {
      const studentData = sectionData[student];
      const dayData = studentData[activeTab];
      if (dayData) {
        const scanTime = dayData.seconds * 1000;
        const formattedTime = new Date(scanTime).toLocaleTimeString();
        if (
          !earliestStudents[section][9] ||
          scanTime < earliestStudents[section][9].scanTime
        ) {
          // If the student is one of the top 10 earliest, add them to the section list and overall list
          earliestStudents[section].push({
            name: studentData.name,
            student,
            scanTime,
            formattedTime,
          });
          earliestStudents[section].sort((a, b) => a.scanTime - b.scanTime);
          earliestStudents[section].splice(10);

          if (!overallEarliest[9] || scanTime < overallEarliest[9].scanTime) {
            overallEarliest.push({
              name: studentData.name,
              section: studentData.section,
              student,
              scanTime,
              formattedTime,
            });
            overallEarliest.sort((a, b) => a.scanTime - b.scanTime);
            overallEarliest.splice(10);
          }
        }
      }
    });
  });

  return (
    <div>
      <div>
      <div className="flex space-x-1">
  <button
    onClick={() => handleTabClick("A")}
    className="w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
  >
    Monday
  </button>
  <button
    onClick={() => handleTabClick("B")}
    className="w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
  >
    Tuesday
  </button>
  <button
    onClick={() => handleTabClick("C")}
    className="w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
  >
    Wednesday
  </button>
  <button
    onClick={() => handleTabClick("D")}
    className="w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
  >
    Thursday
  </button>
  <button
    onClick={() => handleTabClick("E")}
    className="w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
  >
    Friday
  </button>
</div>

      </div>
      <div>
        <h2>Overall Top 10</h2>
        <ol>
          {overallEarliest.map(({ name, section, formattedTime }) => (
            <li key={name}>
              {name} - {section} - {formattedTime}
            </li>
          ))}
        </ol>
      </div>

      {Object.keys(earliestStudents).map((section) => (
        <div key={section}>
          <h2>{section}</h2>
          <ol>
            {earliestStudents[section].map(
              ({ name, student, formattedTime }) => (
                <li key={student}>
                  {name} - {formattedTime}
                </li>
              )
            )}
          </ol>
        </div>
      ))}
    </div>
  );
}

export default Rank;

{
  /* <div>
<div>
  <div className="fixed z-50 top-0 left-0 w-screen h-screen backdrop-blur-xl bg-gray/90"></div>
  <div className="fixed z-50 top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-xl p-8 w-4/5 h-full max-w-md">
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
    <h2>Overall Top 10 Earliest Students</h2>
<ol>
  {overallEarliest.map(({ name, student, section,   formattedTime }) => (
    <li key={student}>{name}- {formattedTime} - {section}</li>
  ))}
</ol>
{Object.keys(earliestStudents).map((section) => (
  <div key={section}>
    <h2>{section}</h2>
    <ol>
      {earliestStudents[section].map(({ name, student, formattedTime }) => (
        <li key={student}>{name} - {formattedTime} </li>
      ))}
    </ol>
  </div>
))}
  </div>
</div>
</div> */
}
