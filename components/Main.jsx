import { useState } from "react";

import TodayAttendance from "./TodayView";
import PastAttendance from "./PastView";
import Greeting from "./Dash";
// import Weather from "./Weather";

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
      case "past":
        return <PastAttendance onBackButtonClick={handleBackButtonClick} />;
      // render other components as needed
      default:
        return (
          <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex-shrink-0 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between px-4 py-3 sm:px-6">
                <h1 className="text-lg font-medium leading-6 text-gray-900">Dashboard</h1>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  New Project
                </button>
              </div>
              <nav className="flex" aria-label="Tabs">
                <a
                  href="#"
                  className="text-gray-900 font-medium border-b-2 border-indigo-500 px-3 py-2 rounded-tl-md rounded-tr-md"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 font-medium border-b-2 border-transparent px-3 py-2"
                >
                  Team Members
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 font-medium border-b-2 border-transparent px-3 py-2"
                >
                  Company Directory
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-700 font-medium border-b-2 border-transparent px-3 py-2"
                >
                  Schedule
                </a>
              </nav>
            </div>
            <div className="flex-1 overflow-auto">
              <div className="container mx-auto my-4">
                <div className="mt-4">
                  <Greeting />
                </div>
                <div className="flex mt-4 ml-4 mr-4">
                  <button
                    className="py-2 px-4 mr-2 bg-white hover:bg-gray-200 text-gray-800 font-bold border border-gray-400 rounded shadow"
                    onClick={() => handleButtonClick("today")}
                  >
                    Attendance Today
                  </button>
                  <button
                    className="py-2 px-4 bg-white hover:bg-gray-200 text-gray-800 font-bold border border-gray-400 rounded shadow"
                    onClick={() => handleButtonClick("past")}
                  >
                    Past Attendance
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

    }
  };

  return (
    <div>

      <div>{renderCurrentComponent()}</div>
    </div>
  );
};

export default MainComponent;
