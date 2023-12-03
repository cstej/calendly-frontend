"use client";
import { Input } from "@material-tailwind/react";
import React from "react";

const InputBox = ({
  color = "blue",
  label = false,
  onChange,
  value,
  type="text",
  defaultValue="",
  readOnly=false,
  placeholder = "",
  variant="outlined"
}) => {
  return (
    <Input type={type} variant={variant} color={color} readOnly={readOnly} placeholder={placeholder} className="focus:ring-0 focus:ring-offset-0" label={label} value={value} onChange={onChange} defaultValue={defaultValue} />
  );
};

export default InputBox;