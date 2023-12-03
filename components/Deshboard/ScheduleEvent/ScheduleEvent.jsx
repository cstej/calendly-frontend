import { dropdown } from "@nextui-org/react";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { AccordianDiv } from "@/core/AccordianDiv";
import MapDiv from "./MapDiv";
import MapFilter from "./MapFilter";
import { AccordianDivFilter } from "@/core/loading/AccordianDivFilter";

import Past from "./Past";
import Pending from "./Pending";
import DateRanges from "./DateRange";
import UpcomingTab from "./UpcomingTab";
const ScheduleEvent = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [dropDown, setIsDropDown] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const toggleDropDown = () => {
    setIsDropDown(!dropDown);
  };

  // Example data for events
  const events = [
    {
      id: 1,
      title: "Event 1",
      type: "Type 1",
      time: "10:30am - 11:00am",
      date: "Wednesday, 25 October 2023",
    },
    // Add more events as needed
  ];

  // Filter events based on the activeTab
  const filteredEvents = events.filter((event) => {
    if (activeTab === "upcoming") {
      // Your logic for upcoming events
      return true;
    } else if (activeTab === "pending") {
      // Your logic for pending events
      return true;
    } else if (activeTab === "past") {
      // Your logic for past events
      return true;
    }
    // Add more cases for other tabs
    else if (activeTab === "dateRange") {
      // Your logic for past events
      return true;
    }
    return false;
  });

  return (
    <div className="mx-4">
      <div className="bg-gray-50 border-black-400 h-[580px] w-full max-w-[1150px] mx-auto p-2 relative">
        <div className="flex">
          <div className="text-gray-500 ml-auto mr-5">
            <p className="text-sm" style={{ color: "var(--text-color-level2, rgba(26, 26, 26, 0.61))" }}>
              {/* Displaying {filteredEvents.length} of {events.length} Events */}
            </p>
          </div>
        </div>
        <div className="flex-1 mt-2 border border-solid border-black p-4 rounded-md h-[540px] overflow-auto">
          <div className="flex mt-4 justify-between">
            <div className="flex space-x-3">
              <button
                className={`${
                  activeTab === "upcoming"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500 hover:text-blue border-b-2 border-transparent"
                } py-2 px-4 focus:outline-none`}
                onClick={() => handleTabClick("upcoming")}
              >
                Upcoming
              </button>

              <button
                className={`${
                  activeTab === "pending"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500 hover:text-blue border-b-2 border-transparent"
                } py-2 px-4 focus:outline-none`}
                onClick={() => handleTabClick("pending")}
              >
                Pending
              </button>

              <button
                className={`${
                  activeTab === "past"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500 hover:text-blue border-b-2 border-transparent"
                } py-2 px-4 focus:outline-none`}
                onClick={() => handleTabClick("past")}
              >
                Past
              </button>

              <button
                className={`${
                  activeTab === "dateRange"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500 hover:text-blue border-b-2 border-transparent"
                } py-2 px-4 focus:outline-none`}
                onClick={() => handleTabClick("dateRange")}
              >
                Date Range
              </button>
            </div>

            <div className="flex space-x-3 mt-2">
              <button
                type="button"
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Export
              </button>

              <div className="relative">
                <button
                  title=""
                  className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                  aria-disabled="false" type="button" onClick={toggleDropDown}>
                  <div className="mr-2">
                    <svg className="h-4 w-4 fill-current relative" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.8 2.8C0.8 2.13736 1.33804 1.6 2.00078 1.6H14.0008C14.6635 1.6 15.2008 2.13736 15.2008 2.8C15.2008 3.46284 14.6635 4 14.0008 4H2.00078C1.33804 4 0.8 3.46284 0.8 2.8ZM3.2 7.78181C3.2 7.11906 3.73804 6.58181 4.40078 6.58181H11.6008C12.2635 6.58181 12.8008 7.11906 12.8008 7.78181C12.8008 8.44455 12.2635 8.98181 11.6008 8.98181H4.40078C3.73804 8.98181 3.2 8.44455 3.2 7.78181ZM6.80078 11.5664C6.13804 11.5664 5.60078 12.1036 5.60078 12.7664C5.60078 13.4291 6.13804 13.9664 6.80078 13.9664H9.20078C9.86352 13.9664 10.4008 13.4291 10.4008 12.7664C10.4008 12.1036 9.86352 11.5664 9.20078 11.5664H6.80078Z" />
                    </svg>
                  </div>
                  Filter
                  <div className="ml-2">
                    <svg className={`h-4 w-4 fill-current ${dropDown ? "transform rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path fillRule="evenodd" clipRule="evenodd" d="M4.00589 6.51941C4.34707 6.1602 4.90024 6.1602 5.24142 6.51941L10 11.5294L14.7586 6.51941C15.0998 6.1602 15.6529 6.1602 15.9941 6.51941C16.3353 6.87862 16.3353 7.46101 15.9941 7.82022L10.6178 13.4806C10.2766 13.8398 9.72342 13.8398 9.38223 13.4806L4.00589 7.82022C3.6647 7.46101 3.6647 6.87862 4.00589 6.51941Z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {dropDown && (
            <AccordianDivFilter rederDiv={<MapFilter />} />
          )}

          {activeTab === "upcoming" && <UpcomingTab />}
          {activeTab === "past" && <Past />}
          {activeTab === "pending" && <Pending />}
          {activeTab === "dateRange" && <DateRanges />}
        </div>
      </div>
    </div>
  );
};

export default ScheduleEvent;

          