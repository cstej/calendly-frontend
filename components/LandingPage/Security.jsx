import Image from "next/image";
import React from "react";
import { BsCheck2Circle } from "react-icons/bs";

const Security = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row gap-8 justify-center">
        <div className="flex items-center lg:h-[500px] lg:w-[500px]">
          <Image height={500} width={500} src="https://images.ctfassets.net/k0lk9kiuza3o/6OY9nmzDM7LL8JncxCC8AR/719f6900b0158c6a07b602ffb937f243/Calendly-Secure-IT-4-Desktop.png?w=1140&h=930&q=85&fm=webp" alt="Security Image" className="w-full" />
        </div>
        <div className="flex flex-col gap-6 items-start lg:h-[500px] lg:w-[500px]">
          <h1 className="text-4xl font-bold text-black mt-10 ml-2">The security and oversight your IT team needs</h1>
          <div className="flex items-center ml-2">
            <div className="flex flex-row">
              <BsCheck2Circle size={40} />
              <div className="flex flex-col ml-4">
                <h2 className="text-xl font-semibold lg:text-2xl">Centralize billing</h2>
                <h3 className="text-sm lg:text-base">Hundreds of coworkers use Calendly – bring them all together in one secure, managed account.</h3>
              </div>
            </div>
          </div>
          <div className="flex items-center ml-2">
            <div className="flex flex-row">
              <BsCheck2Circle size={40} />
              <div className="flex flex-col ml-4">
                <h2 className="text-xl font-semibold lg:text-2xl">Secure your Calendly usage</h2>
                <h3 className="text-sm lg:text-base">Single-sign-on, SCIM, and more make it easy to onboard/offboard users, mandate passwords, and more.</h3>
              </div>
            </div>
          </div>
          <div className="flex items-center ml-2">
            <div className="flex flex-row">
              <BsCheck2Circle size={40} />
              <div className="flex flex-col ml-4">
                <h2 className="text-xl font-semibold lg:text-2xl">Standardize how your teams use Calendly</h2>
                <h3 className="text-sm lg:text-base">Manage how your coworkers create meeting types, send consistent reminders, and adhere to brand standards.</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
