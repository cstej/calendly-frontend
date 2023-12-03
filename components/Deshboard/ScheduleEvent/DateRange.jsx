import React, { useState } from "react";
import Button from "@mui/material/Button";
import { DateRange, DateRangePicker } from "react-date-range";

import "react-date-range/dist/styles.css"; // Styles for the date range picker
import "react-date-range/dist/theme/default.css";

const DateRanges = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDateRangeChange = (ranges) => {
    const newStartDate = ranges.selection.startDate;
    const newEndDate = ranges.selection.endDate;

    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <div className=" flex item-center justify-center w-full bg-gray-100 border mt-10 p-6 space-x-4">
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <Button variant="text" className="w9Au8ZoZxWn2JnXwS2UT">
            Today
          </Button>
          <Button variant="text">This week</Button>
          <Button variant="text">This month</Button>
          <Button variant="text">All time</Button>
        </div>
        <div className="flex ">
          {/* <DateRange className=" w-[25%] h-[50%] border-b-2 bg-red-400  border-blue-gray-50" /> */}
          <DateRange
            editableDateInputs={true}
            onChange={handleDateRangeChange}
            direction="vertical"
            moveRangeOnFirstSelection={false}
            ranges={[{ startDate, endDate, key: "selection" }]}
          />
        </div>
        <div>
          <div className="flex space-x-4">
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained">Apply</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRanges;
