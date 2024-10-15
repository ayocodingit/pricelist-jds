import React, { useState } from "react";
import { calculateDiscount, formatNumberIDR } from "../utils/formatter";
import { Link, useNavigate } from "react-router-dom";
import { moveToCheckOut, removeItemCart } from "../repository/carts";
import { FaRegTrashAlt } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

function CartList({
  product,
  setIsChange,
  setUsername,
  setCheckTotal,
  checkTotal,
  ids,
  setIds,
}) {  
  const navigate = useNavigate();
  return (
    <div className="text-sm text-black rounded-lg bg-white gap-2 p-4 h-44 flex w-full shadow-lg relative">
      <input
        type="checkbox"
        checked={ids.includes(product.id)}
        className="w-8 "
        onChange={(e) => {
          if (e.target.checked) {
            setCheckTotal((prev) => prev + 1);
            setUsername(product.username);
            setIds((prev) => {
              if (!prev.includes(product.id)) {
                return prev.push(product.id);
              }
              return prev
            });
          } else {
            setCheckTotal((prev) => {
              const total = prev - 1;
              setIds((ids) => ids.filter((id) => id != product.id));
              if (total == 0) setUsername("");
              return total;
            });
          }
        }}
      />
      <img src={product.image} alt="" className="w-1/3 object-contain " />
      <div className="w-full flex flex-col p-2 gap-2 relative">
        {product.discount > 0 ? (
          <p className="text-xs text-primary flex gap-1 items-center">
            <span className="underline">Discount {product.discount}%</span>
            {product.discount > 0 && (
              <span className="line-through text-black">
                {formatNumberIDR(product.price)}
              </span>
            )}
          </p>
        ) : (
          <p className="text-xs">&nbsp;</p>
        )}
        <p className="font-bold text-md">{product.name}</p>
        <p className="text-sm font-serif text-orange-600 flex gap-2 items-center">
          {formatNumberIDR(calculateDiscount(product.price, product.discount))}
        </p>
        <p className="flex text-sm">Quantity {product.qty}</p>
        {!checkTotal && (
          <div className="absolute bottom-0 flex justify-between w-full md:w-1/2 gap-2">
            <button
              onClick={() => {
                moveToCheckOut([product]);
                navigate(`/checkout/${product.username}`);
              }}
              className="bg-primary text-white rounded-md text-center w-1/2"
            >
              Buy Now
            </button>
            <button
              onClick={() => {
                navigate(`/list/${product.id}?qty=${product.qty}`);
              }}
              className="bg-orange-500 text-white rounded-md text-center w-1/2"
            >
              Edit
            </button>
          </div>
        )}
        <CgClose
          className="text-xl absolute right-1 top-0 hover: cursor-pointer"
          onClick={() => {
            removeItemCart(product.id);
            setIsChange(true);
          }}
        />
      </div>
    </div>
  );
}

export default CartList;
