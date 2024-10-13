import React, { useEffect, useRef, useState } from "react";
import { getAllCart, removeAllCart } from "../repository/carts";
import { BsArrowLeft } from "react-icons/bs";
import CartList from "../components/CartList";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

function Cart() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [isChange, setIsChange] = useState(false)

  useEffect(() => {
    setProducts(getAllCart());
  }, [isChange]);

  return (
    <div className="bg-gray-50 text-md ">
      <div className="flex gap-2 p-2 items-center bg-primary text-white shadow-lg sticky top-0 z-10">
        <BsArrowLeft
          className=" p-1 text-3xl"
          onClick={() => navigate("/list")}
        />
        <p>Cart ({products.length})</p>
        <FaRegTrashAlt className="text-xl absolute right-2" onClick={() => {removeAllCart(); setIsChange(true)}}/>
      </div>

      {products.length === 0 && (
        <div className="h-96 flex justify-center text-md items-center">
          Cart is Empty
        </div>
      )}

      {products.length > 0 && (
        <div className="p-2 flex flex-col gap-2">
          {products.map((product, index) => {
            return <CartList product={product} key={index} setIsChange={setIsChange} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Cart;
