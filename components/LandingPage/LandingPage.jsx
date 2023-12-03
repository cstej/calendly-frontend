import React, { useEffect, useState } from "react";
import WelcomePages from "./WelcomePages";
import VideoPage from "./VideoPage";
import IntegratePage from "./IntegratePage";
import Header from "./Header";
import Security from "./Security";
import LastFooter from "./LastFooter";
import api from "@/pages/api/api";

const LandingPage = () => {
  const [userData, setUserData] = useState([]);

  const fetchData = () => {
    api
      .get("/users/getLogedin")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header
        userName={userData?.name}
        logoSrc="https://assets.calendly.com/assets/frontend/media/logo-square-cd364a3c33976d32792a.png"
        appName="Scheduler"
      />
      <WelcomePages userName={userData?.name} userEmail={userData?.email} />
      <VideoPage />
      <IntegratePage />
      <Security />
      {/* <LastFooter/> */}
    </>
  );
};

export default LandingPage;
