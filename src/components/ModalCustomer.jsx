import React, { useEffect, useState } from "react";
import ModalCustom from "./ModalCustom";
import { getCustomer, storeCustomer } from "../repository/customer";
import { Flip, toast } from "react-toastify";

function ModalCustomer({ setIsModalCustomer, isModalCustomer }) {
  const [form, setForm] = useState({
    customer: "",
    telegram: "",
  });
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    const { customer, telegram } = getCustomer();
    setForm({
      customer: customer ?? "",
      telegram: telegram ?? "",
    });
  }, [isModalCustomer]);

  const alert = (status, message) => {
    toast[status](message, {
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
    storeCustomer(form);
    alert("success", "Registrasi berhasil");
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
        className="rounded-md flex flex-col gap-2 items-center text-sm w-full"
      >
        <p className="text-md font-bold">Registrasi Pembeli</p>
        <div className="w-full md:w-1/2 flex flex-col gap-2 my-3">
          <label htmlFor="customer">Nama Lengkap - Divisi</label>
          <input
            type="text"
            id="customer"
            name="customer"
            className="w-full  h-8 p-2 text-sm outline-primary outline-double rounded-md"
            placeholder="Nama Lengkap - Divisi"
            min={3}
            defaultValue={form.customer}
            onChange={(e) => {
              setForm({ ...form, customer: e.target.value });
              setIsChange(true);
            }}
            required
          />
          <span className="text-xs text-red-500">
            {!form.customer && isChange && "Nama Lengkap - Divisi harus diisi"}
          </span>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-2 justify-start">
          <label htmlFor="telegram">Username Telegram</label>
          <input
            type="text"
            id="telegram"
            name="telegram"
            className="w-full h-8 p-2 text-sm outline-primary outline-double rounded-md"
            placeholder="Username Telegram"
            min={3}
            defaultValue={form.telegram}
            onChange={(e) => {
              setForm({ ...form, telegram: e.target.value.replace("@", "") });
              setIsChange(true);
            }}
            required
          />
        </div>
        <span className="text-xs text-red-500 w-full md:w-1/2">
          {!form.telegram && "Username Telegram harus diisi"}
        </span>
        <div className="md:w-1/2 w-full flex flex-col my-4 text-xs italic gap-1">
          <span>
            *) Username Telegram akan digunakan untuk konfirmasi pesanan
          </span>
          <span>
            *) Form Registrasi Pembeli ini berlaku hanya sementara waktu
          </span>
        </div>
        <button
          type="submit"
          className="bg-primary text-white rounded-md h-8 w-1/2"
        >
          Simpan
        </button>
      </form>
    </ModalCustom>
  );
}

export default ModalCustomer;
