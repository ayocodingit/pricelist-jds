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
        <div className="flex gap-2 py-2 px-2 justify-between items-center shadow-sm sticky top-0 z-10 bg-primary text-white">
          <BsArrowLeft
            className="p-1 text-3xl hover:cursor-pointer"
            onClick={() => navigate("/list")}
          />
          <p>My Cart List ({getAllCart().length})</p>
          <FaRegTrashAlt
            className="text-lg hover: cursor-pointer"
            onClick={() => {
              removeAllCart();
              setIsChange(true);
            }}
          />
        </div>

        {products.length === 0 && (
          <div className="flex justify-center items-center h-[calc(75dvh)] bg-white">
            Cart is Empty
          </div>
        )}

        {products.length > 0 && (
          <div
            className={`py-1 px-2 flex flex-col md:h-[calc(74dvh)] h-[calc(75dvh)] w-full overflow-auto bg-white`}
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
        <div className="fixed bottom-0 text-sm py-4 flex w-full md:w-1/2  items-center gap-2 bg-white shadow-xl justify-between">
          <div className=" flex flex-col w-full items-center gap-3 px-5 py-2">
            <div className="flex justify-between w-full  items-center">
              <p className="first-letter:capitalize">{username ? 'seller' : 'Silahkan Pilih Produk terlebih dahulu'}</p>
              <p>{username && '@' + username}</p>
            </div>
            <div className="flex justify-between w-full  items-center">
              <p>Selected Items({ids.length})</p>
              <p>Total : {formatNumberIDR(checkTotal)}</p>
            </div>
            <button
              className={`w-full bg-primary text-white flex justify-center rounded-lg p-2 ${
                checkTotal != 0 && "hover:cursor-pointer hover:opacity-90"
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
              Check out
            </button>
          </div>
        </div>
        <ModalCustomer
          setIsModalCustomer={setIsModalCustomer}
          isModalCustomer={isModalCustomer}
        />
      </div>
    </div>
  );
}

export default Cart;
