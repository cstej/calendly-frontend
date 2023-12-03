import React from "react";
import { Button, Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";

export function DeleteModal({ open, handleOpen, title, handleClick, value }) {
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
        Are you sure you want to {title} this {value}?
      </DialogBody>
      <DialogFooter>
        <Button variant="text" onClick={handleOpen} className="mr-1 border-2 border-blue-300 bg-[#eeeeee] hover:border-blue-500 transition-all duration-400">
          <span>Cancel</span>
        </Button>
        <Button variant="text" className={`${title === "Delete" ? "bg-red-300 hover:bg-red-500" : "bg-green-300 hover:bg-green-400"} transition-all duration-400`} onClick={handleClick}>
          <span>{title === "Delete" ? "Delete" : "Confirm"}</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
