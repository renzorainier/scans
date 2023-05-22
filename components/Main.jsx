import { useState, useEffect } from "react";

import TodayAttendance from "./TodayView";
import Greeting from "./Dash";
import TeamCarousel from "./Members";
import About from "./About";
import { FaChevronDown } from "react-icons/fa";
import BobbingImage from "./Image";
import ScrollToTopButton from "./Scroll";

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
                  <BobbingImage />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  // Style the back button with modern UI
  const backButton = currentComponent ? (
<div className="fixed top-4 left-4 z-50">
  <button
    className="bg-gradient-to-r from-blue-400 to-violet-400 hover:from-blue-500 hover:to-violet-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:shadow-outline"
    onClick={handleBackButtonClick}
  >
    <svg
      className="w-6 h-6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  </button>
</div>


  ) : null;

  const currentYear = new Date().getFullYear();

  return (
    <div className="fade-in">
      {backButton}
      {renderCurrentComponent()}
      <footer className="bg-gray-200 py-4 px-8">
        <div className="container mx-auto text-center text-gray-700">
          <p className="text-sm">
            <span className="font-bold">Scans</span> &copy; {currentYear}. All
            rights reserved.
          </p>
        </div>
      </footer>
      <ScrollToTopButton />
    </div>
  );
};

export default MainComponent;
