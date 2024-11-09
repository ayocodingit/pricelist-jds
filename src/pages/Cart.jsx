import React, { useEffect, useState } from "react";
import {
  getAllCart,
  moveToCheckOut,
  removeAllCart,
  removesItemCart,
} from "../repository/carts";
import { BsArrowLeft, BsShop } from "react-icons/bs";
import CartList from "../components/CartList";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { calculateDiscount, formatNumberIDR } from "../utils/formatter";
import ModalCustomer from "../components/ModalCustomer";
import { checkCompleteCustomer } from "../repository/customer";
import { fetchProducts, getByIDs } from "../repository/produts";
import Loading from "../components/Loading";
import Menu from "../components/Menu";
import { SlArrowLeft } from "react-icons/sl";

function Cart() {
  const [carts, setCarts] = useState([]);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [checkTotal, setCheckTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [isModalCustomer, setIsModalCustomer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isLoading]);

  useEffect(() => {
    fetchProducts().then((res) => {
      if (products.length === 0) {
        setUsername("");
        setCheckTotal(0);
      }

      const carts = getAllCart(username);
      const items = [];
      const users = [];

      carts.forEach(({ username: seller }) => {
        if (users.includes(seller)) return;
        users.push(seller);

        const idsCart = getAllCart(seller).map((product) => product.id);
        const tmpItems = [];
        let total = 0;

        for (const product of getByIDs(res, idsCart)) {
          const cart = carts.filter((cart) => cart.id === product.id)[0];

          // check stock available
          if (cart.qty > product.stock) continue;

          tmpItems.push({
            ...product,
            ...cart,
          });
          total += calculateDiscount(
            product.price * cart.qty,
            product.discount
          );
        }

        if (tmpItems.length > 0) {
          items.push({
            total,
            seller,
            products: tmpItems,
          });
        }
      });

      setCarts(items);
    });
  }, [products, username]);

  return (
    <div className="bg-gray-50 text-sm  md:text-md flex flex-col relative h-[calc(100dvh)]">
      <div className="flex gap-4 py-3 px-4 bg-white items-center sticky top-0 z-10 shadow-sm">
        <SlArrowLeft
          className="text-xl hover:cursor-pointer"
          onClick={() => navigate("/list")}
        />
        <p>Keranjang Saya ({getAllCart().length})</p>
        {/* <FaRegTrashAlt
            className="text-lg hover: cursor-pointer"
            onClick={() => {
              if (products.length === 0) {
                removeAllCart();
              } else {
                removesItemCart(products.map((product) => product.id));
              }
              setProducts([]);
            }}
          /> */}
      </div>
      <div className="w-full flex gap-2 items-center">
        <div className="w-full md:w-full items-center shadow-md rounded-md">
          {carts.length === 0 && !isLoading && (
            <div className="flex justify-center items-center h-[calc(73dvh)] md:h-[calc(86dvh)]">
              Keranjang masih Kosong
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center items-center h-[calc(73dvh)] md:h-[calc(86dvh)]">
              <Loading />
            </div>
          )}

          {carts.length > 0 && !isLoading && (
            <div
              className={` flex flex-col h-[calc(73dvh)] w-full md:h-[calc(86dvh)]  overflow-auto text-sm rounded-md`}
            >
              {carts.map((cart, index) => {
                return (
                  <div key={index}>
                    <div className="text-black flex gap-2 items-center font-bold bg-white mt-2 pt-2">
                      <input
                        type="checkbox"
                        className="accent-primary w-8 h-4"
                        checked={username == cart.seller}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUsername(cart.seller);
                            setProducts(cart.products);
                            setCheckTotal(cart.total);
                          } else {
                            setProducts([]);
                          }
                        }}
                      />
                      <BsShop className="text-xl" />@{cart.seller}
                    </div>
                    {cart.products.map((product, index) => {
                      return (
                        <CartList
                          product={product}
                          key={index}
                          setProducts={setProducts}
                          setUsername={setUsername}
                          setCheckTotal={setCheckTotal}
                          setIsLoading={setIsLoading}
                          products={products}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}

          <ModalCustomer
            setIsModalCustomer={setIsModalCustomer}
            isModalCustomer={isModalCustomer}
          />
        </div>

        <div
          className={`text-sm hidden md:flex w-1/2 items-center h-full shadow-md rounded-md bg-white justify-between`}
        >
          <div className="flex flex-col w-full items-center gap-2 px-5 py-2">
            <div className="flex justify-between w-full  items-center">
              <p className="first-letter:capitalize">Penjual</p>
              <p>{username && "@" + username}</p>
            </div>
            <div className="flex justify-between w-full  items-center">
              <p>Produk Terpilih ({products.length})</p>
              <p>Total Bayar: {formatNumberIDR(checkTotal)}</p>
            </div>
            <button
              className={`w-full bg-primary text-white flex justify-center rounded-md p-2 gap-2 ${
                products.length != 0 && "hover:cursor-pointer hover:opacity-90"
              } `}
              disabled={products.length === 0}
              onClick={() => {
                if (!checkCompleteCustomer()) return setIsModalCustomer(true);

                moveToCheckOut(products);
                return navigate(`/checkout/${username}`);
              }}
            >
              {products.length > 0 ? "Proses Bayar" : "Silahkan Pilih Produk"}
            </button>
          </div>
        </div>
      </div>
      <Menu>
        <div
          className={`text-sm md:hidden flex w-full items-center border-y bg-white shadow-xl justify-between`}
        >
          <div className="flex flex-col w-full items-center gap-2 px-5 py-2">
            <div className="flex justify-between w-full  items-center">
              <p className="first-letter:capitalize">Penjual</p>
              <p>{username && "@" + username}</p>
            </div>
            <div className="flex justify-between w-full  items-center">
              <p>Produk Terpilih ({products.length})</p>
              <p>Total Bayar: {formatNumberIDR(checkTotal)}</p>
            </div>
            <button
              className={`w-full bg-primary text-white flex justify-center rounded-md p-2 gap-2 ${
                products.length != 0 && "hover:cursor-pointer hover:opacity-90"
              } `}
              disabled={products.length === 0}
              onClick={() => {
                if (!checkCompleteCustomer()) return setIsModalCustomer(true);

                moveToCheckOut(products);
                return navigate(`/checkout/${username}`);
              }}
            >
              {products.length > 0 ? "Proses Bayar" : "Silahkan Pilih Produk"}
            </button>
          </div>
        </div>
      </Menu>
    </div>
  );
}

export default Cart;
