import React from "react";
import { TailSpin } from "react-loader-spinner";

const BtnLoader = ({color = "#FFFFFF" ,height = "15" , width = "15"}) => {
  return (
    <TailSpin
      height={height}
      width={height}
      color={color}
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default BtnLoader;