import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="h-[calc(100dvh)] flex flex-col justify-center items-center gap-10 bg-gray-50">
      <div className="flex flex-col items-center   gap-2">
        <h1 className="text-4xl font-serif tracking-widest">Price list </h1>
        <p className="text-md tracking-widest">
          Small and Medium enterprises (SMEs)
        </p>
      </div>
      <div className="flex justify-center">
        <img src="/logo_jds.png" alt="logo jds" className="w-60" />
      </div>
      <div className="flex items-center flex-col gap-1">
        <div className="flex flex-col items-center gap-1">
          <img
            src="/qrcode.png"
            alt="qr code"
            className="object-fill w-40 rounded-md "
          />
          <p className=" uppercase"> Scan Here</p>
        </div>
        <div className="relative flex py-5 w-full items-center">
          <div className="flex-grow border-t border-black border-2"></div>
          <span className="flex-shrink mx-4 ">OR</span>
          <div className="flex-grow border-t border-black border-2"></div>
        </div>
        <Link
          className="w-40 h-8 text-center flex justify-center items-center rounded-lg border-2 text-white hover:bg-opacity-90 bg-[#5D9F5D] "
          to={"list"}
        >
          Start
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
