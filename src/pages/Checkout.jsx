import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUser } from "../repository/users";
import PaymentList from "../components/PaymentList";
import { getByID } from "../repository/produts";
import CopyToClipboard from "react-copy-to-clipboard";
import { Flip, toast } from "react-toastify";
import { calculateDiscount, formatNumberIDR } from "../utils/formatter";
import { BsShop } from "react-icons/bs";
import { getAllCart, getAllCheckout, removeAllCheckout } from "../repository/carts";

function Checkout() {
  const [user, setUser] = useState(null);
  const [total, setTotal] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [products, setProducts] = useState([]);
  const { username } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const productDetail = getAllCheckout();
    const userDetail = getUser(username);

    if (userDetail && productDetail) {
      setUser(userDetail);
      setProducts(productDetail);

      let tmpTotal = 0;
      let tmpTotalQty = 0;

      productDetail.forEach((product) => {
        tmpTotal += product.qty * product.price;
        tmpTotalQty += product.qty;
      });

      setTotal(tmpTotal);
      setTotalQty(tmpTotalQty);
    }
  }, []);

  const alert = () => {
    toast.success("Copied on Clipboard", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Flip,
    });
  };

  if (!user || products.length == 0) {
    return navigate("/404");
  }

  return (
    <div className="flex flex-col bg-gray-50 items-center w-full md:justify-center p-5 gap-5 mt-5">
      <div className="text-md flex flex-col gap-2 items-center md:w-1/2">
        <Link to={"/list"}>
          <BsShop className="text-5xl" />
        </Link>
        <p>{user.name_card}</p>
      </div>

      <div className="flex flex-col gap-3 p-2 w-full bg-white text-md md:w-1/2 shadow-lg rounded-lg">
        {products.map((product, index) => {
          return (
            <div className=" flex flex-col gap-1" key={index}>
              <p className="font-bold ">
                {index + 1}. {product.name}
              </p>
              <div className="flex justify-between">
                <p className="px-4">
                  {product.qty} x {product.price}
                </p>
                <p>{formatNumberIDR(product.qty * product.price)}</p>
              </div>
            </div>
          );
        })}
        <div className="bg-white w-full flex border-y-2 py-3 justify-between">
          <p>Total Quantity : {totalQty}</p>
          <p>{formatNumberIDR(total)}</p>
        </div>
        <p className="font-bold p-2 text-md text-center">
          Thank you for your purchase. <br />
          Don't forget to confirm with the seller if you have paid. 😁
        </p>
      </div>

      <p className="text-md text-center md:w-1/2">Payment Method</p>

      <div className="w-full grid grid-cols-2 p-2 gap-2 md:w-1/2">
        {user.payments.map((payment, index) => {
          return <PaymentList payment={payment} key={index} />;
        })}
      </div>
    </div>
  );
}

export default Checkout;
