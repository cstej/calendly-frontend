//
import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Textarea, Typography, Spinner } from "@material-tailwind/react";
import api from "@/pages/api/api";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
export function MessageDialog({ open, setOpen, data, setData }) {
  const [wait, setWait] = useState(false);
  const router = useRouter();
  const [check, setCheck] = useState([]);
  const [duplicate, setDuplicate] = useState("");

  const handleOpen = () => {
    setOpen(!open);
  };

  const handelChange = (e) => {
    let val = e.target.value;
    let dup = check.find((ele) => ele.host_name === val.toLowerCase().trim());
    if (dup) {
      setDuplicate("This name is already exist !!");
    } else {
      setDuplicate("");
    }
    setData({ ...data, [e.target.name]: val.toLowerCase().trim() });
  };

  const handleNext = () => {
    setWait(true);
    if (!duplicate) {
      api
        .post("event/create", data)
        .then((res) => {
          toast.success("Event Created ");
          router.push(`/event/create/${res.data?.data?._id}/${res.data?.data?.orgNumber}`);
        })
        .catch((err) => {
          toast.error(err.response.data.msg);
          setWait(false);
        });
    }
  };

  const GetData = () => {
    api
      .get("event/event_data")
      .then((res) => {
        setCheck(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Dialog open={open} size="md" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start"> </DialogHeader>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-3 h-5 w-5" onClick={handleOpen}>
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </div>
        <DialogBody>
          <Typography className="mb-4 -mt-7 " color="gray" variant="lead">
            Who will host this one-on-one event type?
            <Typography className="text-[13px]">Create a one-on-one event type for yourself or on behalf of another user.</Typography>
          </Typography>
          <div className="grid gap-2">
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Choose a host
            </Typography>
            <Input label="Host Name" name="host_name" value={data.hostt_name} onChange={handelChange} />
            {duplicate && <span className="text-red-500 text-[12px]">{duplicate}</span>}
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            cancel
          </Button>
          {wait ? (
            <Button size="sm" variant="borderd" color="blue">
              <Spinner />
            </Button>
          ) : (
            <Button variant="gradient" color="blue" onClick={handleNext} disabled={duplicate}>
              Next
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
}
