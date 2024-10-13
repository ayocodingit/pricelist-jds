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
    <div className="w-full md:text-lg md:w-96 flex justify-between items-center p-5 gap-3 h-16 bg-white text-black rounded-lg shadow-lg text-sm">
      <div className="flex gap-5 items-center justify-between">
        <img
          src={`/${payment.provider}.png`}
          alt="logo"
          className="object-fill max-h-8"
        />
        <p className="first-letter: capitalize">{payment.provider}</p>
      </div>
      <div className="flex items-center gap-1">
        <p className="text-nowrap overflow-hidden text-ellipsis w-32 md:w-full text-right">
          {payment.provider == "telegram" && `@`}
          {payment.value}
        </p>
        {payment.provider != "telegram" && (
          <CopyToClipboard text={payment.value} onCopy={alert}>
            <AiOutlineCopy className={"text-lg hover:cursor-copy"} />
          </CopyToClipboard>
        )}
        {payment.provider == "telegram" && (
          <TelegramShareButton
            url={"Haloo Akang Teteh~"}
            openShareDialogOnClick={true}
            title={`
aku beli **${product}** ${qty} yah, 
saya sudah tf yups! tolong di ceki ceki
Hatur nuhun~ ✨`}
          >
            <AiOutlineSend className={"text-lg hover:cursor-pointer"} />
          </TelegramShareButton>
        )}
      </div>
    </div>
  );
}

export default Payment;
