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
          <div className="flex flex-col h-screen">
            <div className="flex-shrink-0">
              <Greeting />
            </div>
            <div className="flex-grow flex flex-row justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <button
                  className="px-6 py-2 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 mb-4"
                  onClick={() => handleButtonClick("today")}
                >
                  Attendance Today
                </button>
                <button
                  className="px-6 py-2 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                  onClick={() => handleButtonClick("past")}
                >
                  Past Attendance
                </button>
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
