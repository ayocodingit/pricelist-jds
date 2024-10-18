import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { AiOutlineCopy } from "react-icons/ai";
import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PaymentList2({ payment, paymentMethod, setPaymentMethod }) {
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
    <div className="flex gap-2 p-2 px-5 text-black border items-center">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-2 items-center">
          <div className="w-12">
            <img
              src={`/${payment.provider}.png`}
              alt="logo"
              className="object-contain h-12 w-full"
            />
          </div>

          <p className="first-letter: capitalize">{payment.provider}</p>
        </div>
        <input
          type="radio"
          name="payment"
          className="w-16 h-5 accent-primary"
          value={payment.provider}
          checked={payment.provider === paymentMethod}
          onChange={(e) => {
              setPaymentMethod(e.target.value)
          }}  
        />
      </div>
      {/* <div className="flex flex-col items-center gap-1 text-xs">
        <p className="text-nowrap overflow-hidden text-ellipsis w-32 md:w-full text-center">
          {payment.value}
        </p>
        
          <div className="py-2 border-t-2 bg-gray-200 w-full flex justify-center">
            <CopyToClipboard text={payment.value} onCopy={alert}>
              <AiOutlineCopy className={"text-xl hover:cursor-copy"} />
            </CopyToClipboard>
          </div>
      </div> */}
    </div>
  );
}

export default PaymentList2;
