import React, { useState, useEffect } from "react";

function Sample() {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const tabs = document.querySelectorAll(".tab");
    const indicator = document.querySelector(".indicator");
    const panels = document.querySelectorAll(".tab-panel");

    const activeTabElement = document.querySelector(
      `[aria-controls="panel-${activeTab}"]`
    );

    indicator.style.width = `${
      activeTabElement.getBoundingClientRect().width
    }px`;
    indicator.style.left = `${
      activeTabElement.getBoundingClientRect().left -
      activeTabElement.parentElement.getBoundingClientRect().left
    }px`;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabTarget = parseInt(
          tab.getAttribute("aria-controls").replace("panel-", "")
        );

        setActiveTab(tabTarget);

        const tabElement = document.querySelector(
          `[aria-controls="panel-${tabTarget}"]`
        );

        indicator.style.width = `${tabElement.getBoundingClientRect().width}px`;
        indicator.style.left = `${
          tabElement.getBoundingClientRect().left -
          tabElement.parentElement.getBoundingClientRect().left
        }px`;

        panels.forEach((panel) => {
          const panelId = parseInt(
            panel.getAttribute("id").replace("panel-", "")
          );

          if (panelId === tabTarget) {
            panel.classList.remove("invisible", "opacity-0");
            panel.classList.add("visible", "opacity-100");
          } else {
            panel.classList.add("invisible", "opacity-0");
          }
        });
      });
    });
  }, [activeTab]);

  return (
    <div>
      <body className="min-h-screen flex items-center bg-gradient-to-br from-purple-200 to-indigo-400">
        <div className="max-w-3xl mx-auto px-8 sm:px-0">
          <div className="sm:w-7/12 sm:mx-auto">
            <div
              role="tablist"
              aria-label="tabs"
              className="relative w-max mx-auto h-12 grid grid-cols-3 items-center px-[3px] rounded-full bg-gray-900/20 overflow-hidden shadow-2xl shadow-900/20 transition"
            >
              <div className="absolute indicator h-11 my-auto top-0 bottom-0 left-0 rounded-full bg-white shadow-md"></div>
              <button
                role="tab"
                aria-selected={activeTab === 1 ? "true" : "false"}
                aria-controls="panel-1"
                id="tab-1"
                tabIndex="0"
                className={`relative block h-10 px-6 tab rounded-full ${
                  activeTab === 1 ? "active" : ""
                }`}
              >
                <span className="text-gray-800">First Tab</span>
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 2 ? "true" : "false"}
                aria-controls="panel-2"
                id="tab-2"
                tabIndex="-1"
                className={`relative block h-10 px-6 tab rounded-full ${
                  activeTab === 2 ? "active" : ""
                }`}
              >
                <span className="text-gray-800">Second Tab</span>
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 3 ? "true" : "false"}
                aria-controls="panel-3"
                id="tab-3"
                tabIndex="-1"
                className={`relative block h-10 px-6 tab rounded-full ${
                  activeTab === 3 ? "active" : ""
                }`}
              >
                <span className="text-gray-800">Third Tab</span>
              </button>
            </div>
            <div
              role="tabpanel"
              aria-labelledby="tab-1"
              id="panel-1"
              className={`tab-panel ${
                activeTab === 1 ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <h1 className="text-4xl font-bold mb-4">First Tab Content</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                que culpa autem enim? Fugiat, animi.
              </p>
            </div>
            <div
              role="tabpanel"
              aria-labelledby="tab-2"
              id="panel-2"
              className={`tab-panel ${
                activeTab === 2 ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <h1 className="text-4xl font-bold mb-4">Second Tab Content</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam

              </p>
            </div>
            <div
              role="tabpanel"
              aria-labelledby="tab-3"
              id="panel-3"
              className={`tab-panel ${
                activeTab === 3 ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <h1 className="text-4xl font-bold mb-4">Third Tab Content</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam

              </p>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}
export default Sample;
