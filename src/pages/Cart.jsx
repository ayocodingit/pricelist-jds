import React, { useEffect, useState } from "react";
import { getAllCart, moveToCheckOut, removeAllCart } from "../repository/carts";
import { BsArrowLeft, BsShop } from "react-icons/bs";
import CartList from "../components/CartList";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { formatNumberIDR } from "../utils/formatter";

function Cart() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [isChange, setIsChange] = useState(false);
  const [username, setUsername] = useState("");
  const [checkTotal, setCheckTotal] = useState(0);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    setProducts(getAllCart(username));
    setIsChange(false);
  }, [isChange, checkTotal, username, ids]);

  return (
    <div className=" text-md flex flex-col items-center w-full relative min-h-[calc(100dvh)]">
      <div className="flex gap-2 p-5 justify-between items-center bg-primary text-white shadow-lg sticky top-0 z-10 w-full md:w-1/2 h-14 ">
        <BsArrowLeft
          className=" p-1 text-3xl"
          onClick={() => navigate("/list")}
        />
        <p className="text-md">Cart ({products.length})</p>
        <FaRegTrashAlt
          className="text-lg"
          onClick={() => {
            removeAllCart();
            setIsChange(true);
          }}
        />
      </div>

      {products.length === 0 && (
        <div className="flex justify-center text-md items-center h-[calc(85dvh)] w-full md:w-1/2">
          Cart is Empty
        </div>
      )}

      {products.length > 0 && (
        <div className="p-4 flex flex-col gap-4 md:items-center w-full h-[calc(85dvh)] md:w-1/2 overflow-x-hidden border-x-2 border-white">
          {products.map((product, index) => {
            return (
              <CartList
                product={product}
                key={index}
                setIsChange={setIsChange}
                setUsername={setUsername}
                checkTotal={checkTotal}
                setCheckTotal={setCheckTotal}
                setIds={setIds}
                ids={ids}
              />
            );
          })}
        </div>
      )}
      <div className="fixed bottom-0 z-10 text-sm h-14 flex w-full md:w-1/2 rounded-md  items-center gap-2 bg-white font-md justify-between">
        {ids.length > 0 ? (
          <div className="flex gap-2 pl-6 items-center">
            <input
              type="checkbox"
              checked={ids.length}
              className="accent-primary w-5 h-5"
              onChange={(e) => {
                setIds([]);
                setUsername("");
                setCheckTotal(0);
              }}
            />

            <p className="flex gap-2">
              <BsShop className="text-xl " />
              {username}
            </p>
          </div>
        ) : <div></div>}
        <div className="  h-full flex items-center gap-3">
          <div className="flex flex-col items-center">
            <p>Total</p>
            <p>{formatNumberIDR(checkTotal)}</p>
          </div>
          <p
            className={`h-full bg-primary text-white flex items-center p-2 ${
              checkTotal != 0 && "hover:cursor-pointer"
            } `}
            onClick={() => {
              if (checkTotal != 0) {
                moveToCheckOut(products);
                navigate(`/checkout/${username}`);
              }
            }}
          >
            Checkout ({ids.length})
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
