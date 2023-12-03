import React from "react";

const VideoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-2 text-xl text-blue-600">
        <h1> GET STARTED</h1>
      </div>
      <div className="p-3 text-5xl text-indigo-800">
        <h1> Get way more out of Calendly</h1>
      </div>
      <div className="p-3 text-md text-black">
        <p>{"In this 1-minute video, you'll learn about everything you can do with Calendly and why it's so much more than a scheduling tool."}</p>
      </div>
      <div className="p-2" style={{ borderRadius: "40px", overflow: "hidden", maxWidth: "1000px", width: "100%" }}>
        <iframe style={{ width: "100%", height: "500px", border: "0" }} src="https://www.youtube.com/embed/S3B3KPidDd0" frameBorder="0" allowFullScreen></iframe>
      </div>
    </div>
  );
};

export default VideoPage;
