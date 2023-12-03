import { Checkbox } from "@material-tailwind/react";
import React from "react";

const CheckBx = ({text="Enter you sentence"}) => {
  return (
    <div className="flex justify-start items-center">
      <Checkbox defaultChecked />
      <p>{text}</p>
    </div>
  );
};

export default CheckBx;
