import React from "react";
import { Button, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";

export function LogOutModal({ open, handleOpen, title, handleClick }) {
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size="xs"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogBody className="mt-2 text-black">
        Are you sure you want to Log-Out?
      </DialogBody>
      <DialogFooter>
        <Button variant="text" onClick={handleOpen} className="mr-1 border-2 border-blue-300 bg-[#eeeeee] hover:border-blue-500 transition-all duration-400">
          <span>Cancel</span>
        </Button>
        <Button variant="text" className={`${title === "Logout" ? "bg-blue-600 hover:bg-blue-800" : "bg-green-300 hover:bg-green-400"} transition-all duration-400`} onClick={() => {
            handleClick();
            handleOpen(); // Close the modal after handling the click
          }}>
          <span>{title === "Logout" ? "Logout" : "Confirm"}</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
