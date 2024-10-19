import React, { useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { removeAllCheckout } from "../repository/carts";
import { Link } from "react-router-dom";

function SuccessOrder() {
  useEffect(() => {
    removeAllCheckout();
  }, []);

  return (
    <div className="bg-gray-50 h-[calc(100dvh)] flex justify-center items-center">
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center">
        <img src="/order-success.webp" className="w-full" alt="" />
        <div className="min-h-[calc(50dvh)] text-sm flex flex-col items-center justify-center gap-4 bg-white text-md">
          <AiOutlineCheckCircle className="text-5xl text-primary" />
          <p className="text-lg font-bold">Payment Successful!</p>
          <p className="text-center">
            Congratulations on <br /> your order
          </p>
          <Link
            to={"/list"}
            className="text-white bg-primary rounded-lg shadow-lg p-2 py-4"
          >
            Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuccessOrder;
