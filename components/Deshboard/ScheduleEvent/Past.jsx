import React from "react";
import { AccordianDiv } from "@/core/AccordianDiv";
import MapDiv from "./MapDiv";
import { useState, useEffect } from "react";
import api from "@/pages/api/api";
import dayjs from "dayjs";
const Past = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const createDate = (dateString) => {
    const [day, month, year] = dateString.split("-").map(Number);
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return new Date(year, month - 1, day).toLocaleDateString("en-US", options);
  };

  const fetchData = () => {
    api
      .get("/schedule/get_schdule")
      .then((response) => {
        const data = response.data;

        // Log the fetched data
        // console.log("Fetched data:", data);

        // Filter events based on upcoming dates
        const currentDate = new Date();

        const frmateDate = (myDate) => {
          const originalDate = new Date(myDate);
          const day = originalDate.getDate();
          const month = originalDate.getMonth() + 1;
          const year = originalDate.getFullYear();
          //
          const formattedDate = `${day}-${month}-${year}`;
          return formattedDate;
        };

        //asjdljalsdjfljasldjflkasjldfkjlaskdjf
        //
        const upcomingEvents = data.filter((event) => {
          // console.log("Event Date:", event?.schedules?.date);
          // console.log("Formatted Date:", frmateDate(new Date()));
          let eventDate = event?.schedules?.date
          // console.log(eventDate)
          // console.log(today)
          
          
          let Today = dayjs().format("DD-MM-YYYY")
          let EventDate = dayjs(eventDate).format("MM-DD-YYYY")
          // console.log(Today < EventDate)
          // console.log(Today)
          // console.log(EventDate)
          
          return Today > EventDate // Check if this path is correct
          // return eventDate <= currentDate;
        });

        // Log the filtered events
        // console.log("Upcoming events:", upcomingEvents);

        setEvents(upcomingEvents);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {events.map((event, index) => (
        <div key={index}>
          <div className="w-full">
            <AccordianDiv rederDiv={<MapDiv {...event} />}>
              <div className="flex justify-between w-full bg-gray-100  p-6 space-x-2">
                <button
                  aria-expanded="false"
                  className="flex-grow"
                  type="button"
                >
                  <div className="flex flex-col justify-between space-x-8 mt-5">
                    <div className="flex justify-between space-x-8 mt-5">
                      <div className="flex items-start space-x-4">
                        <span
                          style={{ background: event?.event_color }}
                          className="w-[40px] h-[40px] rounded-full"
                        ></span>
                        <div className="text-start text-md font-medium text-gray-900">
                          <div>
                            {event?.schedules?.time?.start} {" - "}
                            {event?.schedules?.time?.end}
                          </div>
                          <div>{createDate(event?.schedules?.date)}</div>
                        </div>
                      </div>
                      <div className="ml-10 flex items-start flex-col space-x-15">
                        <div className="text-start text-md font-medium text-gray-900 ">
                          {event?.event_name}
                        </div>
                        <div className="text-md font-medium text-gray-900 ">
                          <p className="font-bold flex ">
                            Event type {event?.location?.location_type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center  text-gray-700 ml-2">
                        <span className=" text-md font-medium text-gray-900 mr-1">
                          Details
                        </span>
                        <span onClick={handleDropdownToggle}>
                          <svg
                            className={`w-4 h-4 fill-current transform ${
                              isDropdownOpen ? "rotate-90" : ""
                            }`}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                          >
                            <path
                              d="M4 16.446V3.55401C4 2.10208 5.66616 1.28166 6.81699 2.16692L15.1968 8.61291C16.1075 9.31343 16.1075 10.6866 15.1968 11.3871L6.81699 17.8331C5.66616 18.7183 4 17.8979 4 16.446Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </AccordianDiv>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Past;
