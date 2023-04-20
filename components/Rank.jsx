import React, { useEffect, useRef, useState } from "react";

function getBadgeRank(rank) {
  switch (rank) {
    case 1:
      return "1";
    case 2:
      return "2";
    case 3:
      return "3";
    case 4:
      return "4";
    case 5:
      return "5";
    case 6:
      return "6";
    case 7:
      return "7";
    case 8:
      return "8";
    case 9:
      return "9";
    case 10:
      return "10";
  }
}

function getBadgeRankSec(rank) {
  switch (rank) {
    case 1:
      return "1";
    case 2:
      return "2";
    case 3:
      return "3";
    case 4:
      return "4";
    case 5:
      return "5";
    case 6:
      return "6";
    case 7:
      return "7";
    case 8:
      return "8";
    case 9:
      return "9";
    case 10:
      return "10";
  }
}

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
      <div className="flex justify-center pt-4 pb-5 items-center">
        <div
          className="w-full text-gray-700 bg-white p-5 rounded-lg shadow-lg mx-auto"
          style={{ maxWidth: "90%" }}
        >
          <div className="flex space-x-2">
            <button
              onClick={() => handleTabClick("A")}
              className="w-full px-4 py-2 text-white transition-colors duration-150 bg-gray-300 border border-transparent rounded-lg active:bg-gray-300 hover:bg-gray-400 focus:outline-none"
            >
              Mon
            </button>
            <button
              onClick={() => handleTabClick("B")}
              className="w-full px-4 py-2 text-white transition-colors duration-150 bg-gray-300 border border-transparent rounded-lg active:bg-gray-300 hover:bg-gray-400 focus:outline-none"
            >
              Tue
            </button>
            <button
              onClick={() => handleTabClick("C")}
              className="w-full px-4 py-2 text-white transition-colors duration-150 bg-gray-300 border border-transparent rounded-lg active:bg-gray-300 hover:bg-gray-400 focus:outline-none"
            >
              Wed
            </button>
            <button
              onClick={() => handleTabClick("D")}
              className="w-full px-4 py-2 text-white transition-colors duration-150 bg-gray-300 border border-transparent rounded-lg active:bg-gray-300 hover:bg-gray-400 focus:outline-none"
            >
              Thu
            </button>
            <button
              onClick={() => handleTabClick("E")}
              className="w-full px-4 py-2 text-white transition-colors duration-150 bg-gray-300 border border-transparent rounded-lg active:bg-gray-300 hover:bg-gray-400 focus:outline-none"
            >
              Fri
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div
          className="w-full text-gray-70 flex justify-center font-bold items-center bg-white p-5 rounded-t-lg shadow-lg mx-auto"
          style={{ maxWidth: "90%" }}
        >
          Overall Top 10 Most Punctual Students
        </div>
      </div>
      <div className="flex justify-center pb-5 items-center">

          <div className=" w-full flex justify-center pb-5 items-center"
                    style={{ maxWidth: "90%" }}
                    >
            <div className="w-full bg-gray-900 rounded-b-lg shadow-xl mx-auto">
              <div className="py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {overallEarliest.map(
                    ({ name, section, formattedTime }, index) => (
                      <div
                        key={name}
                        className="relative border border-gray-800 rounded-lg overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-b from-black to-transparent">
                          <div className="text-white text-lg">{name}</div>
                          <div className="text-white text-sm">
                            {formattedTime}&emsp;|&emsp;{section}
                          </div>
                        </div>
                        <div className="w-full h-52 overflow-hidden">
                          <img
                            src={`/pictures/S${getBadgeRank(index + 1)}.png`}
                            alt={`Badge ${getBadgeRank(index + 1)}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute top-0 right-0 p-2">
                          <div className="text-white text-3xl font-bold">
                            {index + 1}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
      </div>

      <div>
        {Object.keys(earliestStudents).map((section) => (
          <div>
            <div className="flex justify-center  items-center">
              <div
                className="w-full text-gray-700 bg-gray-200 font-bold flex justify-center items-center p-5 rounded-t-lg shadow-lg mx-auto"
                style={{ maxWidth: "90%" }}
              >
                <h2>{section}</h2>
              </div>
            </div>

            <div className="flex justify-center pb-5 items-center">
              <div
                className="w-full text-gray-700 bg-white p-5 rounded-b-lg shadow-lg mx-auto"
                style={{ maxWidth: "90%" }}
              >
                <div className="flex justify-center pb-5 items-center">
                  <div className="w-full bg-gray-900 rounded-lg shadow-xl mx-auto">
                    <div className="py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {earliestStudents[section].map(
                          ({ name, student, formattedTime }, index) => (
                            <div key={student} className="relative">
                              <img
                                src={`/pictures/${getBadgeRankSec(
                                  index + 1
                                )}.png`}
                                alt={`Badge ${getBadgeRankSec(index + 1)}`}
                                className="w-full h-full pb-5 object-cover rounded-lg"
                              />
                              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 via-gray-900 to-transparent rounded-b-lg">
                                <div className="text-white text-sm">{name}</div>
                                <div className="text-gray-400 text-xs">
                                  {formattedTime}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rank;

{
  /* <div>
<div>
  <div className="fixed z-50 top-0 left-0 w-screen h-screen backdrop-blur-xl bg-gray/90"></div>
  <div className="fixed z-50 top-1/2anslate/2 -tranite  shadow-xl p-8 w-4/5 h-full max-w-md">
    <button
      className="absolute top-3 gray-4 gray-gray-500 onClose}
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
          strokeW
 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <h2>Overall Top 10 Earliest Students</h2>
<4ray>
  {overallEarliest.,   formattedTime }) => (
    <li key={student}>{name}- {formattedTime} - {section}</li>
  ))}
</gray>
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
