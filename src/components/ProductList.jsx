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
      className=" rounded-md flex bg-white shadow-md hover:outline-[#5D9F5D] hover:outline-double"
      to={"/list/" + product.id}
      title={product.name}
    >
      <div className="flex flex-col gap-1 justify-center w-full">
        <div className="relative">
          <img
            src={product.image}
            alt="image product"
            className={` min-h-[10rem] h-10 object-contain rounded-md w-full`}
            loading="lazy"
          />
          { isStockEmpty && (
            <span className="absolute rounded-full bg-black text-white p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-md shadow-lg font-roboto">Habis</span>

          ) }
        </div>

        <div className="p-2">
          <div className="px-1 flex flex-col gap-1">
            <h1
              className={`text-nowrap overflow-hidden text-sm text-ellipsis font-roboto capitalize w-full`}
            >
              {product.name}
            </h1>
            <p className="text-sm font-serif text-orange-600 flex gap-2 items-center">
              <span className="text-md">
                {formatNumberIDR(
                  calculateDiscount(product.price, product.discount)
                )}
              </span>
              {product.discount > 0 && (
                <span className="bg-green-100  text-primary p-1 rounded-md text-xs">
                  -{product.discount}%
                </span>
              )}
            </p>
            <p
                className={`${
                  isStockEmpty ? "text-gray-500 " : "text-primary"
                } text-xs rounded-md capitalize underline`}
              >
                {isStockEmpty && "Not "}
                {product.tag}
              </p>
            {product.location ? (
              <div className="flex items-center">
                <BiMap />
                <p className="text-xs text-gray-400">{product.location}</p>
              </div>
            ) : (
              <div>&nbsp;</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductList;
