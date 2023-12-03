import React from "react";
import { Input } from "@material-tailwind/react";

const NormalInput = ({
    onChange,
    value,
    type = "text",
    placeholder = "placeholder",
    upperCase = false,
  }) => {
  return (
    <div
      className="w-full"
    >
      <Input
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        className={`!border !border-gray-300 rounded-sm ${upperCase && "uppercase"} bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none `}
        labelProps={{
          className: "hidden",
        }}
        containerProps={{ className: "h-[35px] min-w-[100px]" }}
      />
    </div>
  );
};

export default NormalInput;
