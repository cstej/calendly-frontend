import React from 'react';

const Tabs = ({ activeTab, setActiveTab, tabItems }) => {
  return (
    <div className='bg-white  dark:bg-gray-900  border-b-1 border-black shadow-md'>
            <div className=" max-w-screen-xl px-4 py-3 mx-auto">
      <div className="flex items-center">
        <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
          {tabItems.map((tab) => (
            <li key={tab.id}>
              <a
                href="#"
                className={`text-gray-900 dark:text-white hover:underline ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
    </div>

  );
}

export default Tabs;