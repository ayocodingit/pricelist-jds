import React, { useState } from "react";
import { getCustomer } from "../repository/customer";
import ModalCustomer from "./ModalCustomer";

function Profile() {
    const [isModalCustomer, setIsModalCustomer] = useState(false);
  return (
    <>
      {getCustomer() && (
        <div onClick={() => setIsModalCustomer((prev) => !prev)} title="edit username"  className=" hover:cursor-pointer  absolute top-3 md:right-[30%] z-20 right-5 p-2 gap-2 bg-white text-black shadow-lg flex items-center rounded-md text-sm px-2">
          <span>Hai! {getCustomer().username} 👋🏻</span> 
        </div>
      )}
      <ModalCustomer
        setIsModalCustomer={setIsModalCustomer}
        isModalCustomer={isModalCustomer}
      />
    </>
  );
}

export default Profile;
