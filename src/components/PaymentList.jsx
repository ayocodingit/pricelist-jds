import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { AiOutlineCopy, AiOutlineSend } from "react-icons/ai";
import { TelegramIcon, TelegramShareButton } from "react-share";
import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Payment({ payment, product, qty, name_card }) {
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
    <div className="w-full md:text-lg flex flex-col bg-white text-black rounded-lg shadow-lg">
      <div className="flex flex-col gap-2 items-center justify-between p-2">
        <img
          src={`/${payment.provider}.png`}
          alt="logo"
          className="object-contain max-h-7"
        />
        <p className="first-letter: capitalize text-lg font-bold">{payment.provider}</p>
      </div>
      <div className="flex flex-col items-center gap-1 text-xs">
        <p className="text-nowrap overflow-hidden text-ellipsis w-32 md:w-full text-center">
          {payment.value}
        </p>
        
          <div className="py-2 border-t-2 bg-gray-200 w-full flex justify-center">
            <CopyToClipboard text={payment.value} onCopy={alert}>
              <AiOutlineCopy className={"text-xl hover:cursor-copy"} />
            </CopyToClipboard>
          </div>
      </div>
    </div>
  );
}

export default Payment;
