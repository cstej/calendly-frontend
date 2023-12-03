import { Input } from "@material-tailwind/react";
import React from "react";

const InpLabel = ({
  onChange,
  value,
  type = "text",
  placeholder = "placeholder",
  upperCase = false,
  title="enter title",
  TxtClass = "text-[13px]"
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <p className={`${TxtClass}`}>{title}</p>
      <div className="w-full mt-[1px]">
        <Input
          onChange={onChange}
          value={value}
          type={type}
          placeholder={placeholder}
          className={`!border !border-gray-500 rounded-sm ${
            upperCase && "uppercase"
          } bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none `}
          labelProps={{
            className: "hidden",
          }}
          containerProps={{ className: "h-[35px] min-w-[100px]" }}
        />
      </div>
    </div>
  );
};

export default InpLabel;
