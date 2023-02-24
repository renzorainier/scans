import React from 'react'

function Sample() {
  return (
    let tabs = document.querySelectorAll(".tab")
    let indicator = document.querySelector(".indicator")
    let panels = document.querySelectorAll(".tab-panel")

    indicator.style.width = tabs[0].getBoundingClientRect().width + 'px'
    indicator.style.left = tabs[0].getBoundingClientRect().left - tabs[0].parentElement.getBoundingClientRect().left + 'px'

    tabs.forEach(tab =>{
      tab.addEventListener("click", ()=>{
        let tabTarget = tab.getAttribute("aria-controls")

        indicator.style.width = tab.getBoundingClientRect().width + 'px'
        indicator.style.left = tab.getBoundingClientRect().left - tab.parentElement.getBoundingClientRect().left + 'px'


        panels.forEach(panel =>{
          let panelId = panel.getAttribute("id")
          if(tabTarget === panelId){
            panel.classList.remove("invisible", "opacity-0")
            panel.classList.add("visible", "opacity-100")
          } else {
            panel.classList.add("invisible", "opacity-0")
          }
        })
      })
    })

    <div>
      <body class="min-h-screen flex items-center bg-gradient-to-br from-purple-200 to-indigo-400">
    <div class="max-w-3xl mx-auto px-8 sm:px-0">
      <div class="sm:w-7/12 sm:mx-auto">
        <div
          role="tablist"
          aria-label="tabs"
          class="relative w-max mx-auto h-12 grid grid-cols-3 items-center px-[3px] rounded-full bg-gray-900/20 overflow-hidden shadow-2xl shadow-900/20 transition"
        >
          <div class="absolute indicator h-11 my-auto top-0 bottom-0 left-0 rounded-full bg-white shadow-md"></div>
          <button
            role="tab"
            aria-selected="true"
            aria-controls="panel-1"
            id="tab-1"
            tabindex="0"
            class="relative block h-10 px-6 tab rounded-full"
          >
            <span class="text-gray-800">First Tab</span>
          </button>
          <button
            role="tab"
            aria-selected="false"
            aria-controls="panel-2"
            id="tab-2"
            tabindex="-1"
            class="relative block h-10 px-6 tab rounded-full"
          >
            <span class="text-gray-800">Second Tab</span>
          </button>
          <button
            role="tab"
            aria-selected="false"
            aria-controls="panel-3"
            id="tab-3"
            tabindex="-1"
            class="relative block h-10 px-6 tab rounded-full"
          >
            <span class="text-gray-800">Third Tab</span>
          </button>
        </div>
        <div class="mt-6 relative rounded-3xl bg-purple-50">
          <div
            role="tabpanel"
            id="panel-1"
            class="tab-panel p-6 transition duration-300"
          >
            <h2 class="text-xl font-semibold text-gray-800">First tab panel</h2>
            <p class="mt-4 text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas dolores voluptate temporibus, atque ab eos, delectus at ad hic voluptatem veritatis iure, nulla voluptates quod nobis doloremque eaque! Perferendis, soluta.</p>
          </div>
          <div
            role="tabpanel"
            id="panel-2"
            class="absolute top-0 invisible opacity-0 tab-panel p-6 transition duration-300"
          >
            <h2 class="text-xl font-semibold text-gray-800">Second tab panel</h2>
            <p class="mt-4 text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas dolores voluptate temporibus, atque ab eos, delectus at ad hic voluptatem veritatis iure, nulla voluptates quod nobis doloremque eaque! Perferendis, soluta.</p>
          </div>
          <div
            role="tabpanel"
            id="panel-3"
            class="absolute top-0 invisible opacity-0 tab-panel p-6 transition duration-300"
          >
            <h2 class="text-xl font-semibold text-gray-800">Third tab panel</h2>
            <p class="mt-4 text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas dolores voluptate temporibus, atque ab eos, delectus at ad hic voluptatem veritatis iure, nulla voluptates quod nobis doloremque eaque! Perferendis, soluta.</p>
          </div>
        </div>
      </div>
    </div>

    {/* <script type="module" src="/components/main.js"></script> */}
  </body>
    </div>
  )
}

export default Sample