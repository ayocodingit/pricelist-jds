import React, { useState } from "react";
import { calculateDiscount, formatNumberIDR } from "../utils/formatter";
import { Link, useNavigate } from "react-router-dom";
import { removeItemCart } from "../repository/carts";

function CartList({ product }) {
  const navigate = useNavigate();
  return (
    <div className="text-sm text-black rounded-lg bg-white gap-2 p-2 h-40 flex">
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
        <button
          onClick={() => {
            removeItemCart(product.id);
            navigate(
              `/payment/${product.id}/${product.username}/${product.qty}`
            );
          }}
          className="bg-primary text-white rounded-md absolute bottom-0 w-1/2 text-center"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default CartList;
