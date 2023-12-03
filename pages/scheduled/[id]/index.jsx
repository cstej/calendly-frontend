"use client";
import { useEffect, useState } from "react";
import api from "@/pages/api/api";
import { useRouter } from "next/router";

import { Button, Input, Spinner, Textarea } from "@material-tailwind/react";

const Index = () => {
  const router = useRouter();
  const [data, setData] = useState({});
  const [wait, setWait] = useState(false);

  const GetData = () => {
    setWait(true);
    api
      .get(`/schedule/get_booked/${router?.query?.id}`)
      .then((res) => {
        setWait(false);
        setData(res.data);
      })
      .catch((err) => {
        setWait(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (router?.query?.id) {
      GetData();
    }
  }, [router?.query?.id]);

  return (
    <>
      <div className=" bg-gradient-to-b from-[#02AABD] to-[#00CDAC] min-h-screen flex items-center justify-center ">
        <div className="flex items-center flex-col gap-5 rounded-md shadow-md w-[60%] h-[80%] bg-[rgba(255,255,255,0.5)] p-8">
          <div className="flex flex-col items-center gap-2">
            <h1>You Are Scheduled</h1>
            <p>A calendar invitation has been sent to your email address.</p>
            <Button varient="outlined" color="black">
              Open Invitation
            </Button>
          </div>

          {wait ? (
            <Spinner className="h-16 w-16" />
          ) : (
            data && (
              <div className="bg-gray-200 p-4 rounded-lg shadow-md flex flex-col gap-3 w-[350px] ">
                {/* <div className="text-xl font-bold">Katill</div> */}
                {/* <div className="text-lg">Arun Kumar</div> */}
                <div className="text-sm flex gap-2 justify-between mt-2">
                  <p>Time Schedule</p>
                  <p className="font-bold">
                    {data?.time?.start} - {data?.time?.end}
                  </p>
                </div>
                <div className="flex gap-2 justify-between">
                  <p>Your Scheduled Date</p>
                  <p className="font-bold"> {data?.date}</p>
                </div>
                <div className="flex gap-2 justify-between">
                  <p>Email </p>
                  <p className="font-bold ">{data?.email}</p>
                </div>
                <div className="flex gap-2 justify-between">
                  <p>Phone</p>
                  <p> {data?.phone && `+91 ${data?.phone}`}</p>
                </div>
              </div>
            )
          )}
          {/*  */}
        </div>
      </div>
    </>
  );
};

export default Index;
