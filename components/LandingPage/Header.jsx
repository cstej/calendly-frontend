import React from "react";
import {
  Button,
  ButtonGroup,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useMediaQuery } from "@mui/material";
import { Svg } from "./Svg";
import Link from "next/link";
const Header = ({ logoSrc, appName, userName }) => {
  const isMobile = useMediaQuery("(max-width:full)");
  return (
    <nav className="bg-white sticky top-0 z-[999] border-b-2 border-gray-300 dark:bg-gray-900 shadow-lg">
      <div className="flex md:flex-row lg:flex-row justify-between items-center w-full mx-auto max-w-screen-xl p-2">
        <a className="flex items-center">
          <img src={logoSrc} className="h-12 mr-2" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            {appName}
          </span>
        </a>
        <div
          className={`flex gap-3 lg:flex-row  items-center flex-wrap ${
            isMobile ? "hidden md:flex" : "flex"
          }`}
        >
          <Menu>
            <MenuHandler>
              <Button
                bg="none"
                className="flex gap-0 items-center shadow-none"
                size="sm"
                varient="text"
                color="white"
              >
                Product
                <Svg />
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem>Menu Item 1</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
              <MenuItem>Menu Item 3</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuHandler>
              <Button
                bg="none"
                className="flex gap-0 items-center shadow-none"
                size="sm"
                varient="text"
                color="white"
              >
                Solutions
                <Svg />
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem>Menu Item 1</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
              <MenuItem>Menu Item 3</MenuItem>
            </MenuList>
          </Menu>
          <Button variant="text">Enterprise</Button>
          <Button variant="text">Pricing</Button>
          <Menu>
            <MenuHandler>
              <Button
                bg="none"
                className="flex gap-0 items-center shadow-none"
                size="sm"
                varient="text"
                color="white"
              >
                Resources
                <Svg />
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem>Menu Item 1</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
              <MenuItem>Menu Item 3</MenuItem>
            </MenuList>
          </Menu>
          {/* Add more responsive Header elements here */}
        </div>
        <div className="flex flex-row items-center">
          {/* <Button variant="text" color="blue">
            Upgrade Now
          </Button> */}
          <Link href={`${userName ? "/dashboard" : "/login"}`}>
            <Button variant="filled" color="blue">
              My Account
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
