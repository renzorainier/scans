import { useState, useEffect } from "react";

import TodayAttendance from "./TodayView";
import PastAttendance from "./PastView";
import Greeting from "./Dash";
import Calculator from "./Sample";
import Pass from "./Pass";
import Generate from "./Generate";
import TeamCarousel from "./Members";
import About from "./About";

const MainComponent = () => {
  const [components, setComponents] = useState([]);

  const handleButtonClick = (componentName) => {
    if (!components.includes(componentName)) {
      setComponents([...components, componentName]);
    }
  };

  const handleBackButtonClick = () => {
    setComponents(components.slice(0, -1));
  };

  const renderCurrentComponent = () => {
    if (components.length > 0) {
      const currentComponent = components[components.length - 1];
      switch (currentComponent) {
        case "today":
          return <TodayAttendance onBackButtonClick={handleBackButtonClick} />;
        case "about":
          return <About onBackButtonClick={handleBackButtonClick} />;
        // render other components as needed
        default:
          return null;
      }
    } else {
      return (
        <div className="flex justify-center h-screen">
          <div className="mt-4 ax-w-screen-lg mx-auto">
            <div>
              <Greeting />
            </div>
            <div className="ml-5 text-white mr-5 mt-3 grid grid-cols-2 gap-4">
              <button
                className="bg-blue-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 font-bold text-xl py-10 rounded-lg shadow-sm"
                onClick={() => handleButtonClick("today")}
              >
                Attendance
              </button>

              <button
                className="bg-violet-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 font-bold text-xl py-10 rounded-lg shadow-sm"
                onClick={() => handleButtonClick("about")}
              >
                About
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {components.length > 0 &&
        <button
          className="bg-red-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 font-bold text-sm md:text-xl px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-sm border border-gray-300 transition-colors duration-300 ease-in-out"
          onClick={handleBackButtonClick}
        >
          Back
        </button>
      }
      <div>{renderCurrentComponent()}</div>
    </div>
  );
};



export default MainComponent;

// <button className="bg-white font-bold text-xl py-10 rounded-lg " onClick={() => handleButtonClick("create")}>
// Create
// </button>
// <button className="bg-white font-bold text-xl py-10 rounded-lg " onClick={() => handleButtonClick("pass")}>
// Scan
// </button>
// <button className="bg-white font-bold text-xl py-10 rounded-lg " onClick={() => handleButtonClick("create")}>
// Qr Code
// </button>

// 62CDFF

// C9EEFF


// case "past":
//   return <PastAttendance onBackButtonClick={handleBackButtonClick} />;
// case "sample":
//   return <Calculator onBackButtonClick={handleBackButtonClick} />;
// case "create":
//   return <Generate onBackButtonClick={handleBackButtonClick} />;
// case "pass":
//   return <Pass onBackButtonClick={handleBackButtonClick} />;
// case "members":
//   return <TeamCarousel onBackButtonClick={handleBackButtonClick} />;