import FrontPage from "@/components/Deshboard/frontPage/frontPage";
import React from "react";

const Dashboard = () => {
  return (
    <FrontPage/>
  )
};

export default Dashboard;

//private route func
export const getServerSideProps = async ({ req, res }) => {
  let cookieStore = req?.cookies?.token;
  if (!cookieStore) {
    return {
      redirect: {
        destination: "/login",
        parmanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
