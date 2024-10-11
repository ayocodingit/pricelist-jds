import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import CardList from "../components/CardList";
import { getProducts } from "../repository/produts";
import Footer from "../components/Footer";
import { useSearchParams } from "react-router-dom";

function List() {
  const [products, setProducts] = useState([]);
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  const [q, setQ] = useState(URLSearchParams.get("q") || "");

  useEffect(() => {
    setProducts(getProducts(q));
  }, [q]);

  const handleSearch = (e) => {
    const q = e.target.value;
    setQ(q);
    SetURLSearchParams({ q });
  };

  return (
    <div className="bg-gray-50 h-[calc(100dvh)] relative">
      {/* section Search */}
      <div className="flex flex-col gap-1 items-center py-2 md:py-5 bg-white sticky top-0 shadow-sm">
        <div className="w-full p-2 flex justify-center">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              className=" w-full h-9  rounded-md focus:outline-[#5D9F5D] outline-1 outline-[#5D9F5D] outline-double text-black pl-8 pr-5 text-md"
              placeholder="Cari Produk"
              defaultValue={q}
              id="search"
              onChange={handleSearch}
            />
            <label
              htmlFor="search"
              className="absolute text-md left-2 top-2 text-[#5D9F5D]"
            >
              <FaSearch />
            </label>
          </div>
        </div>
        <Footer />
      </div>
      <div className="flex justify-center md:p-5 p-2">
        {products.length > 0 && (
          <div className="md:gap-4 gap-2 grid grid-cols-2 md:grid-cols-6 md:w-3/4 ">
            {products.map((product, index) => {
              return <CardList product={product} key={index} />;
            })}
          </div>
        )}

        {products.length == 0 && (
          <div className="capitalize  flex items-center">
            Produk tidak ditemukan!
          </div>
        )}
      </div>
    </div>
  );
}

export default List;
