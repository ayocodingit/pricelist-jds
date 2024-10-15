import React, { useEffect, useRef, useState } from "react";
import { getAllCart, moveToCheckOut, removeAllCart } from "../repository/carts";
import { BsArrowLeft } from "react-icons/bs";
import CartList from "../components/CartList";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

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
    <div className=" text-md flex flex-col items-center w-full">
      <div className="flex gap-2 p-5 items-center bg-primary text-white shadow-lg sticky top-0 z-10 w-full md:w-1/2 h-14">
        <BsArrowLeft
          className=" p-1 text-3xl"
          onClick={() => navigate("/list")}
        />
        <p className="text-md">Cart ({products.length})</p>
        <FaRegTrashAlt
          className="text-lg absolute right-2"
          onClick={() => {
            removeAllCart();
            setIsChange(true);
          }}
        />
      </div>

      {products.length === 0 && (
        <div className="h-96 flex justify-center text-md items-center">
          Cart is Empty
        </div>
      )}

      {products.length > 0 && (
        <div className="p-2 flex flex-col gap-2 md:items-center w-full md:w-1/2">
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
          {checkTotal > 0 && (
            <button onClick={() => {
              moveToCheckOut(products)
              navigate(`/checkout/${username}`)
            }} className="flex bg-primary w-full justify-center h-10 text-white items-center">
              Buy Now
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
