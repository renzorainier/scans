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
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={`py-2 px-4 rounded ${
            selectedTab === "a" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleTabChange("a")}
        >
          Today
        </button>
        <button
          className={`py-2 px-4 rounded ${
            selectedTab === "b" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleTabChange("b")}
        >
          Previous
        </button>
      </div>
      {selectedTab === "a" && <TodayAttendance />}
      {selectedTab === "b" && <PastAttendance />}
    </div>
  );
}

export default TabSelector;
