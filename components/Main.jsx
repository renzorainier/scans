import { useState, useEffect } from "react";

import TodayAttendance from "./TodayView";
import PastAttendance from "./PastView";
import Greeting from "./Dash";
import Calculator from "./Sample";
import Pass from "./Pass";
import Generate from "./Generate";
import TeamCarousel from "./Members";
import About from "./About";

const MainComponent = () => {
  const [components, setComponents] = useState([]);

  const handleButtonClick = (componentName) => {
    if (!components.includes(componentName)) {
      setComponents([...components, componentName]);
    }
  };

  const handleBackButtonClick = () => {
    setComponents(components.slice(0, -1));
  };

  const renderCurrentComponent = () => {
    if (components.length > 0) {
      const currentComponent = components[components.length - 1];
      switch (currentComponent) {
        case "today":
          return <TodayAttendance onBackButtonClick={handleBackButtonClick} />;
        case "about":
          return <About onBackButtonClick={handleBackButtonClick} />;
        // render other components as needed
        default:
          return null;
      }
    } else {
      return (
        <div className="flex justify-center h-screen">
          <div className="mt-4 ax-w-screen-lg mx-auto">
            <div>
              <Greeting />
            </div>
            <div className="ml-5 text-white mr-5 mt-3 grid grid-cols-2 gap-4">
              <button
                className="bg-blue-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 font-bold text-xl py-10 rounded-lg shadow-sm"
                onClick={() => handleButtonClick("today")}
              >
                Attendance
              </button>

              <button
                className="bg-violet-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 font-bold text-xl py-10 rounded-lg shadow-sm"
                onClick={() => handleButtonClick("about")}
              >
                About
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {components.length > 0 &&
        <button
          className="bg-red-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 font-bold text-sm md:text-xl px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-sm border border-gray-300 transition-colors duration-300 ease-in-out"
          onClick={handleBackButtonClick}
        >
          Back
        </button>
      }
      <div>{renderCurrentComponent()}</div>
    </div>
  );
};



export default MainComponent;



const [selectedTab, setSelectedTab] = useState("c");

const handleTabChange = (tab) => {
  setSelectedTab(tab);
};

return (
  <div>
    <div className="flex justify-center pt-5 space-x-5 mb-4  ">
      <button
        className={`py-2 px-4 rounded-lg  ${
          selectedTab === "a"
            ? "bg-blue-400 text-white"
            : "bg-gray-200 hover:bg-blue-200 transition duration-700 ease-in-out"
        }`}
        onClick={() => handleTabChange("a")}
      >
        <div className="hover:scale-150 ease-in duration-200">
          h
        </div>
      </button>
      <button
        className={`py-2 px-4 rounded-lg ${
          selectedTab === "c"
            ? "bg-blue-400 text-white"
            : "bg-gray-200 hover:bg-blue-200 transition duration-700 ease-in-out"
        }`}
        onClick={() => handleTabChange("c")}
      >
        <div className="hover:scale-150 ease-in duration-200">
          <AiOutlineUnorderedList />
        </div>
      </button>
    </div>
    <div className={`${selectedTab === "a" ? "block" : "hidden-component"}`}>
      <PastAttendance className="tab-content" />
    </div>
    {/* <div className={`${selectedTab === "b" ? "block" : "hidden-component"}`}>
      <LineGraph className="tab-content" />
    </div> */}
    <div className={`${selectedTab === "c" ? "block" : "hidden-component"}`}>
      <TodayAttendance className="tab-content" />
    </div>
  </div>
);
}



// <button className="bg-white font-bold text-xl py-10 rounded-lg " onClick={() => handleButtonClick("create")}>
// Create
// </button>
// <button className="bg-white font-bold text-xl py-10 rounded-lg " onClick={() => handleButtonClick("pass")}>
// Scan
// </button>
// <button className="bg-white font-bold text-xl py-10 rounded-lg " onClick={() => handleButtonClick("create")}>
// Qr Code
// </button>

// 62CDFF

// C9EEFF


// case "past":
//   return <PastAttendance onBackButtonClick={handleBackButtonClick} />;
// case "sample":
//   return <Calculator onBackButtonClick={handleBackButtonClick} />;
// case "create":
//   return <Generate onBackButtonClick={handleBackButtonClick} />;
// case "pass":
//   return <Pass onBackButtonClick={handleBackButtonClick} />;
// case "members":
//   return <TeamCarousel onBackButtonClick={handleBackButtonClick} />;