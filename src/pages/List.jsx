import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import CardList from "../components/CardList";
import { getProducts } from "../repository/produts";
import { debounce } from "lodash"
import Footer from "../components/Footer";

function List() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  
  useEffect(() => {
    setProducts(getProducts(q));
  }, [q]);

  return (
    <>
      <div className="flex flex-col gap-2 items-center mt-10">
        <p className="text-2xl text-white">Search Product</p>
        <div className="relative">
          <input
            type="text"
            className="w-80 h-10 rounded-lg focus:outline-none text-black pl-12 pr-5 text-lg"
            placeholder="Search ..."
            id="search"
            onChange={debounce((e) =>setQ(e.target.value), 250)}
          />
          <label
            htmlFor="search"
            className="absolute text-2xl left-3 top-2 text-gray-400"
          >
            <FaSearch />
          </label>
        </div>
        <Footer/>

      </div>
      <div className="mt-12 md:gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
        {products.map((product, index) => {
          return <CardList product={product} key={index} />;
        })}
      </div>
      {products.length == 0 && (
        <div className="text-center text-white">Not Found!</div>
      )}
    </>
  );
}

export default List;
