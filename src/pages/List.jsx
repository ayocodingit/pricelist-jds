import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import CardList from "../components/CardList";
import { getProducts } from "../repository/produts";
import Footer from "../components/Footer";
import { useSearchParams } from "react-router-dom";
import { BiFilterAlt } from "react-icons/bi";
import Filter from "../components/Filter";

function List() {
  const [products, setProducts] = useState([]);
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  const [q, setQ] = useState(URLSearchParams.get("q") || "");
  const [category, setCategory] = useState(URLSearchParams.get("category") || "")
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    setProducts(getProducts(q, category));
  }, [q, category]);

  const handleSearch = (e) => {
    const q = e.target.value;
    setQ(q);
    SetURLSearchParams({ q, category });
  };

  const handleCategory = (category) => {
    if (category == '') setFilter(false)
    setCategory(category)
    SetURLSearchParams({ q, category });
  }

  return (
    <div className="bg-gray-50">
      {/* section Search */}
      <div className="flex flex-col gap-1 items-center py-2 md:py-5 bg-white sticky top-0 shadow-md transition-all">
        <div className="w-full p-2 flex justify-center">
          <div className="relative w-full flex gap-2 md:w-1/2 items-center">
            <input
              type="text"
              className=" w-full h-9  rounded-md focus:outline-primary outline-1 outline-primary outline-double text-black pl-8 pr-5 text-md"
              placeholder="Cari Produk"
              defaultValue={q}
              id="search"
              onChange={handleSearch}
            />
            <label
              htmlFor="search"
              className="absolute text-md left-2 top-2 text-primary"
            >
              <FaSearch />
            </label>
            <BiFilterAlt className="text-3xl text-primary" onClick={() => setFilter(!filter)}/>
          </div>
        </div>
        {
          filter && <Filter handleCategory={handleCategory} category={category}/>
        }
        
        <Footer />
      </div>
      <div className="flex justify-center md:p-5 p-2">
        {products.length > 0 && (
          <div className="md:gap-4 gap-2 grid grid-cols-2 md:grid-cols-6 w-full">
            {products.map((product, index) => {
              return <CardList product={product} key={index} />;
            })}
          </div>
        )}
      </div>
      {products.length == 0 && (
        <div className="capitalize justify-center h-96 flex items-center">
          Produk tidak ditemukan!
        </div>
      )}
    </div>
  );
}

export default List;
