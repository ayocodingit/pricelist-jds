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
import Menu from "../components/Menu";
import { SlBasket } from "react-icons/sl";

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
    setProducts([]);
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
    <div className="bg-gray-50 min-h-[calc(100dvh)]  flex md:justify-center text-sm md:text-md">
      <div className="w-full flex flex-col relative">
        <div className="sticky top-0 bg-white text-black py-2 shadow-md">
          {/* Search */}
          <div className="px-5 my-2 relative flex gap-2 items-center">
            <input
              type="text"
              placeholder="Cari Produk"
              className="bg-gray-50 text-black rounded-md w-full p-2 h-9 pl-10 focus:outline-primary outline-1 outline-primary outline-double"
              defaultValue={q}
              onChange={handleSearch}
            />
            <FaSearch className="absolute top-2 text-lg left-8 text-gray-400" />
            <div
              className="relative  rounded-full p-1 hover:cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <SlBasket className="text-2xl " />
              <p className="absolute rounded-md top-0 text-white right-0 bg-primary  w-4 flex justify-center text-xs">
                {getCountCart()}
              </p>
            </div>
          </div>
          <div
            className={`
            overflow-hidden `}
          >
            {/* Sorting */}
            <div className="px-5 flex items-center gap-2">
              <h1>Urutkan </h1>
              <SortProduct handleSort={handleSort} sort={sort} />
            </div>
          </div>
          <div className="flex flex-col px-5 gap-2 overflow-auto">
            <h1>Kategori</h1>
            <div className="flex overflow-auto gap-2">
              <FilterCategory
                handleCategory={handleCategory}
                category={category}
              />
            </div>
          </div>
        </div>

        {/* Favorite */}
        {/* <div className="px-5 my-5 flex flex-col gap-3">
        <p>Favorite</p>
        <FavoriteList products={products} />
      </div> */}

        {/* Category */}

        {/* Product  */}
        <div className="flex flex-col gap-3 justify-center">
          {products.length > 0 && (
            <div className="grid  grid-cols-2 md:grid-cols-4 gap-2 h-[calc(67dvh)] md:h-[calc(66dvh)] p-2 overflow-auto">
              {products.map((product, index) => {
                return (
                  <ProductList product={product} key={index}></ProductList>
                );
              })}
            </div>
          )}
          {products.length === 0 && !isLoading && (
            <div className="capitalize justify-center flex items-center h-[calc(58dvh)] md:min-h-[calc(60dvh)] overflow-auto">
              Produk tidak ditemukan
            </div>
          )}
          {products.length === 0 && isLoading && (
            <div className="capitalize justify-center flex items-center h-[calc(58dvh)] md:min-h-[calc(60dvh)] overflow-auto">
              <Loading />
            </div>
          )}
        </div>
        <Menu />
      </div>
      <ModalCustomer
        setIsModalCustomer={setIsModalCustomer}
        isModalCustomer={isModalCustomer}
      />
    </div>
  );
}

export default List;
