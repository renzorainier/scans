import { useState } from "react";

import TodayAttendance from "./TodayView";
import PastAttendance from "./PastView";
import Greeting from "./Dash";
import Calculator from "./Sample";
import Pass from "./Pass";
import Generate from "./Generate";
import TeamCarousel from "./Members";
import About from "./About";

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
      case "sample":
        return <Calculator onBackButtonClick={handleBackButtonClick} />;
      case "create":
        return <Generate onBackButtonClick={handleBackButtonClick} />;
      case "pass":
        return <Pass onBackButtonClick={handleBackButtonClick} />;
      case "members":
        return <TeamCarousel onBackButtonClick={handleBackButtonClick} />;
      case "about":
        return <About onBackButtonClick={handleBackButtonClick} />;
      // render other components as needed
      default:
        return (
          <div className="mt-4 ax-w-screen-lg mx-auto">
            <div>
              <Greeting />
            </div>
            <div className="ml-5 mr-5 mt-3 grid grid-cols-2 gap-4">
              <button
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 font-bold text-white text-xl py-6 rounded-lg shadow-lg"
                onClick={() => handleButtonClick("today")}
              >
                Attendance
              </button>

              <button
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 font-bold text-white text-xl py-6 rounded-lg shadow-lg"
                onClick={() => handleButtonClick("about")}
              >
                About
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

// <button className="bg-white font-bold text-xl py-10 rounded-lg " onClick={() => handleButtonClick("create")}>
// Create
// </button>
// <button className="bg-white font-bold text-xl py-10 rounded-lg " onClick={() => handleButtonClick("pass")}>
// Scan
// </button>
// <button className="bg-white font-bold text-xl py-10 rounded-lg " onClick={() => handleButtonClick("create")}>
// Qr Code
// </button>
