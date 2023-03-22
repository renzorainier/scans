import { useState } from "react";
import PastAttendance from "/components/PastView";
import TodayAttendance from "/components/TodayView";
import LineGraph from "components/Chart";
import { Transition } from "@headlessui/react";
import { SlGraph } from "react-icons/sl";
import { MdOutlineToday } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";

function TabSelector() {
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
            <MdOutlineToday />
          </div>
        </button>
        <button
          className={`py-2 px-4 rounded-lg ${
            selectedTab === "b"
              ? "bg-blue-400 text-white"
              : "bg-gray-200 hover:bg-blue-200 transition duration-700 ease-in-out"
          }`}
          onClick={() => handleTabChange("b")}
        >
          <div className="hover:scale-150 ease-in duration-200">
            <SlGraph />
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

export default TabSelector;
