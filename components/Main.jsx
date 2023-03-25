import { useState } from "react";

import TodayAttendance from "./TodayView";
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
      // render other components as needed
      default:
        return (
          <div className="m-4">
            <div>
              <Greeting />
            </div>
            <div>
              <button onClick={() => handleButtonClick("today")}>
                Attendance Today
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div >
      <div>{renderCurrentComponent()}</div>
    </div>
  );
};

export default MainComponent;
