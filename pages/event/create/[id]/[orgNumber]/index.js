"use client";
import api from "@/pages/api/api";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import EventDetails from "../../../../../components/event/EventDetails/EventDetails";

const Index = () => {
  return (
    <>
      <EventDetails />
    </>
  );
};

export default Index;
