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
  const [currentComponent, setCurrentComponent] = useState(null);
  const [renderedComponents, setRenderedComponents] = useState({});

  const handleButtonClick = (componentName) => {
    setCurrentComponent(componentName);
  };

  const handleBackButtonClick = () => {
    const previousComponent = componentHistory[componentHistory.length - 1];
    setCurrentComponent(previousComponent);
    setComponentHistory(componentHistory.slice(0, -1));
  };


  const renderComponent = (componentName) => {
    if (!renderedComponents[componentName]) {
      setRenderedComponents((prev) => ({ ...prev, [componentName]: true }));
    }
  };

  const hideComponent = (componentName) => {
    setRenderedComponents((prev) => ({ ...prev, [componentName]: false }));
  };

  const renderCurrentComponent = () => {
    if (currentComponent) {
      switch (currentComponent) {
        case "today":
          renderComponent("today");
          return (
            <div className={`${renderedComponents["today"] ? "block" : "hidden-component"}`}>
              <TodayAttendance onBackButtonClick={() => hideComponent("today")} />
            </div>
          );
        case "about":
          renderComponent("about");
          return (
            <div className={`${renderedComponents["about"] ? "block" : "hidden-component"}`}>
              <About onBackButtonClick={() => hideComponent("about")} />
            </div>
          );
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
      <button
        className={`${
          currentComponent ? "block" : "hidden-component"
        } bg-red-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 font-bold text-sm md:text-xl px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-sm border border-gray-300 transition-colors duration-300 ease-in-out`}
        onClick={() => handleBackButtonClick()}
      >
        Back
      </button>

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