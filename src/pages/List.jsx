import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import CardList from "../components/CardList";
import { getProducts } from "../repository/produts";
import Footer from "../components/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BiFilterAlt } from "react-icons/bi";
import Filter from "../components/FilterCategory";
import SortProduct from "../components/SortProduct";
import { CiShoppingCart } from "react-icons/ci";
import { getCountCart } from "../repository/carts";

function List() {
  const [products, setProducts] = useState([]);
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  const [q, setQ] = useState(URLSearchParams.get("q") || "");
  const [category, setCategory] = useState(
    URLSearchParams.get("category") || ""
  );
  const navigate = useNavigate();
  const [sort, setSort] = useState(URLSearchParams.get("sort") || "price");
  const [filter, setFilter] = useState(true);

  useEffect(() => {
    if (!["name", "discount", 'price'].includes(sort)) {
      setSort("name");
      SetURLSearchParams({ q, category, sort: "discount" });
    }
    setProducts(getProducts(q, category, sort));
  }, [q, category, sort]);

  const handleSearch = (e) => {
    const q = e.target.value;
    setQ(q);
    SetURLSearchParams({ q, category, sort });
  };

  const handleCategory = (category) => {
    setCategory(category);
    SetURLSearchParams({ q, category, sort });
  };

  const handleSort = (sorting) => {
    setSort(sorting);
    SetURLSearchParams({ q, category, sort: sorting });
  };

  return (
    <div className="bg-gray-50">
      {/* section Search */}
      <div className="flex flex-col gap-2 items-center py-3 p-2 bg-primary sticky top-0 shadow-lg z-10">
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
            <BiFilterAlt
              className="text-3xl text-white"
              onClick={() => setFilter(!filter)}
            />
            <div className="relative" onClick={() => navigate("/cart")}>
              <CiShoppingCart className="text-3xl text-white" />
              <p className="absolute rounded-full top-0 right-0 text-primary bg-white text-xs w-1/2 flex justify-center">
                {getCountCart()}
              </p>
            </div>
          </div>
        </div>
        {filter && (
          <div className="flex w-full md:w-1/2 justify-center gap-2 bg-gray-50 rounded-md">
            <div className="flex flex-col items-center justify-center">
              <SortProduct handleSort={handleSort} sort={sort} />
              {/* <p className="text-sm font-bold text-primary">Sort </p> */}
            </div>
            <div className="flex flex-col items-center">
              <Filter handleCategory={handleCategory} category={category} />
              {/* <p className="text-sm font-bold text-primary">Category</p> */}
            </div>
          </div>
        )}

        <Footer />
      </div>
      <div className="flex justify-center md:p-5 p-2">
        {products.length > 0 && (
          <div className="gap-2 grid grid-cols-2 md:grid-cols-6 w-full">
            {products.map((product, index) => {
              return <CardList product={product} key={index} />;
            })}
          </div>
        )}
      </div>
      {products.length == 0 && (
        <div className="capitalize justify-center h-96 flex items-center">
          Product is Not Found
        </div>
      )}
    </div>
  );
}

export default List;
