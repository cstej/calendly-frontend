import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { BiCopy } from "react-icons/bi";
import toast from "react-hot-toast";
const WelcomePages = ({ userName, userEmail }) => {
  return (
    <div className="bg-grey-50 bg-blue-gray-50 min-h-screen px-4 md:px-0 flex justify-center items-center">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {/* left section */}
        <div className="max-w-2xl w-full md:w-[500px] bg-grey-50 bg-blue-gray-50 p-4 md:p-8">
          <div className="flex-1  mr-2">
            <div className="bg-blue-100 justify-between w-[250px] p-2 rounded mb-4">
              <p className="text-md p-2">7 days of trial remaining</p>
            </div>
            <div className="flex items-center p-2 mt-4">
              <p className="font-bold  text-black-100 text-5xl mr-2">
                Welcome back,
              </p>
            </div>
            {/* userName */}
            <div className="flex items-center p-2 mt-1">
              <p className="font-bold text-indigo-700 text-5xl">{userName}</p>
            </div>
            <p className="mt-2 p-2 text-gray-600">
              {
                "We're here to help you optimize your scheduling workflow and get the most out of your Calendly"
              }
            </p>
            <div className="flex items-center mt-8">
              <Link
                href={`${userName ? "/dashboard" : "/login"}`}
                className="mr-2 py-2 px-4 bg-primary text-white rounded-full hover:bg-primary-dark"
              >
                My account
              </Link>
              <a
                className="py-2 ml-8 px-4 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100"
                href=" "
              >
                Create new event type
              </a>
            </div>
            <div className="ml-auto flex  mt-6 ">
              <div className="flex flex-row cursor-pointer">
                <div className="mb-1 p-2 mt-2">
                  <span className="text-md text-gray-700">
                    https://calendly.com/{userEmail?.split("@")[0]}
                  </span>
                </div>
                <div>
                  <span>
                    <button className="flex  text-blue-800 hover:underline px-2 py-0 rounded-lg mr-2">
                      <BiCopy
                        style={{
                          marginRight: "5px",
                          color: "blue",
                          height: 60,
                          width: 20,
                        }}
                      />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* right section */}
        <div className="flex flex-col bg-white h-[500px] mt-4 md:mt-0 rounded shadow-lg max-w-full">
          <div className="max-w-2xl w-full md:w-[500px] bg-white p-4 md:p-8 ">
            <div className="flex flex-col space-y-4">
              <p className="text-md text-black mt-4">
                {" "}
                Not Sure What to do Next?
              </p>

              <div className="w-full bg-gray-200 rounded-full mt-2 h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full w-[45%]"></div>
              </div>
              <div className="flex flex-col">
                <div className="w-full h-10 mt-6 space-y-5">
                  <Button variant="outlined" className="w-full items-start">
                    Connect to your Calendar
                  </Button>
                </div>
                <div className="w-full h-10 mt-6 space-y-5">
                  <Button variant="outlined" className="w-full items-start">
                    Connect video conferencing & set location
                  </Button>
                </div>
                <div className="w-full h-10 mt-6 space-y-5">
                  <Button variant="outlined" className="w-full items-start">
                    Share links to book meetings
                  </Button>
                </div>
                <div className="w-full h-10 mt-6 space-y-5">
                  <Button variant="outlined" className="w-full items-start">
                    Download extension
                  </Button>
                </div>
                <div className="w-full h-10 mt-6 space-y-5">
                  <Button variant="outlined" className="w-full items-start">
                    Schedule your first meeting
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePages;
