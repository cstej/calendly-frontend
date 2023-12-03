import React from 'react';

const ListHeader = ({ userLogoSrc, userName }) => {
  return (
    <div className="list-header grid grid-cols-1 md:grid-cols-3 gap-5 w-full mt-2 mx-auto p-4 md:p-20px">
      <div className="col-span-3 bg-gray-50 dark:bg-gray-800 text-black p-4">
        <nav className="border-gray-200 dark:bg-gray-900">
          <div className="flex flex-wrap bg-gray-50 dark:bg-gray-800 justify-between items-center mx-auto max-w-screen-xl p-4">
            <a className="flex items-center">
              <img src={userLogoSrc} className="h-10 mr-3" alt="User Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
                {userName}
              </span>
            </a>
            <div className="flex items-center mt-4 md:mt-0">
              <button
                id="home-bar-create-button"
                aria-haspopup="listbox"
                className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md"
                type="button"
              >
                <div className="flex items-center">
                  <span className="mr-2">
                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.97461 3.64999C10.3888 3.64999 10.7246 3.98578 10.7246 4.39999V15.65C10.7246 16.0642 10.3888 16.4 9.97461 16.4C9.5604 16.4 9.22461 16.0642 9.22461 15.65V4.39999C9.22461 3.98578 9.5604 3.64999 9.97461 3.64999Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.59961 10.025C3.59961 9.61078 3.9354 9.27499 4.34961 9.27499H15.5996C16.0138 9.27499 16.3496 9.61078 16.3496 10.025C16.3496 10.4392 16.0138 10.775 15.5996 10.775H4.34961C3.9354 10.775 3.59961 10.4392 3.59961 10.025Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  New Event
                </div>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ListHeader;
