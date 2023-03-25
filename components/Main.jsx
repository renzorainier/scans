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
          <div className="mt-4">
            <div>
              <Greeting />
            </div>
            <div className="mt-4 ml-4 mr-4">
              <button onClick={() => handleButtonClick("today")}>
                Attendance Today
              </button>
              <button onClick={() => handleButtonClick("past")}>
                Past Attendance
              </button>

            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <button onClick={handleBackButtonClick}>
                hehe
              </button>
      <div>{renderCurrentComponent()}</div>
    </div>
  );
};

export default MainComponent;
