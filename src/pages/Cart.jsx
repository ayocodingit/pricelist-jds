import React, { useEffect, useState } from "react";
import { getAllCart, moveToCheckOut, removeAllCart } from "../repository/carts";
import { BsArrowLeft, BsShop } from "react-icons/bs";
import CartList from "../components/CartList";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { formatNumberIDR } from "../utils/formatter";
import ModalCustomer from "../components/ModalCustomer";
import { getCustomer } from "../repository/customer";

function Cart() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [isChange, setIsChange] = useState(false);
  const [username, setUsername] = useState("");
  const [checkTotal, setCheckTotal] = useState(0);
  const [ids, setIds] = useState([]);
  const [isModalCustomer, setIsModalCustomer] = useState(false);

  useEffect(() => {
    setProducts(getAllCart(username));
    setIsChange(false);
  }, [isChange, checkTotal, username, ids]);

  return (
    <div className="bg-gray-50 text-md md:justify-center flex relative min-h-[calc(100dvh)]">
      <div className="w-full md:w-1/2 items-center">
        <div className="flex gap-2 py-5 px-2 justify-between items-center shadow-md sticky top-0 z-10 bg-gray-50">
          <BsArrowLeft
            className="p-1 text-3xl hover:cursor-pointer"
            onClick={() => navigate("/list")}
          />
          <p>My Cart List ({getAllCart().length})</p>
          <FaRegTrashAlt
            className="text-lg"
            onClick={() => {
              removeAllCart();
              setIsChange(true);
            }}
          />
        </div>

        {products.length === 0 && (
          <div className="flex justify-center items-center min-h-96">
            Cart is Empty
          </div>
        )}

        {products.length > 0 && (
          <div
            className={`py-4 px-2 flex flex-col max-h-[calc(${
              ids.length ? "75dvh" : "100dvh"
            })] w-full overflow-auto`}
          >
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
        {ids.length > 0 && (
          <div className="fixed bottom-0 z-10 text-sm h-14 flex w-full md:w-1/2 rounded-md  items-center gap-2 bg-white shadow-lg justify-between">
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
            ) : (
              <div></div>
            )}
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
                  if (checkTotal != 0 && getCustomer()?.customer) {
                    moveToCheckOut(products);
                    return navigate(`/checkout/${username}`);
                  }
                  if (!getCustomer()?.customer) {
                    setIsModalCustomer(true);
                  }
                }}
              >
                Checkout ({ids.length})
              </p>
            </div>
          </div>
        )}
        <ModalCustomer
          setIsModalCustomer={setIsModalCustomer}
          isModalCustomer={isModalCustomer}
        />
      </div>
    </div>
  );
}

export default Cart;
