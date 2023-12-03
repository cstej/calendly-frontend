//
const custom_time = {
  sun: [{}],
  mon: [{ start: "9:00am", end: "5:00pm" }],
  tue: [{ start: "9:00am", end: "5:00pm" }],
  wed: [{ start: "9:00am", end: "5:00pm" }],
  thu: [{ start: "9:00am", end: "5:00pm" }],
  fri: [{ start: "9:00am", end: "5:00pm" }],
  sat: [{}],
};


import api from "@/pages/api/api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  Option,
  Select,
  Spinner,
  Textarea,
} from "@material-tailwind/react";
import { BsTelephone, BsTelephoneFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import LocationModal from "./Modal/LocationModal";
import { BiEdit } from "react-icons/bi";

import { DateRange, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Styles for the date range picker
import "react-date-range/dist/theme/default.css";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { createTimeSlotsWithBreak } from "../GenerateTime";

const eventData = {
  event_name: "",

  location_type: "", // personal meet or phone call meet
  call_option: "callMyInvitee", // i'll call my invitee or invitee will call me
  mobile_number: "", // if i'm sending my number to the client
  location_name: "", // if meeting is in-personal-meeting  location name
  location_desc: "",

  desc: "", // description
  event_color: "#585858",
  duration: "",
  gap_before: "",
  gap_after: "",
  date_range: {}, // when the event is started or ended
  meet_time: {
    sun: [],
    mon: [{ start: "9:00am", end: "5:00 PM" }],
    tue: [{ start: "9:00am", end: "5:00 PM" }],
    wed: [{ start: "9:00am", end: "5:00 PM" }],
    thu: [{ start: "9:00am", end: "5:00 PM" }],
    fri: [{ start: "9:00am", end: "5:00 PM" }],
    sat: [{}],
  },
};

const EventDetails = () => {
  const route = useRouter();

  const [wait, setWait] = useState(false);

  const [details, setDetails] = useState(eventData);
  const {
    event_name,
    location_type,
    call_option,
    mobile_number,
    location_name,
    location_desc,
    desc,
    event_color,
    date_range,
    duration,
    meet_time,
    gap_before,
    gap_after,
  } = details;
  const orgNumber = route?.query?.orgNumber;
  const id = route?.query?.id;

  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [caseNum, setCaseNum] = useState(1);

  const [eventNameErr, setEventNameErr] = useState("");
  const [eventLocationErr, seteEventLocationErr] = useState("");
  const [eventLinkErr, setEventLinkErr] = useState("");

  // date range
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  // const [meetTimes, setMeetTimes] = useState(meet_time);

  // validation errors
  const [dateErr, setDateErr] = useState("");
  const [durationErr, setDurationErr] = useState("");

  const [gapChecked, setGapChecked] = useState({
    gap_after: false,
    gap_before: false,
  });
  const [customTable, setCustomTable] = useState(false);
  const [days, setDays] = useState([
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);

  //
  const handleStartTimeChange = (day, index, value) => {
    const updatedMeetTimes = { ...meet_time };
    updatedMeetTimes[day.toLowerCase()][index].start = value;

    // Update the meet_time property in details
    setDetails((prevDetails) => ({
      ...prevDetails,
      meet_time: updatedMeetTimes,
    }));
  };

  const handleEndTimeChange = (day, index, value) => {
    const updatedMeetTimes = { ...meet_time };
    updatedMeetTimes[day.toLowerCase()][index].end = value;

    // Update the meet_time property in details
    setDetails((prevDetails) => ({
      ...prevDetails,
      meet_time: updatedMeetTimes,
    }));
  };

  const addCustomTime = (day) => {
    const updatedMeetTimes = { ...meet_time };

    // Check if the array exists and create an array if it doesn't
    if (!updatedMeetTimes[day.toLowerCase()]) {
      updatedMeetTimes[day.toLowerCase()] = [];
    }

    updatedMeetTimes[day.toLowerCase()].push({ start: "", end: "" });

    // Update the meet_time property in details
    setDetails((prevDetails) => ({
      ...prevDetails,
      meet_time: updatedMeetTimes,
    }));
  };

  const deleteCustomTime = (day, index) => {
    const updatedMeetTimes = { ...meet_time };
    const dayArray = updatedMeetTimes[day.toLowerCase()];

    if (dayArray && dayArray.length > index) {
      dayArray.splice(index, 1);

      // Update the meet_time property in details
      setDetails((prevDetails) => ({
        ...prevDetails,
        meet_time: updatedMeetTimes,
      }));
    }
  };
  //

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Handle the change event for the date range
  const handleDateRangeChange = (ranges) => {
    const newStartDate = ranges.selection.startDate;
    const newEndDate = ranges.selection.endDate;

    setStartDate(newStartDate);
    setEndDate(newEndDate);

    setDetails({
      ...details,
      date_range: {
        startDate: newStartDate,
        endDate: newEndDate,
      },
    });
  };

  const secoundValidation = () => {
    let isValid = true;

    if (!startDate || !endDate) {
      setDateErr("Date can not be empty");
      isValid = false;
    } else {
      setDateErr("");
    }
    if (startDate > endDate) {
      setDateErr("Invalid Date");
      isValid = false;
    } else {
      setDateErr("");
    }
    if (!duration) {
      setDurationErr("Minimum duration required");
      isValid = false;
    } else {
      setDurationErr("");
    }
    return isValid;
  };

  const formateDate = (date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date?.getMonth()];
    const formattedDate = `${month} ${date.getDate()} ${date.getFullYear()}`;
    return formattedDate;
  };

  const firstValidation = () => {
    let isValid = true;
    if (!event_name) {
      isValid = false;
      setEventNameErr("Event Name is required");
    } else {
      setEventNameErr("");
    }

    if (!location_type) {
      isValid = false;
      seteEventLocationErr("Location field is required");
    } else {
      seteEventLocationErr("");
    }

    return isValid;
  };

  const handleChange = (e) => {
    let val = e.target.value;
    setDetails({ ...details, [e.target.name]: val });

    if (e.target.name == "event_name") {
      setEventNameErr("");
    }
  };
  const handleChange2 = (e) => {
    const val = e;
    setDetails({ ...details, location_type: val });
    setOpen(true);
    setChange(!change);
    if (val) {
      seteEventLocationErr("");
    }
  };

  const handleClick = () => {
    if (firstValidation()) {
      setCaseNum(caseNum + 1);
    }
  };

  const [single, setSingle] = useState({});
  useEffect(() => {
    if (id && orgNumber) {
      api
        .get(`event/get_details/${id}/${orgNumber}`)
        .then((res) => {
          setSingle(res?.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id, orgNumber]);

  const handleBack = () => {
    setCaseNum(caseNum - 1);
  };

  // setWait(false);
  const handleSubmit = () => {
    // console.log(details);
    if (secoundValidation()) {
      setWait(true);
      api
        .post(`/event/create_details/${id}/${orgNumber}`, details)
        .then((res) => {
          toast.success(res.data.msg);
          route.push("/dashboard");
          // setWait(false);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.msg);
          setWait(false);
        });
    }
  };

  return (
    <>
      <LocationModal
        change={change}
        setChange={setChange}
        details={details}
        setDetails={setDetails}
        open={open}
        setOpen={setOpen}
      />
      <div className="flex gap-8 flex-col items-center bg-gray-100 minh-screen ">
        {caseNum == 1 && (
          <div className="box w-[70%] h-screen mt-5 bg-white p-4">
            {/* Head */}
            <div className="head flex p-4 justify-between border">
              <div className="flex gap-2 items-center">
                <span
                  style={{ background: event_color }}
                  className={`rounded-full h-[40px] w-[40px]`}
                ></span>
                <div>
                  <p className="text-[14px] font-bold">What event is this ?</p>
                  <p className="flex items-center gap-x-2">
                    {location_type == "phonecall" ? (
                      <span className="text-[10px] flex items-center gap-x-1">
                        <BsTelephoneFill className="text-blue-500 " />{" "}
                        {location_type}
                      </span>
                    ) : location_type == "inperson" ? (
                      <span className="text-[10px] flex items-center gap-x-1">
                        <MdLocationPin className="text-purple-600 text-[18px]" />{" "}
                        {location_type}
                      </span>
                    ) : (
                      <span className="text-[12px]">No location given</span>
                    )}
                  </p>
                </div>
              </div>
              {/*  */}
              <div className="flex w-max items-end gap-4">
                {wait ? (
                  <Spinner />
                ) : (
                  <Button
                    onClick={handleClick}
                    className="rounded-sm"
                    size="sm"
                    color="blue"
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
            {/* Head */}

            <div className="flex flex-col gap-8 mt-8">
              <div className="flex flex-col gap-2 w-[70%]">
                <label>Event Name *</label>
                <Input
                  name="event_name"
                  value={event_name}
                  onChange={handleChange}
                  label="Event Name"
                />
                {eventNameErr && (
                  <span className="text-red-500 text-xs">{eventNameErr}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 w-[70%]">
                <label>Location *</label>
                {/* <Input value={location_type ? location_type : ""} name="location" onClick={() => setOpen(true)} onChange={() => setOpen(true)} autoComplete="off"  /> */}
                <div className="flex gap-2">
                  <Select
                    size="lg"
                    label="Select Version"
                    onChange={handleChange2}
                    name="location_type"
                    value={location_type}
                  >
                    <Option
                      className="flex items-center gap-3"
                      value="inperson"
                    >
                      <div className="flex gap-x-3">
                        <span>
                          <MdLocationPin className="text-purple-600 text-[18px]" />
                        </span>
                        <span>
                          In-Person-Meeting
                          {location_type === "inperson" ? null : (
                            <p className="text-[10px]">
                              Select an address or place
                            </p>
                          )}
                        </span>
                      </div>
                    </Option>

                    <Option
                      className="flex items-center gap-3"
                      value="phonecall"
                    >
                      <div className="flex gap-x-3">
                        <span>
                          <BsTelephoneFill className="text-blue-500" />
                        </span>
                        <span>
                          Phone Call
                          {location_type === "phonecall" ? null : (
                            <p className="text-[10px]">
                              Inbound or Outbound Calls
                            </p>
                          )}
                        </span>
                      </div>
                    </Option>
                  </Select>

                  {location_type ? (
                    <Button
                      onClick={() => setOpen(true)}
                      size="sm"
                      className="text-[15px] hover:bg-blue-500 hover:text-white"
                      label="Event Color"
                      variant="outlined"
                      color="blue"
                    >
                      <BiEdit />
                    </Button>
                  ) : null}
                </div>

                {eventLocationErr && (
                  <span className="text-red-500 text-xs">
                    {eventLocationErr}
                  </span>
                )}

                {mobile_number || location_name ? (
                  <div className="flex items-center gap-4">
                    <Input value={mobile_number || location_name} disabled />
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-2 w-[70%]">
                <label>Description/Instructions</label>
                <Textarea
                  name="desc"
                  variant="outlined"
                  value={desc}
                  onChange={handleChange}
                  label="Description/Instructions"
                />
              </div>

              <div className="flex flex-col gap-2 ">
                <label>Event Color </label>
                <Input
                  className="w-50px"
                  value={event_color}
                  onChange={(e) =>
                    setDetails({ ...details, event_color: e.target.value })
                  }
                  type="color"
                />
              </div>
            </div>
            {/*  */}
          </div>
        )}

        {caseNum == 2 && (
          <div className="box w-[50%] bg-white p-3">
            {/* Head */}
            <div className="head flex p-2 justify-between border">
              <div className="flex gap-2 items-center">
                <span
                  className={`rounded-full h-[30px] w-[30px] bg-${event_color}`}
                ></span>
                <div>
                  <p className="text-[18px] font-900">
                    When we can book this event?
                  </p>
                </div>
              </div>
              {/*  */}
              <div className="flex w-max items-end gap-4">
                <Button
                  onClick={handleBack}
                  className="rounded-sm"
                  size="sm"
                  variant="outlined"
                  color="black"
                >
                  Back
                </Button>
                {wait ? (
                  <Spinner />
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="rounded-sm"
                    size="sm"
                    color="blue"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
            {/* Head */}

            <div className="flex flex-col gap-8 mt-5 p-5">
              {/* <div className="flex flex-col w-max gap-5"> */}
              {showCalendar && ( // Only render the calendar when showCalendar is true
                <DateRange
                  className="w-[50%]"
                  editableDateInputs={true}
                  onChange={handleDateRangeChange}
                  moveRangeOnFirstSelection={false}
                  ranges={[{ startDate, endDate, key: "selection" }]}
                />
              )}
              <div className="flex flex-col  gap-1">
                <div className="flex gap-3">
                  <Input
                    readOnly
                    label="Date Range"
                    value={
                      formateDate(startDate) + " - " + formateDate(endDate)
                    }
                  />
                  <Button
                    onClick={toggleCalendar}
                    variant="outlined"
                    size="sm"
                    color="blue"
                  >
                    {showCalendar ? "Done" : "Edit"}
                  </Button>
                </div>
                {dateErr && (
                  <span className="text-red-500 text-[12px]">{dateErr}</span>
                )}
              </div>
              {/*  */}
              <div className="flex flex-col">
                <Select
                  value={duration}
                  label="Duration"
                  onChange={(val) => {
                    setDetails({ ...details, duration: val });
                    setDurationErr("");
                  }}
                >
                  <Option value="15 Min">15 Min</Option>
                  <Option value="30 Min">30 Min</Option>
                  <Option value="45 Min">45 Min</Option>
                  <Option value="60 Min">60 Min</Option>
                  {/* <Option value="Custom">Custom</Option> */}
                </Select>
                {durationErr && (
                  <span className="text-red-500 text-[12px]">
                    {durationErr}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3 my-5">
                <h1 className="text-[15px]">
                  How do you want to offer your availability for this event
                  type?
                </h1>
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setCustomTable(false),
                        setDetails({ ...details, meet_time: custom_time });
                    }}
                    className="text-[10px]"
                    size="sm"
                    variant={customTable ? "outlined" : ""}
                  >
                    Use an existing Schedule
                  </Button>
                  <Button
                    onClick={() => setCustomTable(true)}
                    className="text-[10px]"
                    size="sm"
                    variant={!customTable ? "outlined" : ""}
                  >
                    Set Custom Hours
                  </Button>
                </div>
              </div>

              {/*  */}
              <div className="flex flex-col gap-3 border border-gray-500 p-3 rounded-md">
                <div>
                  <p className="font-bold">WEEKLY HOURS</p>
                </div>

                {/*  */}
                {/*  */}
                {customTable ? (
                  <div className="flex flex-col gap-2 ">
                    {days.map((day) => (
                      <div key={day} className="flex justify-start border items-center p-2 rounded">
                        <span className="font-bold mr-4">{day}</span>
                        <div className="flex gap-4 flex-col items-start">
                          {meet_time[day.toLowerCase()].length > 0 ? (
                            meet_time[day.toLowerCase()].map((time, index) => (
                              <div key={index} className="flex gap-5 flex-col">
                                <div className="flex  gap-2 items-center" key={index}>
                                  <input type="text" placeholder="Start Time" value={time.start} onChange={(e) => handleStartTimeChange(day, index, e.target.value)} className="border rounded px-2 py-1 w-[20%]" />
                                  <input type="text" placeholder="End Time" value={time.end} onChange={(e) => handleEndTimeChange(day, index, e.target.value)} className="border rounded px-2 py-1 w-[20%]" />
                                  <Button size="sm" variant="outlined" color="red" onClick={() => deleteCustomTime(day, index)}>
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <span>Unavailable</span>
                          )}
                          <Button
                            size="sm"
                            color="black"
                            variant="outlined"
                            onClick={() => addCustomTime(day)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-5">
                    {days.map((ele) => (
                      <div key={ele} className="flex justify-between">
                        <span className="font-bold">{ele}</span>
                        <span className="flex gap-4">
                          {meet_time[ele.toLowerCase()].length > 0 ? (
                            meet_time[ele.toLowerCase()].map(
                              (timeRange, index) => (
                                <span key={index}>
                                  {timeRange.start && timeRange.end
                                    ? `${timeRange.start} - ${timeRange.end}`
                                    : "Unavailable"}
                                </span>
                              )
                            )
                          ) : (
                            <span>Unavailable</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {/*  */}
              </div>
              {/*  */}
              <div className="flex flex-col gap-2 mt-5 pb-8">
                <h1 className="font-bold">
                  Want to add time before or after your events?
                </h1>

                <div className="w-[50%] flex flex-col gap-0">
                  <div className="flex items-center">
                    <Checkbox
                      onChange={(e) => {
                        setGapChecked({
                          ...gapChecked,
                          gap_before: e.target.checked,
                        });
                        setDetails({
                          ...details,
                          gap_before: !gapChecked?.gap_before && "",
                        });
                      }}
                      checked={gapChecked?.gap_before}
                    />
                    <label>Gap Before</label>
                  </div>
                  <Select
                    disabled={!gapChecked?.gap_before}
                    size="sm"
                    value={gap_before}
                    onChange={(val) =>
                      setDetails({
                        ...details,
                        gap_before: gapChecked.gap_before ? val : null,
                      })
                    }
                  >
                    <Option value="15 Min">15 Min</Option>
                    <Option value="30 Min">30 Min</Option>
                    <Option value="45 Min">45 Min</Option>
                    <Option value="60 Min">60 Min</Option>
                    {/* <Option value="Custom">Custom</Option> */}
                  </Select>
                </div>
                <div className="w-[50%] flex flex-col gap-0">
                  <div className="flex items-center">
                    <Checkbox
                      onChange={(e) => {
                        setGapChecked({
                          ...gapChecked,
                          gap_after: e.target.checked,
                        });
                      }}
                      checked={gapChecked.gap_after}
                    />
                    <label>Gap After</label>
                  </div>
                  <Select
                    disabled={!gapChecked?.gap_after}
                    size="sm"
                    value={gap_after}
                    onChange={(val) => {
                      setDetails({
                        ...details,
                        gap_after: gapChecked?.gap_after ? val : null,
                      });
                      setDetails({
                        ...details,
                        gap_after: !gapChecked?.gap_after && "",
                      });
                    }}
                  >
                    <Option value="15 Min">15 Min</Option>
                    <Option value="30 Min">30 Min</Option>
                    <Option value="45 Min">45 Min</Option>
                    <Option value="60 Min">60 Min</Option>
                  </Select>
                </div>
              </div>
              {/* </div> */}
            </div>
            <div className="head flex p-2 justify-between border">
              <div className="flex w-max items-end gap-4">
                <Button
                  onClick={handleBack}
                  className="rounded-sm"
                  size="sm"
                  variant="outlined"
                  color="black"
                >
                  Back
                </Button>
                {wait ? (
                  <Spinner />
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="rounded-sm"
                    size="sm"
                    color="blue"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
        {/*  */}
      </div>
    </>
  );
};



export default EventDetails;
