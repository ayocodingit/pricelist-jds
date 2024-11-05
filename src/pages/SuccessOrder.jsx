import React, { useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { removeAllCheckout } from "../repository/carts";
import { Link } from "react-router-dom";

function SuccessOrder() {
  useEffect(() => {
    removeAllCheckout();
  }, []);

  return (
    <div className="bg-white h-[calc(100dvh)] flex justify-center items-center text-center text-sm  md:text-lg">
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center">
        <img src="/order-success.webp" className="w-full h-40 object-contain" alt="" />
        <div className="min-h-[calc(50dvh)] text-sm flex flex-col items-center justify-center gap-4 bg-white text-md">
          <AiOutlineCheckCircle className="text-5xl text-primary animate-opacity-open" />
          <p className="text-lg">Pemesanan Produk Berhasil!</p>
          <p>Pesanan Anda sudah disampaikan kepada penjual yang bersangkutan</p>
          <div className="flex flex-col gap-2 items-center">
            <a
              href={import.meta.env.VITE_URL_FEEDBACK}
              target="_blank"
              className=" p-2 rounded-md underline"
            >
              Isi Feedback?
            </a>
            <Link
              to={"/list"}
              className="text-white bg-primary rounded-md shadow-lg p-2 px-5"
            >
              Kembali Belanja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessOrder;
