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
          <div className="mt-4 max-w-screen-lg mx-auto"
            style={{ backgroundImage: "url('/background-image.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div>
              <Greeting />
            </div>
            <div className="ml-5 mr-5 mt-3 grid grid-cols-2 gap-4">
              <button className="bg-white font-bold text-xl py-10 rounded-lg " onClick={() => handleButtonClick("today")}>
                Attendance
              </button>
              <button className="bg-white font-bold text-xl py-10 rounded-lg " onClick={() => handleButtonClick("past")}>
                Badges
              </button>
              <button className="bg-white font-bold text-xl py-10 rounded-lg " onClick={() => handleButtonClick("past")}>
                Badges
              </button>
              <button className="bg-white font-bold text-xl py-10 rounded-lg " onClick={() => handleButtonClick("past")}>
                Badges
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
