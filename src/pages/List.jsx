import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import CardList from "../components/CardList";
import { getProducts } from "../repository/produts";
import { debounce } from "lodash";
import Footer from "../components/Footer";

function List() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    setProducts(getProducts(q));
  }, [q]);

  return (
    <div>
      <div className="flex flex-col gap-1 items-center mt-10">
        <p className="text-md text-white">Search Product</p>
        <div className="relative">
          <input
            type="text"
            className="w-80 h-8 rounded-md focus:outline-none text-black pl-8 pr-5 text-xs"
            placeholder="Search ..."
            id="search"
            onChange={debounce((e) => setQ(e.target.value), 250)}
          />
          <label
            htmlFor="search"
            className="absolute text-md left-2 top-2 text-gray-400"
          >
            <FaSearch />
          </label>
        </div>
        <Footer />
      </div>
      <div className="flex justify-center mt-4">
        <div className="gap-2 p-2 grid grid-cols-2 md:grid-cols-5 md:w-3/4 ">
          {products.map((product, index) => {
            return <CardList product={product} key={index} />;
          })}
        </div>
        {products.length == 0 && (
          <div className="text-center text-white">Not Found!</div>
        )}
      </div>
    </div>
  );
}

export default List;
