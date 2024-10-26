import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { fetchProducts, getProducts } from "../repository/produts";
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
import Footer from "../components/Footer";
import { sortOptions } from "../utils/contstant/sort";
import Loading from "../components/Loading";

function List() {
  const [products, setProducts] = useState([]);
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  const [q, setQ] = useState(URLSearchParams.get("q") || "");
  const [category, setCategory] = useState(
    URLSearchParams.get("category") || categoryOptions.FOOD
  );
  const navigate = useNavigate();
  const [sort, setSort] = useState(
    URLSearchParams.get("sort") || sortOptions.STOK
  );
  const [filter, setFilter] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const [isModalCustomer, setIsModalCustomer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (
      ![sortOptions.NAME, sortOptions.STOK, sortOptions.PRICE].includes(sort)
    ) {
      setSort(sortOptions.STOK);
      SetURLSearchParams({ q, category, sort: sortOptions.STOK });
    }
    fetchProducts().then((res) => {
      setProducts(getProducts(res, { q, category, sort }));
setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    });

  
    
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
              <p className="">Hai {getCustomer()?.customer || "Brother"}</p>
              <p className="text-md font-bold">Selamat Datang Kembali!</p>
            </div>
            <div
              className="relative hover:cursor-pointer text-white rounded-md p-2"
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
              placeholder="Cari Produk"
              className="bg-white text-black rounded-md w-full p-2 h-8 pl-10 focus:outline-primary outline-1 outline-primary outline-double"
              defaultValue={q}
              onChange={handleSearch}
            />
            <FaSearch className="absolute top-2 text-md left-8 text-gray-400" />
            <VscListFilter
              className={`text-4xl hover:cursor-pointer select-none ${
                filter && "text-white"
              }`}
              onClick={() => {
                setFilter((prev) => !prev);
                setFilterCount(1);
              }}
            />
          </div>
          <div
            className={`
            ${filter && filterCount === 1 && "animate-opacity-open-filter"} 
            ${!filter && filterCount === 1 && "animate-opacity-close-filter"}
            overflow-hidden h-0 opacity-0`}
          >
            {/* Category */}
            <div className="px-5 mb-5 overflow-auto flex text-sm gap-2">
              <FilterCategory
                handleCategory={handleCategory}
                category={category}
              />
            </div>
            {/* Sorting */}
            <div className="px-5 my-5 flex text-sm gap-2">
              <SortProduct handleSort={handleSort} sort={sort} />
            </div>
          </div>
        </div>

        {/* Favorite */}
        {/* <div className="px-5 my-5 flex flex-col gap-3">
        <p>Favorite</p>
        <FavoriteList products={products} />
      </div> */}
        {/* Product  */}
        <div className="flex flex-col gap-3 bg-white justify-center">
          {products.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 h-[calc(73dvh)] md:h-[calc(75dvh)] p-2 overflow-auto">
              {products.map((product, index) => {
                return (
                  <ProductList product={product} key={index}></ProductList>
                );
              })}
            </div>
          )}
          {products.length === 0 && !isLoading && (
            <div className="capitalize justify-center flex items-center h-[calc(75dvh)] overflow-auto">
              Produk tidak ditemukan
            </div>
          )}
          { products.length === 0 && isLoading && (
            <div className="capitalize justify-center flex items-center h-[calc(75dvh)] overflow-auto">
              <Loading/>
            </div>
          )}
        </div>
        <div className="fixed md:relative bottom-0 bg-primary text-white p-2 items-center flex justify-center w-full">
          <Footer />
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
