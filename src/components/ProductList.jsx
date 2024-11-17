import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "react-photo-view/dist/react-photo-view.css";
import { calculateDiscount, formatNumberIDR } from "../utils/formatter";
import { tagOptions } from "../utils/contstant/tag";
import Skeleton from "./Skeleton";
import { useState } from "react";
import { Image, Tooltip } from "@nextui-org/react";

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

  return (
    <Link
      className="border-[1px] border-primary rounded-md flex bg-white shadow-md hover:cursor-pointer h-48 md:h-60 relative w-full"
      to={"/list/" + product.id}
    >
      <div className="flex flex-col justify-center w-full">
        <div className="relative flex justify-center w-full">
          <Tooltip content={product.name} color="primary" placement="bottom" showArrow={true}>
          <Image
            alt="image product"
            src={product.image}
            className={`w-full h-32 md:h-40 object-contain p-1 -z-0`}
            radius="sm"
            loading="lazy"
            
          />
          </Tooltip>

          {isStockEmpty && (
            <span className="absolute animate-opacity-open rounded-full z-10 bg-gray-900 text-white p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-md shadow-lg font-roboto">
              Habis
            </span>
          )}
        </div>

        <div className="flex flex-col p-2">
          <h1
            className={`text-nowrap overflow-hidden text-ellipsis capitalize w-full`}
          >
            {product.name}
          </h1>
          <div className=" text-primary flex gap-2 items-center mt-2">
            <p className="text-md">
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
              <p className="bg-primary absolute top-3 left-0 text-white p-1 rounded-r-md text-sm shadow-lg">
                -{product.discount}%
              </p>
            )}
          </div>
          {/*  <p
            className={`${
              isStockEmpty ? "text-gray-500 " : "text-white bg-primary p-1 text-center rounded-lg w-fit"
            } text-xs rounded-md capitalize mt-2 `}
          >
            {!isStockEmpty ? product.tag : "sold out"}
          </p> */}
        </div>
      </div>
    </Link>
  );
}

export default ProductList;
