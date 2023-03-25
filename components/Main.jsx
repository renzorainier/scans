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
          <div className="mt-4 max-w-screen-lg mx-auto">
            <div>
              <Greeting />
            </div>
            <div className="ml-5 mr-5 mt-3 grid grid-cols-2 gap-4">
              <button className="bg-white font-bold text-xl py-6 rounded-lg " onClick={() => handleButtonClick("today")}>
                Attendance Today
              </button>
              <button className="bg-white font-bold text-xl py-6 rounded-lg " onClick={() => handleButtonClick("past")}>
                Past Attendance
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
