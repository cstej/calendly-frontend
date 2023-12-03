"use client";
import { Button } from "@material-tailwind/react";
import React from "react";

const Btn = ({
  textClass="",
  Text = "Text here",
  loading=false,
  round = "lg",
  type = "button",
  icon,
  color = "blue",
  variant = "filled",
  disabled=false ,
  btnFunction,
  size="md"
}) => {
  return (
    <Button
      onClick={btnFunction}
      type={type}
      className={`${round ? round : "lg"} `}
      style={{backgroundColor : color}} 
      variant={variant}
      size={size}
      disabled={loading}
    >
      <div className="flex gap-2 items-center justify-center">
        <p className={`${textClass}`}>{Text}</p>
       {icon}
      </div>
    </Button>
  );
};

export default Btn;