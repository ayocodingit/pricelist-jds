import { cn, Radio } from "@nextui-org/react";
import React from "react";

export const CustomRadio = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "w-full flex m-0 max-w-full items-center justify-between",
          "flex-row-reverse cursor-pointer rounded-lg gap-4 p-5 border-[1px] border-primary",
          "data-[selected=true]:border-primary capitalize"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

function PaymentList({ payment, paymentMethod, setPaymentMethod, setVA }) {
  return (
    <>
      <CustomRadio value={payment.provider} id={payment.value}>
        <div className="flex items-center gap-2">
          <img
            src={`/payments/${payment.provider}.png`}
            alt="logo"
            className="object-contain h-10 w-10"
            loading="lazy"
          ></img>
          <p>{payment.provider}</p>
        </div>
      </CustomRadio>
    </>
  );
}

export default PaymentList;
