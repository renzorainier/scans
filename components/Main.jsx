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
          <div className="h-screen flex flex-col justify-center items-center bg-gray-200">
            <div>
              <Greeting />
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button
                className="w-64 h-48 bg-cover bg-center rounded-xl shadow-lg"
                style={{ backgroundImage: "url('/attendance-today.jpg')" }}
                onClick={() => handleButtonClick("today")}
              >
                <span className="text-white text-3xl font-bold">
                  Attendance Today
                </span>
              </button>
              <button
                className="w-64 h-48 bg-cover bg-center rounded-xl shadow-lg"
                style={{ backgroundImage: "url('/past-attendance.jpg')" }}
                onClick={() => handleButtonClick("past")}
              >
                <span className="text-white text-3xl font-bold">
                  Past Attendance
                </span>
              </button>
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
