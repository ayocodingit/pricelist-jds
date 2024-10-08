import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { AiOutlineCopy,AiOutlineSend } from "react-icons/ai";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Payment({ payment }) {
  const alert = () => {
    toast.success("Copied on Clipboard", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
    });
  };

  return (
    <div className="capitalize w-full md:w-96 flex justify-between items-center p-5 gap-3 h-16 bg-white text-black rounded-lg shadow-2xl text-md">
      <div className="flex gap-5 items-center">
        <img
          src={`/${payment.provider}.png`}
          alt="logo"
          width={30}
          className="object-fill"
        />
        <p className="first-letter: capitalize">{payment.provider}</p>
      </div>
      <div className="flex gap-2">
        <p>{payment.value}</p>
        {payment.provider != "telegram" && (
          <CopyToClipboard text={payment.value} onCopy={alert}>
            <AiOutlineCopy className={"text-2xl hover: cursor-pointer"} />
          </CopyToClipboard>
        )}
        {payment.provider == "telegram" && (
          <a href={'https://t.me/' + payment.value}>
            <AiOutlineSend className={"text-2xl hover: cursor-pointer"} />
          </a>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default Payment;
