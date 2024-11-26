import React from "react";
import Customer from "../components/Customer";
import Menu from "../components/Menu";

function Profile() {
  return (
    <div className="h-[calc(100dvh)] bg-gray-50 text-sm md:text-base flex md:justify-center">
      <div className="flex w-full md:w-1/2 items-center mt-32 flex-col">
        <Customer></Customer>
        <p className="text-base text-center">
          <a
            href="https://t.me/+zVf_gRBkoixlNTg1"
            className=" text-lg text-primary hover:underline"
          >
            Bergabung ke Grup
          </a>
          <br />
          untuk Daftarkan Produkmu 😁
        </p>
      </div>
      <Menu></Menu>
    </div>
  );
}

export default Profile;
