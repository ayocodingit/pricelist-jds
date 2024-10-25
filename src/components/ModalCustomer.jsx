import React from "react";
import ModalCustom from "./ModalCustom";
import { getCustomer, storeCustomer } from "../repository/customer";
import { Flip, toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";

function ModalCustomer({ setIsModalCustomer, isModalCustomer }) {
  const { customer, telegram } = getCustomer();

  const formik = useFormik({
    initialValues: {
      customer: customer ?? "",
      telegram: telegram ?? "",
    },
    validateOnMount: true,
    onSubmit: (values) => {
      storeCustomer(values);
      formik.resetForm();
      alert("success", "Registrasi berhasil");
      setIsModalCustomer(false);
    },
    validationSchema: yup.object().shape({
      customer: yup.string().min(3).required().label('Nama Lengkap - Divisi'),
      telegram: yup
        .string()
        .min(3)
        .required()
        .label('akun telegram'),
    }),
  });

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

  return (
    <ModalCustom
      modalIsOpen={isModalCustomer}
      closeModal={() => setIsModalCustomer(false)}
    >
      <form
        action="#"
        onSubmit={formik.handleSubmit}
        className="rounded-md flex flex-col gap-1 items-center text-sm w-full"
      >
        <p className="text-md font-bold">Registrasi Pembeli</p>
        <div className="w-full md:w-1/2 flex flex-col gap-2 my-3">
          <label htmlFor="customer">Nama Lengkap - Divisi</label>
          <input
            type="text"
            id="customer"
            name="customer"
            className={`w-full  h-8 p-2 text-sm outline-double rounded-md ${
              formik.errors.customer ? "outline-red-500" : "outline-primary"
            }`}
            placeholder="Nama Lengkap - Divisi"
            {...formik.getFieldProps("customer")}
          />
          <span className="first-letter:capitalize italic text-xs text-red-500">
            {formik.errors.customer}
          </span>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-2 justify-start">
          <label htmlFor="telegram">Akun Telegram</label>
          <input
            type="text"
            id="telegram"
            name="telegram"
            className={`w-full  h-8 p-2 text-sm outline-double rounded-md ${
              formik.errors.telegram ? "outline-red-500" : "outline-primary"
            }`}
            placeholder="Akun Telegram"
            {...formik.getFieldProps("telegram")}
          />
          <span className="first-letter:capitalize italic text-xs text-red-500">
            {formik.errors.telegram}
          </span>
        </div>
        <div className="md:w-1/2 w-full flex flex-col mb-4 text-xs italic gap-1">
          <span>*) Akun Telegram akan digunakan untuk konfirmasi pesanan</span>
          <span>
            *) Form Registrasi Pembeli ini berlaku hanya sementara waktu
          </span>
        </div>
        <button
          type="submit"
          className={`bg-primary text-white rounded-md h-8 w-full md:w-1/2 ${
            formik.isSubmitting || (!formik.isValid && "opacity-70")
          }`}
          disabled={formik.isSubmitting || !formik.isValid}
        >
          Simpan
        </button>
      </form>
    </ModalCustom>
  );
}

export default ModalCustomer;
