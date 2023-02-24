import { useState, useEffect } from 'react';

function Tab() {
  const [tabs, setTabs] = useState([]);
  const [panels, setPanels] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const tabs = Array.from(document.querySelectorAll('.tab'));
    const panels = Array.from(document.querySelectorAll('.tab-panel'));

    setTabs(tabs);
    setPanels(panels);

    tabs[0].setAttribute('aria-selected', true);
    panels[0].classList.add('visible', 'opacity-100');
    panels[0].classList.remove('invisible', 'opacity-0');

    const indicator = document.querySelector('.indicator');
    indicator.style.width = tabs[0].getBoundingClientRect().width + 'px';
    indicator.style.left =
      tabs[0].getBoundingClientRect().left -
      tabs[0].parentElement.getBoundingClientRect().left +
      'px';

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        setActiveTab(index);

        indicator.style.width = tab.getBoundingClientRect().width + 'px';
        indicator.style.left =
          tab.getBoundingClientRect().left -
          tab.parentElement.getBoundingClientRect().left +
          'px';

        panels.forEach((panel, index) => {
          const tabId = tab.getAttribute('aria-controls');
          const panelId = panel.getAttribute('id');
          const isSelected = tabId === panelId;

          tabs[index].setAttribute('aria-selected', isSelected);
          if (isSelected) {
            panel.classList.remove('invisible', 'opacity-0');
            panel.classList.add('visible', 'opacity-100');
          } else {
            panel.classList.add('invisible', 'opacity-0');
          }
        });
      });
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-8 sm:px-0">
      <div className="sm:w-7/12 sm:mx-auto">
        <div
          role="tablist"
          aria-label="tabs"
          className="relative w-max mx-auto h-12 grid grid-cols-3 items-center px-[3px] rounded-full bg-gray-900/20 overflow-hidden shadow-2xl shadow-900/20 transition"
        >
          <div className="absolute indicator h-11 my-auto top-0 bottom-0 left-0 rounded-full bg-white shadow-md"></div>
          {tabs.map((tab, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={activeTab === index ? 'true' : 'false'}
              aria-controls={`panel-${index + 1}`}
              id={`tab-${index + 1}`}
              tabIndex={activeTab === index ? '0' : '-1'}
              className="relative block h-10 px-6 tab rounded-full"
            >
              <span className="text-gray-800">{tab.textContent}</span>
            </button>
          ))}
        </div>
        <div className="mt-6 relative rounded-3xl bg-purple-50">
          {panels.map((panel, index) => (
            <div
              key={index}
              role="tabpanel"
              id={`panel-${index + 1}`}
              className={`tab-panel p-6 transition duration-300 ${
                index !== activeTab ? 'invisible opacity-0' : 'visible opacity-100'
              }`}
            >
              {panel.children}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tab;
