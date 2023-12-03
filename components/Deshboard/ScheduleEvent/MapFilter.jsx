import React, { useState } from "react";

const MapFilter = () => {
  const [dropdownStates, setDropdownStates] = useState({
    teamDropDown: false,
    hostDropDown: false,
    eventDropDown: false,
    statusDropDown: false,
    trackigDropDown: false,
    inviteeDropDown: false,
    filterDropDown: false,
    // Add similar keys for other dropdowns
  });
  const toggel = (dropdownKey) => {
    setDropdownStates((prev) => ({
      ...prev,
      [dropdownKey]: !prev[dropdownKey],
    }));
  };

  return (
    <div className="absolute ml-4 p-4 top-[130px]  mt-2 space-x-14 flex  flex-row justify between bg-white border border-gray-200 rounded-md shadow-md">
      <div className=" text-sm font-medium text-gray-900">
        Teams
        <div
          className="mt-2 text-sm flex items-center gap-1 font- medium text-blue-600"
          onClick={() => toggel("teamDropDown")}
        >
          All teams
          <div className="">
            <svg
              className={`h-4 w-4 fill-current ${
                dropdownStates.teamDropDown ? "transform rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.00589 6.51941C4.34707 6.1602 4.90024 6.1602 5.24142 6.51941L10 11.5294L14.7586 6.51941C15.0998 6.1602 15.6529 6.1602 15.9941 6.51941C16.3353 6.87862 16.3353 7.46101 15.9941 7.82022L10.6178 13.4806C10.2766 13.8398 9.72342 13.8398 9.38223 13.4806L4.00589 7.82022C3.6647 7.46101 3.6647 6.87862 4.00589 6.51941Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className=" text-sm font-medium text-gray-900">
        {" "}
        Host
        <div
          className="mt-2 text-sm flex items-center gap-1 font- medium text-blue-600"
          onClick={() => toggel("hostDropDown")}
        >
          Host
          <div className="">
            <svg
              className={`h-4 w-4 fill-current ${
                dropdownStates.hostDropDown ? "transform rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.00589 6.51941C4.34707 6.1602 4.90024 6.1602 5.24142 6.51941L10 11.5294L14.7586 6.51941C15.0998 6.1602 15.6529 6.1602 15.9941 6.51941C16.3353 6.87862 16.3353 7.46101 15.9941 7.82022L10.6178 13.4806C10.2766 13.8398 9.72342 13.8398 9.38223 13.4806L4.00589 7.82022C3.6647 7.46101 3.6647 6.87862 4.00589 6.51941Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className=" text-sm font-medium text-gray-900">
        Event Types
        <div
          className="mt-2 text-sm flex items-center gap-1 font- medium text-blue-600"
          onClick={() => toggel("eventDropDown")}
        >
          All Event Types
          <div className="">
            <svg
              className={`h-4 w-4 fill-current ${
                dropdownStates.eventDropDown ? "transform rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.00589 6.51941C4.34707 6.1602 4.90024 6.1602 5.24142 6.51941L10 11.5294L14.7586 6.51941C15.0998 6.1602 15.6529 6.1602 15.9941 6.51941C16.3353 6.87862 16.3353 7.46101 15.9941 7.82022L10.6178 13.4806C10.2766 13.8398 9.72342 13.8398 9.38223 13.4806L4.00589 7.82022C3.6647 7.46101 3.6647 6.87862 4.00589 6.51941Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className=" text-sm font-medium text-gray-900">
        Status
        <div
          className="mt-2 text-sm flex items-center gap-1 font- medium text-blue-600"
          onClick={() => toggel("statusDropDown")}
        >
          Active Events
          <div className="">
            <svg
              className={`h-4 w-4 fill-current ${
                dropdownStates.statusDropDown ? "transform rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.00589 6.51941C4.34707 6.1602 4.90024 6.1602 5.24142 6.51941L10 11.5294L14.7586 6.51941C15.0998 6.1602 15.6529 6.1602 15.9941 6.51941C16.3353 6.87862 16.3353 7.46101 15.9941 7.82022L10.6178 13.4806C10.2766 13.8398 9.72342 13.8398 9.38223 13.4806L4.00589 7.82022C3.6647 7.46101 3.6647 6.87862 4.00589 6.51941Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className=" text-sm font-medium text-gray-900">
        Tracking Id
        <div
          className="mt-2 text-sm flex items-center gap-1 font- medium text-blue-600"
          onClick={() => toggel("trackigDropDown")}
        >
          All Ids
          <div className="">
            <svg
              className={`h-4 w-4 fill-current ${
                dropdownStates.trackigDropDown ? "transform rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.00589 6.51941C4.34707 6.1602 4.90024 6.1602 5.24142 6.51941L10 11.5294L14.7586 6.51941C15.0998 6.1602 15.6529 6.1602 15.9941 6.51941C16.3353 6.87862 16.3353 7.46101 15.9941 7.82022L10.6178 13.4806C10.2766 13.8398 9.72342 13.8398 9.38223 13.4806L4.00589 7.82022C3.6647 7.46101 3.6647 6.87862 4.00589 6.51941Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className=" text-sm font-medium text-gray-900">
        Invitee Emails
        <div
          className="mt-2 text-sm flex items-center gap-1 font- medium text-blue-600"
          onClick={() => toggel("inviteeDropDown")}
        >
          All Invitee Emails
          <div className="">
            <svg
              className={`h-4 w-4 fill-current ${
                dropdownStates.inviteeDropDown ? "transform rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.00589 6.51941C4.34707 6.1602 4.90024 6.1602 5.24142 6.51941L10 11.5294L14.7586 6.51941C15.0998 6.1602 15.6529 6.1602 15.9941 6.51941C16.3353 6.87862 16.3353 7.46101 15.9941 7.82022L10.6178 13.4806C10.2766 13.8398 9.72342 13.8398 9.38223 13.4806L4.00589 7.82022C3.6647 7.46101 3.6647 6.87862 4.00589 6.51941Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className=" text-sm font-medium text-gray-900">
        <div
          className="mt-2 text-sm flex items-center gap-1 font- medium text-blue-600"
          onClick={() => toggel("filterDropDown")}
        >
          clear all filters
          <div className="">
            <svg
              className={`h-4 w-4 fill-current ${
                dropdownStates.filterDropDown ? "transform rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.00589 6.51941C4.34707 6.1602 4.90024 6.1602 5.24142 6.51941L10 11.5294L14.7586 6.51941C15.0998 6.1602 15.6529 6.1602 15.9941 6.51941C16.3353 6.87862 16.3353 7.46101 15.9941 7.82022L10.6178 13.4806C10.2766 13.8398 9.72342 13.8398 9.38223 13.4806L4.00589 7.82022C3.6647 7.46101 3.6647 6.87862 4.00589 6.51941Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapFilter;
