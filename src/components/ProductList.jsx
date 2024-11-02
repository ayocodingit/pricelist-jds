import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "react-photo-view/dist/react-photo-view.css";
import { calculateDiscount, formatNumberIDR } from "../utils/formatter";
import { tagOptions } from "../utils/contstant/tag";
import Skeleton from "./Skeleton";
import { useState } from "react";

function ProductList({ product }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const isStockEmpty =
    (product.tag == tagOptions.READY_STOCK && product.stock == 0) ||
    !product.is_available;

  if (isLoading)
    return (
      <div>
        <Skeleton height={150} />
        <Skeleton count={3} height={20} />
      </div>
    );

  return (
    <Link
      className="border-[1px] border-primary rounded-md flex bg-white shadow-md hover:cursor-pointer max-h-60 relative"
      to={"/list/" + product.id}
      title={product.name}
    >
      <div className="flex flex-col justify-center w-full">
        <div className="relative flex justify-center w-full">
          <img
            src={product.image}
            alt="image product"
            className={`w-40 h-40 object-contain p-2`}
            loading="lazy"
          />
          {isStockEmpty && (
            <span className="absolute animate-opacity-open rounded-full bg-gray-900 text-white p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-md shadow-lg font-roboto">
              Habis
            </span>
          )}
        </div>

        <div className="flex flex-col p-2 text-sm">
          <h1
            className={`text-nowrap overflow-hidden text-ellipsis font-roboto capitalize w-full`}
          >
            {product.name}
          </h1>
          <div className="font-[sans-serif] text-primary flex gap-2 items-center">
            <p className="text-lg">
              {formatNumberIDR(
                calculateDiscount(product.price, product.discount)
              )}{" "}
              {product.discount > 0 && (
                <span className="text-xs line-through text-black">
                  {formatNumberIDR(product.price)}
                </span>
              )}
            </p>
            {product.discount > 0 && (
              <p className="bg-primary absolute top-5 left-0 text-white p-1 rounded-r-md text-sm shadow-lg">
                -{product.discount}%
              </p>
            )}
          </div>
          <p
            className={`${
              isStockEmpty ? "text-gray-500 " : "text-black"
            } text-xs rounded-md capitalize`}
          >
            {!isStockEmpty ? product.tag : "sold out"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductList;
