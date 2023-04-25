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
          <div className="hover:scale-150 ease-in duration-200">h</div>
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            selectedTab === "c"
              ? "bg-blue-400 text-white"
              : "bg-gray-200 hover:bg-blue-200 transition duration-700 ease-in-out"
          }`}
          onClick={() => handleTabChange("c")}
        >
          <div className="hover:scale-150 ease-in duration-200">k </div>
        </button>
      </div>
      <div className={`${selectedTab === "a" ? "block" : "hidden-component"}`}>
        <TodayAttendance className="tab-content" />
      </div>
      {/* <div className={`${selectedTab === "b" ? "block" : "hidden-component"}`}>
        <LineGraph className="tab-content" />
      </div> */}
      <div className={`${selectedTab === "c" ? "block" : "hidden-component"}`}>
        <About className="tab-content" />
      </div>
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
