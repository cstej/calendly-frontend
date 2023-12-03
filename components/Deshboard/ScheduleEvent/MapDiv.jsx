import { Button } from "@material-tailwind/react";
import React from "react";
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
const MapDiv = ({ location, schedules }) => {
  // console.log(location);

  const handleReschedule = () => {
    // Add logic for rescheduling
  };

  const handleCancel = () => {
    // Add logic for canceling
  };
  return (
    <div className="flex flex-row space-x-4 ml-8">
      <div className="flex flex-col space-y-8">
        <Button variant="outlined" color="blue">
          Reschedule
        </Button>
        <Button variant="outlined" color="blue">
          Delete
        </Button>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center p-1 text-sm text-blue-600">
            <span className="mr-2">
              <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" role="img" className="w-6 h-3 stroke-current">
                <path d="M4 .5H1.5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V6M7 .5h2.5V3M9.5.5 5 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
            Edit Event Type
          </div>
          <button type="button">
            <div className="flex items-center p-1 text-sm text-blue-600">
              <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" role="img" className="w-4 h-3 fill-current">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.800781 2.8001C0.800781 2.13736 1.33804 1.6001 2.00078 1.6001H14.0008C14.6635 1.6001 15.2008 2.13736 15.2008 2.8001C15.2008 3.46284 14.6635 4.0001 14.0008 4.0001H2.00078C1.33804 4.0001 0.800781 3.46284 0.800781 2.8001ZM3.20078 7.78181C3.20078 7.11906 3.73804 6.58181 4.40078 6.58181H11.6008C12.2635 6.58181 12.8008 7.11906 12.8008 7.78181C12.8008 8.44455 12.2635 8.98181 11.6008 8.98181H4.40078C3.73804 8.98181 3.20078 8.44455 3.20078 7.78181ZM6.80078 11.5664C6.13804 11.5664 5.60078 12.1036 5.60078 12.7664C5.60078 13.4291 6.13804 13.9664 6.80078 13.9664H9.20078C9.86352 13.9664 10.4008 13.4291 10.4008 12.7664C10.4008 12.1036 9.86352 11.5664 9.20078 11.5664H6.80078Z" fill="currentColor"></path>
                </svg>
              </span>
              Filter by Event Type
            </div>
          </button>
          <div className="flex items-center p-1 text-sm text-blue-600">
            <span className="mr-2">
              <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" role="img" className="w-4 h-4 stroke-current">
                <path d="m7.769 6.385 1.385-.347.346 1.385" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M9.012 6.074A4.17 4.17 0 0 1 5 9.154h0a4.17 4.17 0 0 1-3.9-2.735" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M2.231 3.615l-1.385.347L.5 2.577" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M.988 3.926A4.17 4.17 0 0 1 5 .846h0a4.17 4.17 0 0 1 3.9 2.735" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
            Schedule Invitee Again
          </div>
          <div className="flex items-center p-1 text-sm text-blue-600">
            <span className="mr-2">
              <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" role="img" className="w-4 h-4 stroke-current">
                <path d="M1.5.5v9M8.5 5.5h-7v-5h7L6 3l2.5 2.5z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
            Report this event
          </div>
        </div>
      </div>
      <div className=" flex flex-grow items-center justify-center">
        <div className="flex flex-col mr-2 space-y-4 items-start ">
          <Menu>
            <MenuHandler>
              <Button size="md" variant="text" color="transparent">
                {schedules?.email}
              </Button>
            </MenuHandler>
            <MenuHandler>
              <Button size="md" variant="text" color="transparent">
                {location?.location_type}
              </Button>
            </MenuHandler>
            <MenuHandler>
              <Button size="md" variant="text" color="transparent">
                India Standard Time
              </Button>
            </MenuHandler>
            <MenuHandler>
              <Button size="md" variant="text" color="transparent">
                Meeting Host
              </Button>
            </MenuHandler>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default MapDiv;
