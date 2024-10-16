import React from "react";
import { calculateDiscount, formatNumberIDR } from "../utils/formatter";
import { useNavigate } from "react-router-dom";
import { removeItemCart } from "../repository/carts";
import { CgClose } from "react-icons/cg";
import { BsPencil, BsShop } from "react-icons/bs";

function CartList({
  product,
  setIsChange,
  setUsername,
  setCheckTotal,
  ids,
  setIds,
}) {
  const navigate = useNavigate()
  const totalPrice = calculateDiscount(product.price, product.discount);
  return (
    <div className="text-sm text-black rounded-lg bg-white flex flex-col w-full shadow-lg relative">
      <div className="flex justify-between w-full bg-primary text-white items-center p-2 rounded-t-lg">
        <div className="flex gap-2 items-center">
          <BsShop className="text-xl " />
          {product.username}
        </div>
        <div className="flex gap-2 items-center">
          { ids.length == 0 && (
            <div
            onClick={() => {
              navigate(`/list/${product.id}?qty=${product.qty}`);
            }}
            className="hover: cursor-pointer"
          >
            <BsPencil />
          </div>
          ) }
          
          <CgClose
            className="text-xl hover: cursor-pointer"
            onClick={() => {
              removeItemCart(product.id);
              setIsChange(true);
            }}
          />
        </div>
      </div>
      <div className="flex gap-4 w-full p-2 items-center">
        <input
          type="checkbox"
          checked={ids.includes(product.id)}
          className="accent-primary w-6 h-10"
          onChange={(e) => {
            if (e.target.checked) {
              setCheckTotal((prev) => prev + totalPrice);
              setUsername(product.username);
              setIds((prev) => {
                if (!prev.includes(product.id)) {
                  return prev.push(product.id);
                }
                return prev;
              });
            } else {
              setCheckTotal((prev) => {
                const total = prev - totalPrice;
                setIds((ids) => ids.filter((id) => id != product.id));
                if (total == 0) setUsername("");
                return total;
              });
            }
          }}
        />
        <img
          src={product.image}
          alt="image product"
          className="h-12 w-1/5  object-contain"
        />
        <div className="w-full flex flex-col gap-1 relative">
          <p className="text-sm">{product.name}</p>
          <p className="text-sm font-serif text-orange-600 flex gap-2 items-center">
            <span className="text-md">{formatNumberIDR(totalPrice)}</span>
            {product.discount > 0 && (
              <span className="bg-green-100  text-primary p-1 rounded-md text-xs">
                -{product.discount}%
              </span>
            )}
          </p>
          <p className="flex text-xs">Quantity {product.qty}</p>
        </div>
      </div>
    </div>
  );
}

export default CartList;
