import React from "react";

function PaymentList({ payment, paymentMethod, setPaymentMethod, setVA }) {
  return (
    <div className="flex gap-2 p-2 px-5 text-black border border-primary items-center rounded-md">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-2 items-center">
          <div className="w-12">
            <img
              src={`/payments/${payment.provider}.png`}
              alt="logo"
              className="object-contain h-12 w-full"
loading="lazy"
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
              setVA(payment.value)
          }}  
        />
      </div>
    </div>
  );
}

export default PaymentList;
