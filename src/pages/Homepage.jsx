import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-24">
      <div className="flex flex-col items-center text-white  gap-2">
        <h1 className="text-3xl font-serif tracking-widest">Price list </h1>
        <p className="text-md tracking-widest">Small and Medium enterprises (SMEs)</p>
      </div>
      <div className="flex justify-center">
        <img
          src="/logo_jds.png"
          alt="logo jds"
          width={250}
        />
      </div>
      <div className="flex justify-center">
        <Link
          className="w-40 h-8 text-center flex justify-center items-center rounded-lg bg-blue-600 text-white"
          to={"list"}
        >
          Start
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
