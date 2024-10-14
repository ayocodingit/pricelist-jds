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
    <div className="w-full md:text-lg flex flex-col p-2 bg-white text-black rounded-lg shadow-lg">
      <div className="flex flex-col gap-2 items-center justify-between">
        <img
          src={`/${payment.provider}.png`}
          alt="logo"
          className="object-contain max-h-8"
        />
        <p className="first-letter: capitalize text-xs">{payment.provider}</p>
      </div>
      <div className="flex flex-col items-center gap-1 text-sm">
        <p className="text-nowrap overflow-hidden text-ellipsis w-32 md:w-full text-center">
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
