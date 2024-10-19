import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getProducts } from "../repository/produts";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { getCountCart } from "../repository/carts";
import { getCustomer } from "../repository/customer";
import ModalCustomer from "../components/ModalCustomer";
import FilterCategory from "../components/FilterCategory";
import { categoryOptions } from "../utils/contstant/category";
import FavoriteList from "../components/FavoriteList";
import ProductList from "../components/ProductList";
import SortProduct from "../components/SortProduct";
import { BsFilter } from "react-icons/bs";
import { FcFilledFilter } from "react-icons/fc";
import { GrFilter } from "react-icons/gr";
import { VscListFilter } from "react-icons/vsc";

function List() {
  const [products, setProducts] = useState([]);
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  const [q, setQ] = useState(URLSearchParams.get("q") || "");
  const [category, setCategory] = useState(
    URLSearchParams.get("category") || categoryOptions.FOOD
  );
  const navigate = useNavigate();
  const [sort, setSort] = useState(URLSearchParams.get("sort") || "price");
  const [filter, setFilter] = useState(false);
  const [isModalCustomer, setIsModalCustomer] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (!["name", "discount", "price"].includes(sort)) {
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
    <div className="bg-gray-50 min-h-[calc(100dvh)]  flex md:justify-center">
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="sticky top-0 bg-primary text-white z-10 shadow-sm">
          {/* Profile */}
          <div className="px-5 pt-7 flex justify-between items-center">
            <div className="">
              <p className="text-md">
                Hello {getCustomer()?.customer || "Brother"}
              </p>
              <p className="text-xl font-bold">Welcome Back!</p>
            </div>
            <div
              className="relative hover:cursor-pointer bg-white text-black rounded-lg"
              onClick={() => navigate("/cart")}
            >
              <CiShoppingCart className="text-3xl" />
              <p className="absolute rounded-full top-0 right-0 outline-black outline-1 outline-double bg-white text-xs w-1/2 flex justify-center">
                {getCountCart()}
              </p>
            </div>
          </div>
          {/* Search */}
          <div className="px-5 my-4 relative flex gap-2 items-center">
            <input
              type="text"
              placeholder="Search"
              className="bg-white text-black rounded-md w-full h-10 pl-10 focus:outline-primary outline-1 outline-double"
              defaultValue={q}
              onChange={handleSearch}
            />
            <FaSearch className="absolute top-3 text-lg left-8 text-black" />
            <VscListFilter
              className={`text-4xl hover:cursor-pointer ${filter && 'text-white'}`}
              onClick={() => setFilter((prev) => !prev)}
            />
          </div>
          {filter && (
            <>
              {/* Category */}
              <div className="px-5 my-5 overflow-auto flex text-sm gap-2">
                <FilterCategory
                  handleCategory={handleCategory}
                  category={category}
                />
              </div>
              {/* Sorting */}
              <div className="px-5 my-5 flex text-sm gap-2">
                <SortProduct handleSort={handleSort} sort={sort} />
              </div>
            </>
          )}
        </div>

        {/* Favorite */}
        {/* <div className="px-5 my-5 flex flex-col gap-3">
        <p>Favorite</p>
        <FavoriteList products={products} />
      </div> */}
        {/* Product  */}
        <div className="px-2 my-5 flex flex-col gap-3">
          {products.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {products.map((product, index) => {
                return (
                  <ProductList product={product} key={index}></ProductList>
                );
              })}
            </div>
          )}
          {products.length === 0 && (
            <div className="capitalize justify-center flex min-h-72 items-center">
              Product is Not Found
            </div>
          )}
        </div>
      </div>
      <ModalCustomer
        setIsModalCustomer={setIsModalCustomer}
        isModalCustomer={isModalCustomer}
      />
    </div>
  );
}

export default List;
