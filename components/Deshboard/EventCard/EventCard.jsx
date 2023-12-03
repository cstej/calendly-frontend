import React, { useState, useRef } from "react";
import { AiTwotoneSetting } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Button, Switch } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";
import { Menu } from "@headlessui/react";
import api from "@/pages/api/api";
import { useRouter } from "next/router";
import { DeleteModal } from "@/components/Modals/DeleteModal";
import EventUpdateModal from "@/components/event/Modal/EventUpdateModal";

const EventCard = ({
  meet_type,
  orgNumber,
  host_name,
  _id,
  on_off,
  eventDetails,
  event_color,
  GetData,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleOpen2 = () => {
    setOpen2(!open2);
  };
  //
  const handleCopyLink = (link) => {
    const event_link = `http://localhost:3000/client_event/${link}`;
    navigator.clipboard
      .writeText(event_link)
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy link: ", error);
      });
  };

  const handleChange = (e) => {
    api
      .patch(`event/update/${_id}`, { on_off: e.target.checked })
      .then((res) => {
        GetData();
        toast.success(e.target.checked ? "Event On" : "Event Off");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const handleDelete = () => {
    api
      .delete(`event/delete/${_id}`)
      .then((res) => {
        GetData();
        toast.success("Event Delete Successful");
      })
      .catch((err) => toast.error("Something went wrong"));
  };

  return (
    <div
      style={{ borderTop: `5px solid ${eventDetails[0]?.event_color}` }}
      className={`bg-white relative shadow-lg w-[300px] h-[auto]  ml-8 rounded-md p-3 `}
    >
      <DeleteModal
        handleClick={handleDelete}
        open={open}
        handleOpen={handleOpen}
        title="Delete"
        value={eventDetails[0]?.event_name}
      />
      <EventUpdateModal
        handleOpen={handleOpen2}
        open={open2}
        id={_id}
        orgNumber={orgNumber}
      />
      {/*  */}
      <div className="flex justify-between px-2">
        <div className="inputBx">
          <input type="checkbox" />
        </div>
        <Menu>
          <Menu.Button>
            <AiTwotoneSetting />
          </Menu.Button>
          <Menu.Items className=" absolute right-2 top-[40px] bg-gray-100 flex gap-2 flex-col shadow-md  p-3">
            <Button
              color="blue"
              variant="text"
              size="sm"
              className="flex gap-2"
              onClick={() => {
                handleOpen2();
                router.push(`/dashboard?id=${_id}&orgNumber=${orgNumber}`);
              }}
            >
              Edit <FiEdit />
            </Button>
            {/*  */}
            <Button
              color="blue"
              variant="text"
              size="sm"
              className="flex gap-2"
              onClick={handleOpen}
            >
              Delete <MdDeleteOutline />
            </Button>
            {/*  */}
            <div size="sm" className="flex justify-center text-[10px] gap-2">
              on/off
              <Switch
                onChange={handleChange}
                size="sm"
                color="blue"
                defaultChecked={on_off}
              />
            </div>
          </Menu.Items>
        </Menu>
      </div>

      {/*  */}
      <div className="flex mb- flex-col gap-2 py-2 ">
        <p className="mx-2 text-black-600 font-bold"> {host_name}</p>
        <p className="mx-2 text-black-600 mb-2 ">
          {" "}
          {eventDetails[0]?.event_name}
        </p>
        <p className="mx-2 text-black-600 mb-2 ">
          {" "}
          Event Duration{" "}
          {eventDetails[0]?.duration ? eventDetails[0]?.duration : "Not Set"}
        </p>
        <a
          href={`http://localhost:3000/client_event/${eventDetails[0]?.event_link}`}
          className="block mx-2 text-blue-900  dark:text-blue hover:underline"
          aria-current="page"
        >
          View Booking
        </a>
      </div>
      <div className="flex w-full justify-between ">
        <Button onClick={() => handleCopyLink(eventDetails[0]?.event_link)} variant="outlined" color="blue" className="flex gap-2">
          <BiCopy />
          Copy Link
        </Button>
        <button className="flex gap-1 items-center text-blue-800 hover:underline px-4 py-2 rounded-lg mr-2">
          <FaShare />
          Share
        </button>
      </div>
    </div>
  );
};

export default EventCard;
