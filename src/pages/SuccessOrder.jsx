import React, { useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { removeAllCheckout } from "../repository/carts";
import { Link } from "react-router-dom";

function SuccessOrder() {
  useEffect(() => {
    removeAllCheckout();
  }, []);

  return (
    <div className="bg-white h-[calc(100dvh)] flex justify-center items-center text-center">
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center">
        <img src="/order-success.webp" className="w-full" alt="" />
        <div className="min-h-[calc(50dvh)] text-sm flex flex-col items-center justify-center gap-4 bg-white text-md">
          <AiOutlineCheckCircle className="text-5xl text-primary" />
          <p className="text-lg font-bold">Pemesanan Produk Berhasil!</p>
          <p>Pesanan Anda sudah disampaikan kepada penjual yang bersangkutan</p>
          <div className="flex gap-2 items-center">
            <Link
              to={"/list"}
              className="text-white bg-primary rounded-lg shadow-lg p-2 my-5 px-5"
            >
              Kembali Belanja
            </Link>
            <a
              href={import.meta.env.VITE_URL_FEEDBACK}
              target="_blank"
              className="bg-orange-500 p-2 rounded-lg text-white shadow-md"
            >
              Isi Feedback
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessOrder;
