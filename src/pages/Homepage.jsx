import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="h-[calc(100dvh)] flex items-center md:justify-center gap-2 px-5 text-md">
      <div className="w-full md:w-1/2 gap-2 flex flex-col items-center text-center">
        <img src="/homepage.png" alt="logo jds" className="w-60" />
        <h1 className="text-4xl font-serif tracking-widest"> JDS Mart </h1>
        {/* <div className="flex flex-col items-center">
          <img
            src="/qrcode.png"
            alt="qr code"
            className="object-fill w-40 rounded-md "
          />
          <p className=" uppercase"> Scan Here</p>
        </div> */}
        <div className="flex flex-col ">
          <p className="">
            Dari <b>UMKM</b> untuk <b>Semua!</b>
          </p>
          <p className="text-sm text-gray-800">
            Menyediakan produk lokal yang unik dan berkualitas.
          </p>
        </div>

        <Link
          className="w-full md:w-1/2 h-12 my-7 text-center flex justify-center items-center rounded-lg border-2 text-white hover:bg-opacity-90 bg-primary "
          to={"list"}
        >
          Let's Get Started
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
