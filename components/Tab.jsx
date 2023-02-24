import { useState } from "react";
import PastAttendance from "/components/PastView";
import TodayAttendance from "/components/TodayView";

function TabSelector() {
  const [selectedTab, setSelectedTab] = useState("a");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <div className="flex justify-center pt-8 space-x-4 mb-4">
        <button
          className={`py-2 px-4 rounded-lg ${
            selectedTab === "a" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-200 transition duration-500 ease-in-out"
          }`}
          onClick={() => handleTabChange("a")}
        >
          Today
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            selectedTab === "b" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-200 transition duration-500 ease-in-out"
          }`}
          onClick={() => handleTabChange("b")}
        >
          Previous
        </button>
      </div>
      <div className={`${selectedTab === "a" ? "block" : "hidden"} transition duration-500 ease-in-out`}>
        <TodayAttendance />
      </div>
      <div className={`${selectedTab === "b" ? "block" : "hidden"} transition duration-500 ease-in-out`}>
        <PastAttendance />
      </div>
    </div>
  );
}

export default TabSelector;
