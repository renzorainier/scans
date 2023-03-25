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
            <div className="flex-grow">
              <Greeting />
            </div>
            <div className="flex flex-grow justify-center items-center">
              <div className="grid grid-cols-2 gap-8 ">
                <button className="bg-blue-500 text-white font-bold py-8 rounded-lg shadow-lg hover:bg-blue-700">
                  Attendance Today
                </button>
                <button className="bg-blue-500 text-white font-bold py-8 rounded-lg shadow-lg hover:bg-blue-700">
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
