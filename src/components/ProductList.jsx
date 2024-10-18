import React from "react";
import { Link } from "react-router-dom";
import "react-photo-view/dist/react-photo-view.css";
import { calculateDiscount, formatNumberIDR } from "../utils/formatter";
import { tagOptions } from "../utils/contstant/tag";
import { BiMap } from "react-icons/bi";

function ProductList({ product }) {
  const isStockEmpty =
    (product.tag == tagOptions.READY_STOCK && product.stock == 0) ||
    !product.is_available;

  return (
    <Link
      className=" rounded-md flex bg-white shadow-xl hover:outline-[#5D9F5D] hover:outline-double"
      to={"/list/" + product.id}
      title={product.name}
    >
      <div className="flex flex-col justify-center w-full">
        <div className="relative flex justify-center">
          <img
            src={product.image}
            alt="image product"
            className={`max-w-40 h-40 object-contain rounded-md`}
            loading="lazy"
          />
          {isStockEmpty && (
            <span className="absolute rounded-full bg-gray-700 text-white p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-md shadow-lg font-roboto">
              Habis
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 p-2 text-sm">
          <h1
            className={`text-nowrap overflow-hidden text-ellipsis font-roboto capitalize w-full`}
          >
            {product.name}
          </h1>
          <div className="font-serif text-orange-600 flex gap-2 items-center">
            <p className="text-md">
              {formatNumberIDR(
                calculateDiscount(product.price, product.discount)
              )}
            </p>
            {product.discount > 0 && (
              <p className="bg-green-100  text-primary p-1 rounded-md text-xs">
                -{product.discount}%
              </p>
            )}
          </div>
          <p
            className={`${
              isStockEmpty ? "text-gray-500 " : "text-primary"
            } text-xs rounded-md capitalize`}
          >
            {isStockEmpty && "Not "}
            {product.tag}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductList;
