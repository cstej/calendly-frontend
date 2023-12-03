//
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Select, Option, Input, Textarea } from "@material-tailwind/react";
import { Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
const LocationModal = ({ change, setChange, setDetails, open, setOpen, details }) => {
  const handleOpen = () => {
    setOpen(!open);
  };
  const [adi, setAdi] = useState(false);

  const [locationNameErr, setLocationNameErr] = useState("");
  const [mobileNumberErr, setMobileNumberEr] = useState("");

  const handleChange = (e) => {
    const val = e;
    setChange(!change);
    setDetails({ ...details, location_type: val });
  };

  const l_nameValidation = () => {
    let isValid = true;
    if (!details?.location_name) {
      setLocationNameErr("Physical location is required.");
      isValid = false;
    } else {
      setLocationNameErr("");
    }

    return isValid;
  };
  const mobile_nameValidation = () => {
    let isValid = true;
    if (!details?.mobile_number) {
      setMobileNumberEr("Mobile Number is required.");
      isValid = false;
    } else {
      setMobileNumberEr("");
    }

    return isValid;
  };

  const handleChange2 = (e) => {
    let val = e.target.value;
    setDetails({ ...details, [e.target.name]: val });

    if (e.target.name == "location_name") {
      setLocationNameErr("");
    } else if (e.target.name == "mobile_number") {
      setMobileNumberEr("");
    }
  };

  const locationTypeCheckValidation = () => {
    if (details?.location_type == "inperson") {
      setDetails({ ...details, mobile_number: "", call_option: "" });
    } else if (details?.location_type == "phonecall") {
      setDetails({ ...details, location_name: "" });
    }
  };

  const handleUpdate = () => {
    if (details?.location_type == "inperson" && l_nameValidation()) {
      setDetails({ ...details });
      handleOpen();
    } else if (details?.location_type == "phonecall" && (mobile_nameValidation() || details?.call_option == "callMyInvitee")) {
      setDetails({ ...details });
      handleOpen();
    }
  };

  useEffect(() => {
    locationTypeCheckValidation();
  }, [change]);

  return (
    <>
      {/* <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button> */}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Edit Location .</DialogHeader>

        <DialogBody className="flex justify-center">
          <div className="flex w-[90%] flex-col gap-5">
            <Select size="lg" label="Select Version" onChange={handleChange} value={details?.location_type}>
              <Option className="flex items-center gap-3" value="inperson">
                <div className="flex gap-x-3">
                  <span>
                    <MdLocationPin className="text-purple-600 text-[18px]" />
                  </span>
                  <span>
                    In-Person-Meeting
                    {details?.location_type === "inperson" ? null : <p className="text-[10px]">Select an address or place</p>}
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
                    {details?.location_type === "phonecall" ? null : <p className="text-[10px]">Inbound or Outbound Calls</p>}
                  </span>
                </div>
              </Option>
            </Select>

            {details?.location_type == "inperson" ? (
              <>
                <div className="inputbx">
                  <Input name="location_name" value={details?.location_name} onChange={handleChange2} label="Physical location" />
                  {locationNameErr && <span className="text-red-500 text-xs">{locationNameErr}</span>}
                </div>

                {/* Textarea link */}
                {!adi ? (
                  <div className="inputbx">
                    <Link className="cursor-pointer" onClick={() => setAdi(true)}>
                      + Include additional information
                    </Link>
                  </div>
                ) : null}

                {/* Text Area */}
                {adi ? (
                  <div className="inputbx">
                    <Textarea onChange={handleChange2} value={details?.location_desc} name="location_desc" label="Additional Information" />
                  </div>
                ) : null}
              </>
            ) : details?.location_type == "phonecall" ? (
              <div className="p-4">
                {/*  */}
                <div className="flex items-center mb-4">
                  <div>
                    <input type="radio" id="callMyInvitee" name="call_option" value="callMyInvitee" checked={details?.call_option === "callMyInvitee"} onChange={handleChange2} className="mr-2" />
                  </div>

                  <div className="flex flex-col ">
                    <label htmlFor="callMyInvitee" className="font-bold">
                      I will call my invitee
                    </label>
                    <label htmlFor="callMyInvitee" className="cursor-pointer">
                      Calendly will require your invitee’s phone number before scheduling.
                    </label>
                  </div>
                </div>

                <div className="flex items-center">
                  <div>
                    <input type="radio" id="inviteeCallMe" name="call_option" value="inviteeCallMe" checked={details?.call_option === "inviteeCallMe"} onChange={handleChange2} className="mr-2" />
                  </div>

                  <div className="flex flex-col cursor-pointer">
                    <label htmlFor="inviteeCallMe" className="font-bold">
                      My invitee should call me
                    </label>
                    <label htmlFor="inviteeCallMe" className="cursor-pointer">
                      Calendly will provide your number after the call has been scheduled.
                    </label>
                  </div>
                </div>
                {/*  */}
              </div>
            ) : null}
            {/* Checkbox */}

            {/*  */}
            {details?.location_type == "phonecall" && details?.call_option == "inviteeCallMe" ? (
              <div className="inputbx">
                <Input name="mobile_number" value={details?.mobile_number} onChange={handleChange2} label="Your Number" error={!details?.mobile_number} success={details?.mobile_number} />
                {mobileNumberErr && <span className="text-red-500 text-xs">{mobileNumberErr}</span>}
              </div>
            ) : null}
          </div>
        </DialogBody>

        <DialogFooter>
          <Button variant="outlined" color="black" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={handleUpdate}>
            <span>Update</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default LocationModal;
