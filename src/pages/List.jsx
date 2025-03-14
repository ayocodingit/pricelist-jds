import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { fetchProducts, getProducts } from "../repository/produts";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FilterCategory from "../components/FilterCategory";
import { categoryOptions } from "../utils/contstant/category";
import ProductList from "../components/ProductList";

import { sortOptions } from "../utils/contstant/sort";
import Loading from "../components/Loading";
import Menu from "../components/Menu";
import { Avatar, Input } from "@nextui-org/react";
import CartIcon from "../components/CartIcon";

function List() {
  const [products, setProducts] = useState([]);
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  const [q, setQ] = useState(URLSearchParams.get("q") || "");
  const [category, setCategory] = useState(
    URLSearchParams.get("category") || categoryOptions.FOOD
  );
  const [sort, setSort] = useState(
    URLSearchParams.get("sort") || sortOptions.STOK
  );
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

  // const handleSort = (sorting) => {
  //   setSort(sorting);
  //   SetURLSearchParams({ q, category, sort: sorting });
  // };

  return (
    <div className="bg-gray-50 min-h-[calc(100dvh)]  flex md:justify-center text-sm md:text-base">
      <div className="w-full flex flex-col relative">
        <div className="sticky top-0 bg-white text-black flex flex-col gap-2 z-20">
          <h1 className="px-4 mt-2 md:text-xl text-lg uppercase">JDS Mart</h1>
          {/* Search */}
          <div className="px-3 relative flex gap-2 items-center ">
            <Input
              defaultValue={q}
              onChange={handleSearch}
              isClearable
              size="md"
              radius="sm"
              onClear={() => {
                setQ("");
                SetURLSearchParams({ q: "", category, sort });
              }}
              classNames={{
                input: [
                  "bg-white",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-white",
                inputWrapper: [
                  "border-gray-500",
                  "border-[1px]",
                  "bg-white",
                  "hover:bg-white",
                  "dark:hover:bg-white",
                  "group-data-[focus=true]:bg-white",
                  "dark:group-data-[focus=true]:bg-white",
                  "data-[hover=true]:bg-white",
                  "!cursor-text",
                ],
              }}
              placeholder="Cari Produk"
              startContent={
                <FaSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
            />
            {/*
            <Select
              className="max-w-xs hidden md:flex items-center"
              size="sm"
              defaultSelectedKeys={[sort]}
              labelPlacement="outside-left"
              label="Urutkan"
              onChange={(e) => handleSort(e.target.value)}
            >
              {Object.entries(Object.values(sortOptions)).map((sorts, key) => (
                <SelectItem key={sorts[1]}>{sorts[1]}</SelectItem>
              ))}
            </Select>
*/}
            <Link to={"/me"} className={`flex flex-col items-center gap-1`}>
              <Avatar src="/user.png" size="md" />
            </Link>
          </div>
          {/*
          <div className="md:hidden">
            <div className="px-2 flex items-center  gap-2">
              <Select
                className="w-full flex items-center"
                size="sm"
                labelPlacement="outside-left"
                label="Urutkan"
                defaultSelectedKeys={[sort]}
                onChange={(e) => handleSort(e.target.value)}
              >
                {Object.entries(Object.values(sortOptions)).map(
                  (sorts, key) => (
                    <SelectItem key={sorts[1]}>{sorts[1]}</SelectItem>
                  )
                )}
              </Select>
            </div>
          </div>
*/}
          <div className="flex px-2 gap-2 overflow-auto bg-white no-scrollbar">
            <FilterCategory
              handleCategory={handleCategory}
              category={category}
            />
          </div>
        </div>

        <CartIcon></CartIcon>
        <Menu></Menu>

        {/* Favorite */}
        {/* <div className="px-5 my-5 flex flex-col gap-3">
        <p>Favorite</p>
        <FavoriteList products={products} />
      </div> */}

        {/* Category */}

        {/* Product  */}
        <div className="flex flex-col gap-3 justify-center">
          {products.length > 0 && (
            <div className="grid  grid-cols-2 md:grid-cols-5  gap-2 h-[calc(75dvh)] md:max-h-[calc(75dvh)] p-2 overflow-auto place-content-start no-scrollbar">
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
      </div>
    </div>
  );
}

export default List;
