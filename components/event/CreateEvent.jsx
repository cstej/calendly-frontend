import { List, ListItem, ListItemPrefix, Avatar, Card, Typography, CardBody, ListItemSuffix } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { MessageDialog } from "./Modal/FirstModal";
import axios from "axios";
import api from "@/pages/api/api";

const meet_data = {
  meet_type: "",
  host_name: "",
};

const CreateEvent = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(meet_data);

  const items = [
    {
      name: "One-on-One",
      alt: "candice",
      src: "https://assets.calendly.com/assets/frontend/media/one_on_one-c0ed81ea039b15906953.svg",
      description: "One host with one invitee",
      meet_type: "one_on_one",
    },
    {
      name: "Group",
      alt: "alexander",
      src: "https://assets.calendly.com/assets/frontend/media/group-eaa808c3bb66b614c714.svg",
      description: "One host with group invitees",
      meet_type: "group",
    },
    {
      name: "Collective",
      alt: "emma",
      src: "https://assets.calendly.com/assets/frontend/media/collective-dff7740f53ebd8dd98cc.svg",
      description: "More than one host with one invitee",
      meet_type: "collective",
    },
  ];

  const handleChooseType = (meet_type) => {
    setData({ ...data, meet_type });
    setOpen(true);
  };

  return (
    <>
      <MessageDialog open={open} setOpen={setOpen} setData={setData} data={data} />
      <div className="h-[100px] gap-4 justify-center w-full shadow-md flex">
        <div className="p-5 flex items-center">
          <button>Back</button>
        </div>
        <div className="flex gap-10 items-center justify-around w-[60%]">
          <h1 className="text-2xl">Create New Event Type</h1>
        </div>
      </div>

      <div className="p-5 h-screen w-full flex justify-center">
        <div className=" w-[50%]">
          {/* <div className="card"></div> */}
          <Card className="w-full">
            <List>
              {items.map((item, index) => (
                <ListItem key={index} onClick={() => handleChooseType(item.meet_type)}>
                  <ListItemPrefix>
                    <Avatar className="h-[100px] w-[120px]" variant="circular" alt={item.alt} src={item.src} />
                  </ListItemPrefix>
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <Typography variant="h6" color="blue-gray">
                        {item.name}
                      </Typography>
                      <Typography variant="small" color="gray" className="font-normal">
                        {item.description}
                      </Typography>
                    </div>
                    <div>
                      <AiFillCaretRight />
                    </div>
                  </div>
                </ListItem>
              ))}
            </List>
          </Card>

          {/*  */}
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
