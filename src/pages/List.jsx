import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import CardList from "../components/CardList";
import { getProducts } from "../repository/produts";
import { debounce } from "lodash";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function List() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleSearch = (q) => {
    if (!q) return
    navigate('/search?q=' + q)
  }

  return (
    <div className="bg-gray-50 h-[calc(100dvh)] relative">
      {/* section Search */}
      <div className="flex flex-col gap-1 items-center py-2 md:py-5 bg-white sticky top-0 shadow-sm">
        <div className="w-full p-2 flex justify-center">
          <div className="relative w-full md:w-1/2">
          <input
            type="text"
            className=" w-full h-9  rounded-md focus:outline-[#5D9F5D] outline-1 outline-gray-200 outline-double text-black pl-8 pr-5 text-md"
            placeholder="Cari Produk JDS"
            id="search"
            onChange={debounce((e) => handleSearch(e.target.value), 250)}
          />
          <label
            htmlFor="search"
            className="absolute text-md left-2 top-2 text-gray-300"
          >
            <FaSearch />
          </label>
          </div>
        </div>
        <Footer />
      </div>
      <div className="flex md:justify-center md:p-5 p-2">
        { products.length > 0 && (
<div className="md:gap-4 gap-2 grid grid-cols-2 md:grid-cols-6 md:w-3/4 ">
          {products.map((product, index) => {
            return <CardList product={product} key={index} />;
          })}
        </div>
        ) }
        
        {products.length == 0 && (
          <div className="capitalize">
product not found!</div>
        )}
      </div>
    </div>
  );
}

export default List;
