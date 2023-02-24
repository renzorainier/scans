import React, { useState, useEffect, useRef, children } from "react";function Tab({ label, selected, onClick }) {
  return (
    <button
      role="tab"
      aria-selected={selected}
      aria-controls={`panel-${label}`}
      id={`tab-${label}`}
      className={`relative block h-10 px-6 rounded-full ${
        selected
          ? "bg-white text-gray-800"
          : "text-gray-800/50 hover:text-gray-800/70"
      }`}
      onClick={onClick}
    >
      <span>{label}</span>
    </button>
  );
}

function TabPanel({ label, selected, children }) {
  return (
    <div
      role="tabpanel"
      id={`panel-${label}`}
      className={`${
        selected ? "visible opacity-100" : "invisible opacity-0"
      } tab-panel p-6 transition duration-300`}
    >
      {children}
    </div>
  );
}

function Tabs() {
  const tabs = useRef([]);
  const indicator = useRef(null);
  const panels = useRef([]);

  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (tabs.current.length > 0 && panels.current.length > 0) {
      const currentTab = tabs.current[selectedTab];
      const currentPanel = panels.current[selectedTab];

      indicator.current.style.width = `${currentTab.getBoundingClientRect().width}px`;
      indicator.current.style.left = `${currentTab.getBoundingClientRect().left - currentTab.parentElement.getBoundingClientRect().left}px`;

      panels.current.forEach((panel, index) => {
        if (index === selectedTab) {
          panel.classList.remove("invisible", "opacity-0");
          panel.classList.add("visible", "opacity-100");
        } else {
          panel.classList.add("invisible", "opacity-0");
        }
      });
    }
  }, [selectedTab]);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  return (
    <div className="tabs">
      <div className="tab-list" role="tablist">
        {React.Children.map(children, (child, index) => {
          const isSelected = index === selectedTab;
          return React.cloneElement(child, {
            selected: isSelected,
            onClick: () => handleTabClick(index),
            ref: (el) => (tabs.current[index] = el),
          });
        })}
        <div
          className="tab-indicator"
          ref={indicator}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "4px",
            backgroundColor: "white",
            borderRadius: "999px",
            transition: "all 0.3s cubic-bezier(0.65, 0.05, 0.36, 1)",
          }}
        ></div>
      </div>
      <div className="tab-panels">
        {React.Children.map(children, (child, index) => {
          const isSelected = index === selectedTab;
          return React.cloneElement(child.props.children, {
            selected: isSelected,
            ref: (el) => (panels.current[index] = el),
          });
        })}
      </div>
    </div>
  );

};

export default Tabs;