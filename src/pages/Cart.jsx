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
import Skeleton from "../components/Skeleton";

function Cart() {
  const [carts, setCarts] = useState([]);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [checkTotal, setCheckTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [isModalCustomer, setIsModalCustomer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, [products, username]);

  return (
    <div className="bg-gray-50 text-md md:justify-center flex relative min-h-[calc(100dvh)] md:h-auto">
      <div className="w-full md:w-1/2 items-center">
        <div className="flex gap-2 py-2 px-2 justify-between items-center shadow-sm sticky top-0 z-10 bg-primary text-white">
          <BsArrowLeft
            className="p-1 text-3xl hover:cursor-pointer"
            onClick={() => navigate("/list")}
          />
          <p>Keranjang Saya ({getAllCart().length})</p>
          <FaRegTrashAlt
            className="text-lg hover: cursor-pointer"
            onClick={() => {
              if (products.length === 0) {
                removeAllCart();
              } else {
                removesItemCart(products.map((product) => product.id));
              }
              setProducts([]);
            }}
          />
        </div>

        {carts.length === 0 && (
          <div className="flex justify-center items-center h-[calc(75dvh)] bg-white">
            Keranjang masih Kosong
          </div>
        )}

        {carts.length > 0 && (
          <div
            className={` flex flex-col md:h-[calc(74dvh)] h-[calc(75dvh)]  w-full overflow-auto bg-white text-sm`}
          >
            {carts.map((cart, index) => {
              return (
                <div key={index} className="border-b-[1px] border-primary">
                  <div className="text-black py-2  flex gap-1 items-center font-bold">
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
                        products={products}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
        <div className="fixed md:relative bottom-0 text-sm py-4 flex w-full items-center gap-2 border-t bg-white shadow-xl justify-between">
          <div className=" flex flex-col w-full items-center gap-3 px-5 py-2">
            <div className="flex justify-between w-full  items-center">
              <p className="first-letter:capitalize">Penjual</p>
              <p>
                {!isLoading ? (
                  username && "@" + username
                ) : (
                  <Loading size={15} />
                )}
              </p>
            </div>
            <div className="flex justify-between w-full  items-center">
              <p>
                Produk Terpilih{" "}
                {!isLoading ? (
                  `(${products.length})`
                ) : (
                  <Loading size={15} color="#000" />
                )}
              </p>
              <p>
                Total Bayar:{" "}
                {!isLoading ? (
                  formatNumberIDR(checkTotal)
                ) : (
                  <Loading size={15} />
                )}
              </p>
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
              {products.length > 0 ? 'Proses Bayar' : 'Silahkan Pilih Produk Terlebih Dahulu'}
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
