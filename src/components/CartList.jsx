import React, { useEffect, useState } from "react";
import { calculateDiscount, formatNumberIDR } from "../utils/formatter";
import { useNavigate } from "react-router-dom";
import { removeItemCart } from "../repository/carts";
import { CgClose } from "react-icons/cg";
import { BsPencil } from "react-icons/bs";
import Skeleton from "./Skeleton";

function CartList({
  product,
  products,
  setProducts,
  setUsername,
  setCheckTotal,
}) {
   const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  const navigate = useNavigate();
  const totalPrice = calculateDiscount(
    product.price * product.qty,
    product.discount
  );

  return (
    <div className=" text-black flex flex-col relative">
      <div className="flex px-2 gap-4 items-center border-b-[1px] py-1">
        <input
          type="checkbox"
          checked={products.some(({ id }) => id == product.id)}
          className="accent-primary w-8 h-4 peer rounded"
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
          <p className="">{product.name}</p>
          <p className=" font-[sans-serif] text-primary flex gap-2 items-center">
            <span className="text-md">{formatNumberIDR(totalPrice)}</span>
            {product.discount > 0 && (
              <span className="bg-green-100  text-primary p-1 rounded-md text-xs">
                -{product.discount}%
              </span>
            )}
          </p>
          <div className="flex text-xs mt-1 justify-between">
            <p className="w-1/2">Catatan: </p>
            <span className="w-1/2">Jumlah: {product.qty}</span>
          </div>
          <span className="text-gray-600 text-xs italic">
            {product.note || ""}
          </span>
        </div>
        <div className="flex gap-2 flex-col border-l-[1px] border-black p-2 items-center">
          <div
            onClick={() => {
              navigate(
                `/list/${product.id}?qty=${product.qty}&note=${
                  product.note ?? ""
                }`
              );
            }}
            className="hover: cursor-pointer"
          >
            <BsPencil />
          </div>
          <CgClose
            className="text-xl hover: cursor-pointer"
            onClick={() => {
              if (products.some(({ id }) => id == product.id)) {
                setCheckTotal((total) => total - totalPrice);
              }
              setProducts((prev) => prev.filter(({ id }) => id != product.id));
              removeItemCart(product.id);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CartList;
