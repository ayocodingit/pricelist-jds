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
      {!isAction && getCustomer() && (
        <>
          <div className="fixed bottom-[50%] md:right-[26%] z-20 right-5 p-2 gap-2 bg-white border-2 border-primary text-black flex items-center rounded-md text-sm">
            <div
              className={`flex items-center ${getCustomer().isOpen && "gap-2"}`}
            >
              <span>{getCustomer().isOpen && getCustomer().customer}</span>
              <AiOutlineUser
                className="text-xl hover:cursor-pointer"
                onClick={() => {
                  setIsAction(true);
                  storeCustomer({
                    ...getCustomer(),
                    isOpen: !getCustomer().isOpen,
                  });
                }}
              />
            </div>

            <ModalCustomer
              setIsModalCustomer={setIsModalCustomer}
              isModalCustomer={isModalCustomer}
            />
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
