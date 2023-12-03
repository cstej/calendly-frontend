import api from "@/pages/api/api";
import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogBody, DialogFooter, Input, Option, Select, Spinner, Textarea } from "@material-tailwind/react";
import { MdLocationPin } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { DateRange } from "react-date-range";
import { Checkbox } from "@nextui-org/react";
import LocationModal from "../EventDetails/Modal/LocationModal";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const EventUpdateModal = ({ open, handleOpen }) => {
  const router = useRouter();
  const { id, orgNumber } = router?.query;
  const [caseNum, setCaseNum] = useState(1);
  const [wait, setWait] = useState(false);

  const [loading, setLoading] = useState(false);

  const [meet_time, setMeetTime] = useState({});

  const [customTable, setCustomTable] = useState(true);
  const [days, setDays] = useState(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);

  const [gapChecked, setGapChecked] = useState({ gap_after: false, gap_before: false });
  const { gap_after, gap_before } = gapChecked;
  const [change, setChange] = useState(false);

  const [details, setDetails] = useState([]);
  const [open2, setOpen2] = useState(false);

  const [startDate, setStartDate] = useState(details?.date_range?.end);
  const [endDate, setEndDate] = useState(details?.date_range?.end);

  //
  const handleStartTimeChange = (day, index, value) => {
    const updatedMeetTimes = { ...meet_time?.meet_time };
    updatedMeetTimes[day.toLowerCase()][index].start = value;

    // Update the meet_time property in details
    setDetails((prevDetails) => ({
      ...prevDetails,
      meet_time: updatedMeetTimes,
    }));
  };

  const handleEndTimeChange = (day, index, value) => {
    const updatedMeetTimes = { ...meet_time?.meet_time };
    updatedMeetTimes[day.toLowerCase()][index].end = value;

    // Update the meet_time property in details
    setDetails((prevDetails) => ({
      ...prevDetails,
      meet_time: updatedMeetTimes,
    }));
  };

  const addCustomTime = (day) => {
    const updatedMeetTimes = { ...meet_time?.meet_time };

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
    const updatedMeetTimes = { ...meet_time?.meet_time };
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

  const getDataForUpdate = () => {
    setWait(true);
    api
      .get(`event/get_details/${id}/${orgNumber}`)
      .then((res) => {
        setWait(false);
        setDetails(res?.data);
      })
      .catch((err) => {
        console.log(err);
        setWait(false);
      });
  };

  const getMeetTime = () => {
    api
      .get(`/meet/get_meet_time/${id}`)
      .then((res) => {
        setMeetTime(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (id && orgNumber) {
      getDataForUpdate();
      getMeetTime();
    }
  }, [id, orgNumber]);

  const formateDate = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date?.getMonth()];
    const formattedDate = `${month} ${date.getDate()} ${date.getFullYear()}`;
    return formattedDate;
  };

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

  const handleChange2 = (e) => {
    const val = e;
    setDetails({ ...details?.location, location_type: val });
    setOpen2(true);
    setChange(!change);

    // if (val) {
    //   seteEventLocationErr("");
    // }
  };

  const handleUpdate = () => {
    // console.log(details);
    setLoading(true);
    api
      .patch(`/event/update/${details?.event_id}`, { ...details, meet_time })
      .then((res) => {
        handleOpen();
        setLoading(false);
        setCaseNum(1);
        toast.success("Schedule updated successfully !!");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <Dialog
        className="z-120 "
        open={open}
        handler={handleOpen}
        size="lg"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        {wait ? (
          <Spinner />
        ) : (
          <>
            <div className="overflow-y-scroll h-[500px]">
              <DialogBody className="mt-2 text-black ">
                <LocationModal change={change} setChange={setChange} details={details} setDetails={setDetails} open={open2} setOpen={setOpen2} />
                {caseNum == 1 && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Input label="Event Name" value={details?.event_name} />
                    </div>
                    {/*  */}
                    <div className="flex flex-col gap-2">
                      <Select size="lg" label="Select Version" onChange={handleChange2} name="location_type" value={details?.location?.location_type}>
                        <Option className="flex items-center gap-3" value="inperson">
                          <div className="flex gap-x-3">
                            <span>
                              <MdLocationPin className="text-purple-600 text-[18px]" />
                            </span>
                            <span>
                              In-Person-Meeting
                              {details?.location?.location_type === "inperson" ? null : <p className="text-[10px]">Select an address or place</p>}
                            </span>
                          </div>
                        </Option>

                        <Option className="flex items-center gap-3" value="phonecall">
                          <div className="flex gap-x-3">
                            <span>
                              <BsTelephoneFill className="text-blue-500" />
                            </span>
                            <span>
                              Phone Call
                              {details?.location?.location_type === "phonecall" ? null : <p className="text-[10px]">Inbound or Outbound Calls</p>}
                            </span>
                          </div>
                        </Option>
                      </Select>

                      {details?.location?.mobile_number || details?.location?.location_name ? (
                        <div className="flex items-center ">
                          <Input value={details?.location?.mobile_number || details?.location?.location_name} disabled />
                        </div>
                      ) : null}
                    </div>
                    {/*  */}
                    <div>
                      <Textarea label="Description" value={details?.desc} />
                    </div>
                    <div>
                      <Input onChange={(e) => setDetails({ ...details, event_color: e.target.value })} type="color" label="Color" value={details?.event_color} />
                    </div>
                  </div>
                )}
                {caseNum == 2 && (
                  <div className="flex gap-5 large:grid-cols-2 medium:grid-cols-2 small:grid-cols-1 justify-between">
                    <div classname="bg-green-500 w-[35%]">
                      <DateRange editableDateInputs={true} onChange={handleDateRangeChange} moveRangeOnFirstSelection={false} ranges={[{ startDate, endDate, key: "selection" }]} />
                      {/* <Input readOnly label="Date Range" value={formateDate(startDate) + " - " + formateDate(endDate)} /> */}
                    </div>

                    <div className="grid w-[75%] h-max gap-5 grid-col-2">
                      {/*  */}
                      <div>
                        <Checkbox
                          onChange={(e) => {
                            setGapChecked({ ...gapChecked, gap_before: e.target.checked });
                            setDetails({ ...details, gap_before: !gapChecked?.gap_before && "" });
                          }}
                          checked={gapChecked?.gap_before}
                        />
                        <label>Gap Before</label>
                        <Select disabled={!gapChecked?.gap_before} size="sm" value={gap_before} onChange={(val) => setDetails({ ...details, gap_before: gapChecked.gap_before ? val : null })}>
                          <Option value="15 Min">15 Min</Option>
                          <Option value="30 Min">30 Min</Option>
                          <Option value="45 Min">45 Min</Option>
                          <Option value="60 Min">60 Min</Option>
                          {/* <Option value="Custom">Custom</Option> */}
                        </Select>
                      </div>
                      {/*  */}
                      <div>
                        <Checkbox
                          onChange={(e) => {
                            setGapChecked({ ...gapChecked, gap_after: e.target.checked });
                          }}
                          checked={gapChecked.gap_after}
                        />
                        <label>Gap After</label>
                        <Select
                          disabled={!gapChecked?.gap_after}
                          size="sm"
                          value={gap_after}
                          onChange={(val) => {
                            setDetails({ ...details, gap_after: gapChecked?.gap_after ? val : null });
                            setDetails({ ...details, gap_after: !gapChecked?.gap_after && "" });
                          }}
                        >
                          <Option value="15 Min">15 Min</Option>
                          <Option value="30 Min">30 Min</Option>
                          <Option value="45 Min">45 Min</Option>
                          <Option value="60 Min">60 Min</Option>
                        </Select>
                      </div>
                      <div>
                        <Select
                          value={details?.duration}
                          label="Duration"
                          onChange={(val) => {
                            setDetails({ ...details, duration: val });
                            // setDurationErr("");
                          }}
                        >
                          <Option value="15 Min">15 Min</Option>
                          <Option value="30 Min">30 Min</Option>
                          <Option value="45 Min">45 Min</Option>
                          <Option value="60 Min">60 Min</Option>
                          {/* <Option value="Custom">Custom</Option> */}
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
                {caseNum == 3 && customTable ? (
                  // <div className="flex flex-col gap-2 ">
                  <div className="grid gap-2 grid-cols-2 ">
                    {days.map((day) => (
                      <div key={day} className="flex justify-start border items-center p-2 rounded">
                        <span className="font-bold mr-4">{day}</span>
                        <div className="flex gap-2 flex-col items-start">
                          {meet_time?.meet_time[day?.toLowerCase()]?.length > 0 ? (
                            meet_time?.meet_time[day?.toLowerCase()].map((time, index) => (
                              <div key={index} className="flex gap-2 flex-col">
                                <div className="flex  gap-2 items-center" key={index}>
                                  <input type="text" placeholder="Start Time" value={time?.start} onChange={(e) => handleStartTimeChange(day, index, e.target.value)} className="border rounded px-2 py-1 w-[20%]" />
                                  <input type="text" placeholder="End Time" value={time?.end} onChange={(e) => handleEndTimeChange(day, index, e.target.value)} className="border rounded px-2 py-1 w-[20%]" />
                                  <Button size="sm" variant="outlined" color="red" onClick={() => deleteCustomTime(day, index)}>
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <span>Unavailable</span>
                          )}
                          <Button size="sm" color="black" variant="outlined" onClick={() => addCustomTime(day)}>
                            +
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
                {/*  */}
              </DialogBody>
            </div>
            <DialogFooter>
              {caseNum > 1 && (
                <Button size="sm" variant="text" onClick={() => setCaseNum(caseNum - 1)} className="mr-3">
                  Back
                </Button>
              )}
              {/* {(caseNum >= 1 || caseNum < 2) && (
                <Button onClick={() => setCaseNum(caseNum + 1)} size="sm" variant="outlined" color="black">
                  Next
                </Button>
              )} */}
              {caseNum > 2 ? (
                <Button size="sm" color="blue" onClick={handleUpdate}>
                  {loading ? <Spinner /> : "Update"}
                </Button>
              ) : (
                <Button onClick={() => setCaseNum(caseNum + 1)} size="sm" variant="outlined" color="black">
                  Next
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </Dialog>
    </>
  );
};

export default EventUpdateModal;
