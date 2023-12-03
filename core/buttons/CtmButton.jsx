import React from "react";
import BtnLoader from "./BtnLoader";

const CtmButton = ({
  CtmclassName,
  type = "button",
  text,
  textClass = "",
  handler,
  loading = false,
  icon,
}) => {
  return (
    <button
      type={type}
      onClick={handler}
      disabled={loading}
      className={` h-auto py-[7px] -pr-2 w-auto ${CtmclassName} `}
    >
      <div className="flex justify-center items-center gap-x-2">
        {loading ? (
          <BtnLoader />
        ) : (
          <div className="flex justify-center items-center gap-2">
            {icon}
            <p className={`${textClass}`}>{text}</p>
          </div>
        )}
      </div>
    </button>
  );
};

export default CtmButton;
