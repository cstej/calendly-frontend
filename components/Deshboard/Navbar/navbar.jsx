import { Button } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";

const Navbar = ({ logoSrc, appName }) => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-lg">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a className="flex items-center">
          <img src={logoSrc} className="h-8 mr-3" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{appName}</span>
        </a>
        <div className="flex items-center">
          <Link href="/event/create">
            <Button varient="outlined" color="blue">
              Create
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
