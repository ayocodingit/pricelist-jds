import React, { useEffect, useState } from "react";
import {
  checkCompleteCustomer,
  getCustomer,
  storeCustomer,
} from "../repository/customer";
import { useFormik } from "formik";
import * as yup from "yup";
import { Flip, toast } from "react-toastify";
import Loading from "./Loading";

function Customer() {
  const { customer, telegram } = getCustomer();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isLoading]);

  const formik = useFormik({
    initialValues: {
      customer: customer ?? "",
      telegram: telegram ? '@' + telegram.replace('@', '') : "",
    },
    onSubmit: (values) => {
      formik.values.telegram = values.telegram ? '@' + values.telegram.replace('@', '') : "",
      setIsLoadingSubmit(true);
      storeCustomer(values);
      alert(
        "success",
        `Profil berhasil ${checkCompleteCustomer() ? "diubah" : "disimpan"}`
      );
      setTimeout(() => {
        setIsLoadingSubmit(false);
        setIsLoading(true);
      }, 2000);
    },
    validationSchema: yup.object().shape({
      customer: yup
        .string()
        .min(3)
        .max(50)
        .required()
        .label("Nama Lengkap - Divisi"),
      telegram: yup.string().min(3).max(20).required().label("Akun Telegram"),
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
    <form
      className="flex flex-col items-center  w-full   p-5"
      onSubmit={formik.handleSubmit}
    >
      <div className="bg-white w-full min-h-96 p-10 rounded-lg  shadow-sm flex flex-col items-center">
        <img src="/user.png" className="w-32 object-contain" alt="logo user" />
        {!isLoading && (
          <>
            <div className="flex items-center w-full mt-5">
              <label className="w-1/3">Nama dan Divisi</label>
              <input
                placeholder="Nama Lengkap - Divisi"
                className="border-b-[1px] focus:border-primary w-full focus:outline-none bg-transparent p-2"
                {...formik.getFieldProps("customer")}
              />
            </div>
            <div className="w-full flex mt-1">
              <div className="w-1/3">&nbsp;</div>
              <span className="w-full first-letter:capitalize italic text-xs text-red-500">
                {formik.errors.customer}
              </span>
            </div>
            <div className="flex items-center w-full">
              <label className="w-1/3">Akun Telegram</label>
              <input
                placeholder="@aseptea"
                className="border-b-[1px] focus:border-primary w-full focus:outline-none bg-transparent p-2"
                {...formik.getFieldProps("telegram")}
              />
            </div>
            <div className="w-full flex mt-1">
              <div className="w-1/3">&nbsp;</div>
              <span className="w-full first-letter:capitalize italic text-xs text-red-500">
                {formik.errors.telegram}
              </span>
            </div>
            <button
              type="submit"
              className={`bg-primary text-white rounded-md h-8 md:w-1/2 w-full flex gap-3 justify-center items-center mt-8 hover:cursor-pointer ${
                (isLoadingSubmit || !formik.isValid) && "opacity-60"
              }`}
              disabled={isLoadingSubmit || !formik.isValid}
            >
              {checkCompleteCustomer() ? "Ubah" : "Simpan"}
              <Loading
                isLoading={isLoadingSubmit}
                size={15}
                color="#fff"
              ></Loading>
            </button>
          </>
        )}
        {isLoading && <div className="flex items-center w-full justify-center h-full"><Loading /></div>}
      </div>
    </form>
  );
}

export default Customer;
