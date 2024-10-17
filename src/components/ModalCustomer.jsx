import React, { useEffect, useState } from "react";
import ModalCustom from "./ModalCustom";
import { getCustomer, storeCustomer } from "../repository/customer";
import { Flip, toast } from "react-toastify";

function ModalCustomer({ setIsModalCustomer, isModalCustomer }) {
  const [customer, setCustomer] = useState("");

  useEffect(() => {
    setCustomer(getCustomer()?.customer || "");
  }, [isModalCustomer]);

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer) return;
    storeCustomer({ customer, isOpen: true });
    setCustomer("");
    alert();
    setIsModalCustomer(false);
  };

  return (
    <ModalCustom
      modalIsOpen={isModalCustomer}
      closeModal={() => setIsModalCustomer(false)}
    >
      <form
        action="#"
        onSubmit={handleSubmit}
        className="rounded-md flex flex-col gap-2 items-center"
      >
        <label htmlFor="customer" className="text-sm">
          Silakan masukan data diri anda untuk melakukan pemesanan
        </label>
        <input
          type="text"
          id="customer"
          className="w-full h-8 p-2 text-sm outline-primary outline-double rounded-md"
          placeholder="Please Enter Your Name"
          min={3}
          onChange={(e) => setCustomer(e.target.value)}
          defaultValue={customer}
          required
        />
        <button
          type="submit"
          className="bg-primary text-white rounded-lg w-1/2"
        >
          Save
        </button>
      </form>
    </ModalCustom>
  );
}

export default ModalCustomer;
