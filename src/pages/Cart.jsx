import React, { useEffect, useState } from "react";
import { getAllCart, moveToCheckOut } from "../repository/carts";
import CartList from "../components/CartList";
import { useNavigate } from "react-router-dom";
import { calculateDiscount, formatNumberIDR } from "../utils/formatter";
import { checkCompleteCustomer } from "../repository/customer";
import { fetchProducts, getByIDs } from "../repository/produts";
import Loading from "../components/Loading";
import Menu from "../components/Menu";
import { SlArrowLeft } from "react-icons/sl";
import { Button } from "@nextui-org/react";
import ModalCustomer2 from "../components/ModalCustomer2";
import promo from "../utils/promo";

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

        const idsCart = getAllCart(seller).map((product) => product.productId);
        const tmpItems = [];
        let total = 0;

        for (const product of getByIDs(res, idsCart)) {
          const cart = carts.filter(
            (cart) => cart.id === `${product.id}-${cart.variant}`
          );

          for (const cart2 of cart) {
            let voucher = calculateDiscount(product.price,product.discount) * cart2.qty
            if (product?.promo) {
              const { requirement, code } = product.promo;
              voucher += promo[code](
                cart2.qty,
                requirement.min,
                requirement.discount
              );              
            }
            tmpItems.push({
              ...product,
              ...cart2,
              voucher
            });
            total += (product.price * cart2.qty) - product.discount;
          }
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
    <div className="bg-gray-50 text-sm  md:text-base flex flex-col relative h-[calc(100dvh)]">
      <div className="flex gap-4 py-3 px-4 bg-white items-center justify-center sticky top-0 z-10 shadow-sm">
        <p className="text-base">Keranjang Saya ({getAllCart().length})</p>
      </div>
      <div className="w-full flex gap-2 items-center">
        <div className="w-full md:w-full items-center shadow-md rounded-md">
          {carts.length === 0 && !isLoading && (
            <div className="flex justify-center items-center h-[calc(74dvh)] md:h-[calc(86dvh)]">
              Keranjang masih Kosong
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center items-center h-[calc(74dvh)] md:h-[calc(86dvh)]">
              <Loading />
            </div>
          )}

          {carts.length > 0 && !isLoading && (
            <div
              className={` flex flex-col h-[calc(74dvh)] w-full md:h-[calc(86dvh)]  overflow-auto text-sm rounded-md no-scrollbar`}
            >
              {carts.map((cart, index) => {
                return (
                  <div key={index} className="">
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

          <ModalCustomer2
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
            <Button
              className={`w-full flex justify-center rounded-md p-2 gap-2 ${
                products.length != 0 &&
                "bg-primary text-white hover:cursor-pointer hover:opacity-90"
              } `}
              disabled={products.length === 0}
              onClick={() => {
                if (!checkCompleteCustomer()) return setIsModalCustomer(true);

                moveToCheckOut(products);
                return navigate(`/checkout/${username}`);
              }}
            >
              {products.length > 0 ? "Proses Bayar" : "Silahkan Pilih Produk"}
            </Button>
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
