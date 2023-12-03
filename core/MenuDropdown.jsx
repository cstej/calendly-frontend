import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";
import { CgProfile } from "react-icons/cg";
import { BiKey } from "react-icons/bi";
import { CiBoxes } from "react-icons/ci";
import { BsCreditCard } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { TbHistoryToggle } from "react-icons/tb";
import { GiExitDoor } from "react-icons/gi";
import Link from "next/link";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import useLogout from "@/libs/mutations/auth/useLogout";

let ListItemArr = [
  {
    icon: CgProfile,
    text: "Account",
    link: "/profile",
  },
  {
    icon: IoMdSettings,
    text: "Settings",
    link: "/",
  },
];

export default function MenuDropdown() {
  const { mutate: logoutFn, isLoading } = useLogout();
  const handleTheLogout = async () => {
    logoutFn(); 
  };
  return (
    <div className="h-10 w-10 flex justify-center items-center text-right z-20 bg-white">
      <Menu as="div" className="relative inline-block text-left">
        <div className="">
          <Menu.Button className="inline-flex justify-center border-2 bg-purple-400 relative overflow-hidden h-10 w-10 rounded-full items-center px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
            {/* <Image fill src={src} alt={"image"} /> */}
            <p className="text-white">A</p>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {ListItemArr.map((el, i) => {
                return (
                  <Menu.Item key={i}>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? "bg-violet-500 text-orange-500"
                            : "text-gray-800"
                        } group flex w-full transition duration-300 items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <Link href={el.link}>
                          <div className="flex gap-x-3">
                            {<el.icon size={20} />}
                            <p>{el.text}</p>
                          </div>
                        </Link>
                      </button>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
            {/* logout btn  */}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-violet-500 text-orange-500" : "text-gray-800"
                  } group flex w-full transition duration-300 items-center rounded-md px-2 py-2 text-sm`}
                >
                  <div className="flex gap-x-3">
                    {<GiExitDoor size={20} />}
                    <p onClick={handleTheLogout}>Logout</p>
                  </div>
                </button>
              )}
            </Menu.Item>
            {/* super admin btn  */}
            {true && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-orange-500" : "text-gray-800"
                    } group flex w-full transition duration-300 items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <Link href={"/admin"}>
                      <div className="flex gap-x-3">
                        {<MdOutlineAdminPanelSettings size={20} />}
                        <p>Admin</p>
                      </div>
                    </Link>
                  </button>
                )}
              </Menu.Item>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
