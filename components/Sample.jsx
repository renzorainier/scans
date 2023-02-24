import React, { useState } from 'react';

const Tabs = () => {
const [activeTab, setActiveTab] = useState(1);

const handleTabClick = (tabIndex) => {
setActiveTab(tabIndex);
};

return (
<div className="max-w-3xl mx-auto px-8 sm:px-0">
<div className="sm:w-7/12 sm:mx-auto">
<div
       role="tablist"
       aria-label="tabs"
       className="relative w-max mx-auto h-12 grid grid-cols-2 items-center px-[3px] rounded-full bg-gray-900/20 overflow-hidden shadow-2xl shadow-900/20 transition"
     >
<div className="absolute indicator h-11 my-auto top-0 bottom-0 left-0 rounded-full bg-white shadow-md" style={{ width: ${document.querySelector(".tab").getBoundingClientRect().width}px, left: ${document.querySelector(".tab").getBoundingClientRect().left - document.querySelector(".tab").parentElement.getBoundingClientRect().left}px}}></div>
<button
role="tab"
aria-selected={activeTab === 1}
aria-controls="panel-1"
id="tab-1"
tabIndex="0"
className={relative block h-10 px-6 tab rounded-full ${activeTab === 1 ? 'bg-gray-900 text-white' : 'text-gray-800'}}
onClick={() => handleTabClick(1)}
>
<span>First Tab</span>
</button>
<button
role="tab"
aria-selected={activeTab === 2}
aria-controls="panel-2"
id="tab-2"
tabIndex="-1"
className={relative block h-10 px-6 tab rounded-full ${activeTab === 2 ? 'bg-gray-900 text-white' : 'text-gray-800'}}
onClick={() => handleTabClick(2)}
>
<span>Second Tab</span>
</button>
</div>
<div className="mt-6 relative rounded-3xl bg-purple-50">
<div
role="tabpanel"
id="panel-1"
className={tab-panel p-6 transition duration-300 ${activeTab === 1 ? 'visible opacity-100' : 'invisible opacity-0'}}
>
<h2 className="text-xl font-semibold text-gray-800">First tab panel</h2>
<p className="mt-4 text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas dolores voluptate temporibus, atque ab eos, delectus at ad hic voluptatem veritatis iure, nulla voluptates quod nobis doloremque eaque! Perferendis, soluta.</p>
</div>
<div
role="tabpanel"
id="panel-2"
className={tab-panel p-6 transition duration-300 ${activeTab === 2 ? 'visible opacity-100' : 'invisible opacity-0'}}
>
<h2 className="text-xl font-semibold text-gray-800">Second tab panel</h2>
<p className="mt-4 text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas dolores voluptate temporibus, atque ab eos, delectus at ad hic voluptatem veritatis iure, nulla voluptates quod nobis doloremque eaque! Perferendis, soluta.</p>
</div>
</div>
</div>
</div>
);
};

export default Tab;
