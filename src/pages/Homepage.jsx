import { Button } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="h-[calc(100dvh)] flex items-center md:justify-center gap-2 px-5 text-sm md:text-md dark:bg-black dark:text-white">
      <div className="w-full md:w-1/2 gap-2 flex flex-col items-center text-center">
        <img
          src="/homepage.png"
          alt="logo jds"
          className="w-full h-52 object-contain animate-opacity-open"
        />
        <h1 className="text-4xl font-[sans-serif] tracking-widest">
          {" "}
          JDS Mart{" "}
        </h1>
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
          <p className="text-sm text-gray-800 dark:text-white">
            Menyediakan produk lokal yang unik dan berkualitas.
          </p>
        </div>

        <Link
          className="w-full md:w-1/2 h-12 my-7 text-center flex justify-center items-center rounded-md"
          to={"list"}
        >
          <Button color="primary" className="w-full h-full">
            Mari Kita Mulai
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
