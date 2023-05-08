import { useState, useEffect } from "react";

import TodayAttendance from "./TodayView";
import Greeting from "./Dash";
import Pass from "./Pass";
import Generate from "./Generate";
import TeamCarousel from "./Members";
import About from "./About";
import { FaChevronDown } from "react-icons/fa";
import BobbingImage from "./Image"

const MainComponent = () => {
  const [currentComponent, setCurrentComponent] = useState(null);

  const handleButtonClick = (componentName) => {
    setCurrentComponent(componentName);
  };

  const handleBackButtonClick = () => {
    setCurrentComponent(null);
  };

  const renderCurrentComponent = () => {
    switch (currentComponent) {
      case "today":
        return <TodayAttendance onBackButtonClick={handleBackButtonClick} />;
      case "about":
        return <About onBackButtonClick={handleBackButtonClick} />;
      // render other components as needed
      default:
        return (
          <div className="flex justify-center h-screen">
            <div className="mt-4 ax-w-screen-lg mx-auto">
              <div className="greeting-container">
                <Greeting />
              </div>

              <div className="ml-5 text-white mr-5 mt-3 grid grid-cols-2 gap-4">
                <button
                  className="bg-blue-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 font-bold text-xl py-10 rounded-lg shadow-lg"
                  onClick={() => handleButtonClick("today")}
                  style={{ animation: "slide-from-left 1s ease forwards" }}
                >
                  Attendance
                </button>

                <button
                  className="bg-violet-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 font-bold text-xl py-10 rounded-lg shadow-lg"
                  onClick={() => handleButtonClick("about")}
                  style={{ animation: "slide-from-right 1s ease forwards" }}
                >
                  About
                </button>
              </div>
              <div>
              <div className="move-up">

              <BobbingImage/>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  // Style the back button with modern UI
  const backButton = currentComponent ? (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
      onClick={handleBackButtonClick}
    >
      <FaChevronDown style={{ transform: "rotate(90deg)" }} />{" "}
    </button>
  ) : null;

  return (
    <div className="fade-in">
      {backButton}
      {renderCurrentComponent()}
    </div>
  );
};

export default MainComponent;
