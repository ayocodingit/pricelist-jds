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
import ProductList from "../components/ProductList";
import SortProduct from "../components/SortProduct";
import { VscListFilter } from "react-icons/vsc";
import Footer from '../components/Footer'

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
      <div className="w-full md:w-1/2 flex flex-col relative">
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
              className="relative hover:cursor-pointer text-white rounded-lg p-2"
              onClick={() => navigate("/cart")}
            >
              <CiShoppingCart className="text-3xl" />
              <p className="absolute rounded-full top-2 right-2 text-black bg-white text-xs w-4 flex justify-center">
                {getCountCart()}
              </p>
            </div>
          </div>
          {/* Search */}
          <div className="px-5 my-4 relative flex gap-2 items-center">
            <input
              type="text"
              placeholder="Search"
              className="bg-white text-black rounded-md w-full p-2 h-8 pl-10 focus:outline-primary outline-1 outline-primary outline-double"
              defaultValue={q}
              onChange={handleSearch}
            />
            <FaSearch className="absolute top-2 text-md left-8 text-gray-400" />
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
        <div className="px-2 py-2 flex flex-col gap-3 bg-white justify-center">
          {products.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 h-[calc(70dvh)] p-2 overflow-auto">
              {products.map((product, index) => {
                return (
                  <ProductList product={product} key={index}></ProductList>
                );
              })}
            </div>
          )}
          {products.length === 0 && (
            <div className="capitalize justify-center flex items-center h-[calc(65dvh)]">
              Product is Not Found
            </div>
          )}
        </div>
          <div className="fixed bottom-0 bg-white text-black p-2 items-center flex justify-center w-full md:w-1/2 rounded-lg">
            <Footer/>
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
