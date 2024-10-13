import React from "react";
import { Link } from "react-router-dom";
import "react-photo-view/dist/react-photo-view.css";
import { calculateDiscount, formatNumberIDR } from "../utils/formatter";
import { tagOptions } from "../utils/contstant/tag";

function CardList({ product }) {
  const isStockEmpty =
    !((product.tag == tagOptions.READY_STOCK && product.stock == 0) || !product.is_available);
    
  return (
    <Link
      className=" rounded-md flex bg-white shadow-md hover:outline-[#5D9F5D] hover:outline-double"
      to={isStockEmpty ? "/list/" + product.id : "#"}
      title={product.name}
    >
      <div className="flex flex-col gap-1 justify-center w-full">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt="image product"
            className={` min-h-[10rem] h-8 object-fill object-top rounded-md ${!isStockEmpty && 'grayscale'}`}
            loading="lazy"
          />
        </div>
        <div className="p-2">
          <div className="px-1 flex flex-col gap-1">
            
            <h1
              className={` ${
                !isStockEmpty && "line-through"
              } text-nowrap overflow-hidden text-sm text-ellipsis font-roboto capitalize w-full`}
            >
              {product.name}
            </h1>
            {product.discount > 0 && (
              <p className="text-xs text-primary w-1/2 underline">
                Promo {product.discount}%
              </p>
            )}
            <p className="text-sm font-serif text-orange-600 flex gap-2 items-center">
              {formatNumberIDR(
                calculateDiscount(product.price, product.discount)
              )}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CardList;
