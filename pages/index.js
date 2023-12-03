"use client";
import Image from "next/image";
import { Inter } from "next/font/google";

import { useState } from "react";
import { GrNotes } from "react-icons/gr";
import { BiSolidRightArrow } from "react-icons/bi";
import Btn from "@/core/buttons/Btn";
import Link from "next/link";
import LandingPage from "@/components/LandingPage/LandingPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <LandingPage />
      {/* {" "}
      <div>
         <div className="w-[200px]">homepage</div>
        {" "}
        <Link href={"/login"}>
           <Btn Text="Login" color="orange" />
          {" "}
        </Link>
        {" "}
        <Link href={"/signup"}>
           <Btn Text="Signup" color="orange" />
          {" "}
        </Link>
        {" "} 
      </div>*/}
    </>
  );
}

// export async function getServerSideProps({ req, res, query }) {
//   const cookieToken = req.cookies.auth_token;

//   let shouldRedirect = redirectToLogin({ req, res, query });

//   if (shouldRedirect) return shouldRedirect;

//   return {
//     props: {
//       token: cookieToken,
//     },
//   };
// }
