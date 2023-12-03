import React, { useEffect, useState } from "react";
import { BsClockHistory } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import "./meet.css";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";

import { TagsInput } from "react-tag-input-component";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, isWithinInterval } from "date-fns";
import { useRouter } from "next/router";
import api from "@/pages/api/api";
import { Button, Input, Spinner, Textarea } from "@material-tailwind/react";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { GiConsoleController } from "react-icons/gi";
import Link from "next/link";
import toast from "react-hot-toast";

const meet_sch = {
  date: "",
  time: {},
  email: "",
  name: "",
  guest: [],
  anything: "",
  day: "",
  mobile: "",
};

const Meet = () => {
  //
  const router = useRouter();
  const [data, setData] = useState(meet_sch);
  const { date, day, guest } = data;

  const [avTime, setAvTime] = useState([]);

  const [showGuest, setaShowGuest] = useState(false);
  //
  const [caseNum, setCaseNum] = useState(1);
  //

  const [meetData, setMeetData] = useState([]);

  const [wait, setWait] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  // errors
  const [nameErr, SetNameError] = useState();
  const [emailErr, SetEmailError] = useState();
  const [phoneErr, SetPhoneError] = useState();

  const startDate = new Date(meetData?.eventDetails?.date_range?.startDate);
  const endDate = new Date(meetData?.eventDetails?.date_range?.endDate);

  const validation = () => {
    let isValid = true;

    if (!data?.name) {
      SetNameError("Name is required *");
      isValid = false;
    } else {
      SetNameError("");
    }

    if (!data?.email) {
      SetEmailError("Email is required *");
      isValid = false;
    } else {
      SetEmailError("");
    }

    if (!data?.phone) {
      SetPhoneError("Phone is required *");
      isValid = false;
    } else {
      SetPhoneError("");
    }

    return isValid;
  };

  const isDateEnabled = (date) => {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      return false;
    }

    if (isNaN(startDate) || isNaN(endDate)) {
      return false;
    }

    return isWithinInterval(date, { start: startDate, end: endDate });
  };

  const getDayfromDate = (date) => {
    const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const dayIndex = date.getDay();
    const dayName = daysOfWeek[dayIndex];
    return dayName;
  };

  const GetData = () => {
    setWait(true);
    api
      .get(`/meet/get_meet_data/${router?.query?.orgnumber}/${router?.query?.hostname}/${router?.query?.eventname}`)
      .then((res) => {
        setWait(false);
        setMeetData(res.data);
      })
      .catch((error) => {
        setWait(false);
        console.log(error);
      });
  };

  const frmateDate = (myDate) => {
    const originalDate = new Date(myDate);

    const day = originalDate.getDate();
    const month = originalDate.getMonth() + 1;
    const year = originalDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  useEffect(() => {
    if (router?.query?.orgnumber && router?.query?.hostname && router?.query?.eventname) {
      GetData();
    }
  }, [router?.query?.orgnumber, router?.query?.hostname, router?.query?.eventname]);

  const dayPickerStyles = {
    day: {
      margin: "2px",
      padding: "30px",
      background: "#fff",
      color: "#000",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "20px",
    },
  };

  const getAvailableTime = () => {
    setLoading2(true);
    api
      .get(`/meet/get_available_time/${meetData?._id}?date=${frmateDate(data?.date)}&day=${day} `)
      .then((res) => {
        setAvTime(res.data);
        setLoading2(false);
      })
      .catch((err) => {
        setLoading2(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getAvailableTime();
  }, [date]);

  const handleDayClick = (day) => {
    if (isDateEnabled(day)) {
      setData({ ...data, date: day, day: getDayfromDate(day) });
    }
  };

  const handleNext = (time) => {
    setData({ ...data, time: time });
    setCaseNum(caseNum + 1);
  };

  const handleChange = (e) => {
    if (e.target.name == "name") {
      SetNameError("");
    }
    if (e.target.name == "phone") {
      SetPhoneError("");
    }
    if (e.target.name == "email") {
      SetEmailError("");
    }

    let val = e.target.value;
    setData({ ...data, [e.target.name]: val });
  };

  // console.log(meetData);

  const handleSchedule = () => {
    if (validation() && meetData) {
      setLoading(true);
      api
        .post("/schedule/book", { ...data, event_id: meetData?._id })
        .then((res) => {
          router.push(`/scheduled/${res?.data?._id}`);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          toast.error(err?.response?.data?.msg);
        });
    }
  };

  return (
    <>
      {wait ? (
        <div>loading...</div>
      ) : (
        <div className="flex relative items-center justify-center min-h-screen bg-gradient-to-b from-[#02AABD] to-[#00CDAC]">
          <div className="box relative h-[80vh] min-w-[60vw] bg-[rgba(255,255,255,0.8)]  p-5 flex rounded-md ">
            {caseNum == 1 && (
              <>
                {/*  */}
                <div className="card w-[40%] p-4 ">
                  <div className="flex flex-col gap-5">
                    <span>{meetData.host_name}</span>
                    <h1 className="text-2xl">{meetData.eventDetails?.event_name}</h1>
                    <span className="flex gap-x-5 items-center">
                      <BsClockHistory />
                      {meetData.eventDetails?.duration}
                    </span>
                    <div className="flex gap-x-5 items-center">
                      <MdLocationPin />
                      {meetData.eventDetails?.location?.location_name}
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="card flex justify-center items-center ">
                  <div className="flex ">
                    {!wait && (
                      <DayPicker
                        selected={date}
                        onDayClick={handleDayClick}
                        disabled={(date) => !isDateEnabled(date)}
                        styles={dayPickerStyles}
                        modifiersStyles={{
                          selected: {
                            background: "#00b0ff",
                            color: "#fff",
                          },
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="custom-scrollbar  flex flex-col w-[50%] p-3 items-center overflow-scroll justify-start gap-3">
                  {/* {date && <p>You selected {date && format(date, "MMMM d, yyyy")}</p>} */}
                  {loading2 ? (
                    <Spinner color="blue" className="h-16 w-16" />
                  ) : avTime && Array.isArray(avTime) && avTime.length <= 0 ? (
                    <Button>Holiday</Button>
                  ) : (
                    avTime.map((ele) => (
                      <div className="flex gap-2 justify-between" key={ele?.start}>
                        <Button size="sm" variant="text" color="blue">
                          {ele?.start}
                        </Button>
                        <Button onClick={() => handleNext(ele)} size="sm" className="text-[10px] rounded-sm" color="blue">
                          Book Now
                        </Button>
                      </div>
                    ))
                  )}
                </div>
                {/*  */}
              </>
            )}
            {caseNum == 2 && (
              <>
                <div className="w-[35%]  ">
                  <Button onClick={() => setCaseNum(caseNum - 1)} variant="text" color="black" size="sm" className="text-2xl">
                    <BiArrowBack />
                  </Button>
                  <div className="flex flex-col gap-5 p-4">
                    <span>{meetData?.host_name}</span>
                    <h1 className="text-2xl">{meetData?.eventDetails?.event_name}</h1>
                    <span className="flex gap-x-5 items-center">
                      <BsClockHistory />
                      {meetData?.eventDetails?.duration}
                    </span>
                    <div className="flex gap-x-5 items-center">
                      <MdLocationPin />
                      {meetData.location?.location_name}
                    </div>

                    <div className="flex items-center gap-2">
                      <AiOutlineCalendar />
                      <div className="flex flex-col">
                        <p>
                          {data?.time?.start} To {data?.time?.end}
                        </p>
                        <p>{date && format(date, "MMMM d, yyyy")}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="card px-4 flex flex-col gap-4 justify-start items-start ">
                  <h1 className="text-2xl font-bold">Enter Details</h1>

                  <div className="inputBx w-full flex flex-col gap-1">
                    <label htmlFor="name">Name</label>
                    <Input onChange={handleChange} value={data?.name} color="blue" id="name" name="name" label="Name" />
                    {nameErr && <span className="text-[12px] text-red-500">{nameErr}</span>}
                  </div>

                  <div className="inputBx w-full flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <Input onChange={handleChange} value={data?.email} name="email" color="blue" id="email" label="Email" />
                    {emailErr && <span className="text-[12px] text-red-500">{emailErr}</span>}
                  </div>

                  <div className="inputBx w-full flex flex-col gap-1">
                    <label htmlFor="phone">Phone Number</label>
                    <Input onChange={handleChange} value={data?.phone} name="phone" color="blue" id="phone" label="Phone" />
                    {phoneErr && <span className="text-[12px] text-red-500">{phoneErr}</span>}
                  </div>

                  <div className="inputBx flex flex-col gap-1">
                    <label htmlFor="anything">Please share anything that will help prepare for our meeting.</label>
                    <Textarea onChange={handleChange} value={data?.anything} name="anything" id="anything" variant="outlined" />
                  </div>

                  <div className="inputBx w-full flex flex-col gap-3">
                    {showGuest ? (
                      <>
                        <label htmlFor="name">Guest Email(s)</label>
                        <TagsInput style={{ width: "450px", background: "transparent" }} value={guest} onChange={(newGuest) => setData({ ...data, guest: newGuest })} />
                      </>
                    ) : (
                      <Button variant="text" color="blue" onClick={() => setaShowGuest(true)}>
                        Add Guest +
                      </Button>
                    )}
                  </div>

                  <div className="inputBx flex flex-col gap-1">
                    {loading ? (
                      <Spinner />
                    ) : (
                      <Button onClick={handleSchedule} color="blue">
                        Schedule Event
                      </Button>
                    )}
                  </div>

                  {/*  */}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Meet;
