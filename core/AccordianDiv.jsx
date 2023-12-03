import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import MapDiv from "@/components/Deshboard/ScheduleEvent/MapDiv";

export function AccordianDiv({ children, rederDiv }) {
  const [open, setOpen] = React.useState(0);
  // console.log("body", rederDiv);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          {children}
        </AccordionHeader>
        <AccordionBody>{rederDiv}</AccordionBody>
      </Accordion>
      {/* <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          How to use Material Tailwind?
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </Accordion> */}
    </>
  );
}
