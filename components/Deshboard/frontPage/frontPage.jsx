import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/navbar";
import Tabs from "../Tabs/tabs";
import SearchForm from "../SearchForm/searchForm";
import ListHeader from "../ListHeader/ListHeader";
import EventCard from "../EventCard/EventCard";
import ScheduleEvent from "../ScheduleEvent/ScheduleEvent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import api from "@/pages/api/api";
import UserAccount from "../UserAccount/UserAccount";
import Login from "../../../pages/Integration/Zoom/Login"
import Link from "next/link";

const FrontPage = () => {
  const [activeTab, setActiveTab] = useState("eventTypes");
  const [name, setName] = useState(" ");
  const [data, setData] = useState([]);
  const [fillData, setFilData] = useState([]);
  const [userData, setUserData] = useState([]);

  const tabItem = [
    { id: 1, label: "Home" },
    { id: 2, label: "Integrations" },
  ];
  const tabItems = [
    { id: "eventTypes", label: "Event Types" },
    { id: "scheduledEvents", label: "Scheduled Events" },
    { id: "workflows", label: "Workflows" },
    { id: "routing", label: "Routing" },
    { id: "zoom", label: "Connect To Zoom" },
  ];

  const GetData = () => {
    api
      .get("event/event_data")
      .then((res) => {
        setData(res.data);
        setFilData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetData();
    fetchData();
  }, []);

  const fetchData = () => {
    api
      .get("/users/getLogedin")
      .then((res) => {
        setUserData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();

  //   const searchData = searchQuery
  //     ? data.filter(
  //         (event) =>
  //           event.eventDetails[0]?.event_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //           (event.eventDetails[0]?.duration && event.eventDetails[0]?.duration.toLowerCase().includes(searchQuery.toLowerCase()))
  //       )
  //     : data;

  //   setData(searchData);
  // };

  const handleSearch = (e) => {
    const val = e.target.value;
    const searchData = data.filter(
      (item) =>
        item?.host_name.toLowerCase().includes(val.toLowerCase()) || //
        item?.eventDetails[0]?.event_name.toLowerCase().includes(val.toLowerCase())
    ); //
    // setData(searchData);
    setFilData(searchData);
  };

  return (
    <div>
      <UserAccount tabItems={tabItem} />
      <Navbar logoSrc="https://assets.calendly.com/assets/frontend/media/logo-square-cd364a3c33976d32792a.png" appName="Scheduler" />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabItems={tabItems} />
      {activeTab === "scheduledEvents" ? (
        <ScheduleEvent />
      ):
        activeTab === "zoom" ? (
          <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-1 shadow-lg rounded-md">
            <Login />
          </div>
        ) : (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-1 shadow-lg rounded-md">
          <SearchForm handleSearch={handleSearch} />
          <div className="p-3 flex flex-col md:flex-row items-center justify-between">
            <ListHeader userLogoSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVnCQdo0wqf1kBxqw8z2pwTxbN3Der4jmj6Q&usqp=CAU" userName={userData?.name} />
          </div>
          <DndProvider backend={HTML5Backend}>
            <div className="container mx-auto flex flex-wrap grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-[1200px] gap-4 p-3">
              {fillData?.map((ele, i) => (
                <EventCard key={i} {...ele} GetData={GetData} />
              ))}
            </div>
          </DndProvider>
        </div>
      )}
    </div>
  );
};

export default FrontPage;
