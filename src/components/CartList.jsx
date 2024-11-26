import React from "react";
import { calculateDiscount, formatNumberIDR } from "../utils/formatter";
import { useNavigate } from "react-router-dom";
import { removeItemCart } from "../repository/carts";
import { SlPencil, SlTrash } from "react-icons/sl";
import { Checkbox } from "@nextui-org/react";

function CartList({
  product,
  products,
  setProducts,
  setUsername,
  setCheckTotal,
  setIsLoading,
}) {
  const navigate = useNavigate();
  
  let totalPrice = (product.price * product.qty) - product.voucher;

  return (
    <div className=" text-black flex flex-col relative bg-white shadow-sm">
      <div className="flex px-2 gap-4 items-center py-1">
        <Checkbox
          isSelected={products.some(({ id }) => id == product.id)}
          size="md"
          className="flex items-center ml-[0px]"
          onChange={(e) => {
            if (e.target.checked) {
              setProducts((prev) => {
                setCheckTotal((total) => total + totalPrice);
                setUsername(product.username);
                if (!prev.some(({ id }) => id == product.id)) {
                  prev.push(product);
                }
                return prev;
              });
            } else {
              setCheckTotal((total) => total - totalPrice);
              setProducts((prev) => prev.filter(({ id }) => id != product.id));
            }
          }}
        />

        <div className="w-40 rounded-md">
          <img
            src={product.image}
            alt="image product"
            className="h-24 p-2 w-full rounded-xl object-contain "
            loading="lazy"
          />
        </div>
        <div className="w-full flex flex-col relative">
          <p className="">
            {product.name}{" "}
            {product.variant && (
              <span className="capitalize font-bold">- {product.variant}</span>
            )}
          </p>
          <p className=" font-[sans-serif] text-primary flex gap-2 items-center">
            <span className="text-base">{formatNumberIDR(totalPrice)}</span>
            {product.discount > 0 && (
              <span className="bg-primary  text-white p-1 rounded-md text-xs">
                -{product.discount}%
              </span>
            )}
          </p>
          <p className="rounded-md text-xs">
            hemat: {formatNumberIDR(product.voucher)}
          </p>
          <div className="flex text-xs mt-1 justify-between">
            <p className="w-1/2">Catatan: </p>
            <span className="w-1/2">Jumlah: {product.qty}</span>
          </div>
          <span className="text-gray-600 text-xs italic">
            {product.note || ""}
          </span>
        </div>
        <div className="flex gap-5 flex-col border-black items-center p-2 justify-center h-20">
          <div
            onClick={() => {
              navigate(`/list/${product.productId}?id=${product.id}`);
            }}
            className="hover: cursor-pointer"
          >
            <SlPencil className="text-lg" />
          </div>
          <SlTrash
            className="text-xl hover: cursor-pointer text-red-600"
            onClick={() => {
              if (products.some(({ id }) => id == product.id)) {
                setCheckTotal((total) => total - totalPrice);
              }
              setProducts((prev) => prev.filter(({ id }) => id != product.id));
              removeItemCart(product.id);
              setIsLoading(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CartList;
