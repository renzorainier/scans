import { useState, useEffect, useRef } from 'react';

function Tab(props) {
  const { children, isSelected, onSelect } = props;
  const buttonRef = useRef();

  useEffect(() => {
    if (isSelected && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isSelected]);

  return (
    <button
      ref={buttonRef}
      role="tab"
      aria-selected={isSelected}
      onClick={onSelect}
      className={`relative block h-10 px-6 tab rounded-full ${
        isSelected
          ? 'bg-gray-900 text-white'
          : 'bg-gray-900/20 text-gray-800'
      }`}
    >
      {children}
    </button>
  );
}

function TabPanel(props) {
  const { children, id, isSelected } = props;

  return (
    <div
      role="tabpanel"
      id={id}
      className={`tab-panel p-6 transition duration-300 ${
        isSelected ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      {children}
    </div>
  );
}

function Tabs(props) {
  const { children } = props;
  const [selectedTab, setSelectedTab] = useState(0);
  const tabsRef = useRef();
  const indicatorRef = useRef();

  useEffect(() => {
    const tabs = tabsRef.current.children;
    const indicator = indicatorRef.current;
    const activeTab = tabs[selectedTab];
    indicator.style.width = activeTab.offsetWidth + 'px';
    indicator.style.left =
      activeTab.offsetLeft - tabsRef.current.offsetLeft + 'px';
  }, [selectedTab]);

  function handleTabSelect(index) {
    setSelectedTab(index);
  }

  return (
    <div
      role="tablist"
      aria-label="tabs"
      className="relative w-max mx-auto h-12 grid grid-cols-3 items-center px-[3px] rounded-full bg-gray-900/20 overflow-hidden shadow-2xl shadow-900/20 transition"
      ref={tabsRef}
    >
      <div
        className="absolute indicator h-11 my-auto top-0 bottom-0 left-0 rounded-full bg-white shadow-md"
        ref={indicatorRef}
      ></div>
      {children.map((child, index) => (
        <Tab
          key={index}
          isSelected={index === selectedTab}
          onSelect={() => handleTabSelect(index)}
        >
          {child.props.title}
        </Tab>
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen flex items-center bg-gradient-to-br from-purple-200 to-indigo-400">
      <div className="max-w-3xl mx-auto px-8 sm:px-0">
        <div className="sm:w-7/12 sm:mx-auto">
          <Tabs>
            <TabPanel title="First Tab" id="panel-1">
              <h2 className="text-xl font-semibold text-gray-800">
                First tab panel
              </h2>
              <p className="mt-4 text-gray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </TabPanel>
            <TabPanel title="Second Tab" id="panel-2">
              <h2 className="text-xl font-semibold text-gray-800">
                Second tab panel
              </h2>
              <p className="mt-4 text-gray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </TabPanel>
          </Tabs>
        </div>


</div>
</div>
);
};

export default Tabs;