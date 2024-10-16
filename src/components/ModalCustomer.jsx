import React, { useState } from "react";
import ModalCustom from "./ModalCustom";
import { storeCustomer } from "../repository/customer";
import { Flip, toast } from "react-toastify";

function ModalCustomer({
  setIsModalCustomer,
  isModalCustomer,
}) {
    const [customer, setCustomer] = useState("");
    const alert = () => {
        toast.success(`Thank You For Register`, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Flip,
    });
    }
    

  return (
    <ModalCustom
      modalIsOpen={isModalCustomer}
      closeModal={() => setIsModalCustomer(false)}
    >
      <div className="rounded-md w-full md:w-1/2 flex flex-col gap-2">
        <label htmlFor="customer">
let's get to know each other first</label>
        <input
          type="text"
          id="customer"
          className="w-full h-10 p-2 text-sm outline-primary outline-double rounded-md"
          placeholder="Please Enter Your Name"
          min={3}
          onChange={(e) => setCustomer(e.target.value)}
          required
        />
        <button
          className="bg-primary text-white rounded-lg"
          onClick={() => {
            if (!customer) return;
            storeCustomer(customer);
            setCustomer("");
            alert()
            setIsModalCustomer(false);
            
          }}
        >
          Save
        </button>
      </div>
    </ModalCustom>
  );
}

export default ModalCustomer;
