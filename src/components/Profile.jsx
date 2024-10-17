import React, { useEffect, useState } from "react";
import { getCustomer, storeCustomer } from "../repository/customer";
import ModalCustomer from "./ModalCustomer";
import { AiOutlineUser } from "react-icons/ai";

function Profile() {
  const [isModalCustomer, setIsModalCustomer] = useState(false);
  const [isAction, setIsAction] = useState(false);

  useEffect(() => {
    setIsAction(false);
  }, [isAction, isModalCustomer]);
  return (
    <>
      {!isAction && getCustomer() && getCustomer().isOpen && (
        <div className="absolute bottom-[50%] md:right-[26%] z-20 right-5 p-2 gap-2 bg-white text-black shadow-lg flex items-center rounded-md text-sm px-2">
          <span
            onClick={() => setIsModalCustomer((prev) => !prev)}
            title="edit username"
            className="hover:cursor-pointer "
          >
            Hai! {getCustomer().customer} 👋🏻
          </span>
          <span
            className="hover:cursor-pointer "
            onClick={() => {
              setIsAction(true);
              storeCustomer({
                ...getCustomer(),
                isOpen: !getCustomer().isOpen,
              });
            }}
          >
            x
          </span>
        </div>
      )}
      {!isAction && getCustomer() && !getCustomer().isOpen && (
        <div className=" hover:cursor-pointer  absolute bottom-[50%] md:right-[26%] z-20 right-5 p-2 gap-2 bg-white text-black shadow-lg flex items-center rounded-md text-sm px-2">
          <AiOutlineUser
            className="text-xl"
            onClick={() => {
              setIsAction(true);
              storeCustomer({
                ...getCustomer(),
                isOpen: !getCustomer().isOpen,
              });
            }}
          />
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
