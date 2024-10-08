import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-24">
      <div className="flex flex-col items-center text-white  gap-2">
        <h1 className="text-4xl">Welcome Back</h1>
        <p className="text-xl">Pricelist UMKM JDS</p>
      </div>
      <div className="flex justify-center">
        <img
          src="/logo_jds.png"
          alt="logo jds"
          className="rounded-lg"
          width={200}
        />
      </div>
      <div className="flex justify-center">
        <Link
          className="w-52  h-10 text-center flex justify-center items-center rounded-lg bg-blue-600 text-white"
          to={"list"}
        >
          Start
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
