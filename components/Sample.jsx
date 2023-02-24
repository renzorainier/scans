import React, { useState } from "react";

const Tabs = () => {
const [activeTab, setActiveTab] = useState("panel-1");

const handleClick = (event, tabId) => {
event.preventDefault();
setActiveTab(tabId);
};

return (
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
aria-selected={activeTab === "panel-1"}
aria-controls="panel-1"
id="tab-1"
tabIndex="0"
className="relative block h-10 px-6 tab rounded-full"
onClick={(event) => handleClick(event, "panel-1")}
>
<span className="text-gray-800">First Tab</span>
</button>
<button
role="tab"
aria-selected={activeTab === "panel-2"}
aria-controls="panel-2"
id="tab-2"
tabIndex="-1"
className="relative block h-10 px-6 tab rounded-full"
onClick={(event) => handleClick(event, "panel-2")}
>
<span className="text-gray-800">Second Tab</span>
</button>
</div>
<div className="mt-6 relative rounded-3xl bg-purple-50">
<div
role="tabpanel"
id="panel-1"
className={tab-panel p-6 transition duration-300 ${ activeTab === "panel-1" ? "visible opacity-100" : "invisible opacity-0" }}
>
<h2 className="text-xl font-semibold text-gray-800">First tab panel</h2>
<p className="mt-4 text-gray-600">Lorem</p>
</div>
<div
role="tabpanel"
id="panel-2"
className={absolute top-0 tab-panel p-6 transition duration-300 ${ activeTab === "panel-2" ? "visible opacity-100" : "invisible opacity-0" }}
>
<h2 className="text-xl font-semibold text-gray-800">Second tab panel</h2>
<p className="mt-4 text-gray-600">Lorem.</p>
</div>
</div>
</div>
</div>
);
};

export default Tabs;