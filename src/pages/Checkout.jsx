import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUser } from "../repository/users";
import PaymentList from "../components/PaymentList";
import { getByID } from "../repository/produts";
import CopyToClipboard from "react-copy-to-clipboard";
import { Flip, toast } from "react-toastify";
import { calculateDiscount, formatNumberIDR } from "../utils/formatter";
import { BsShop } from "react-icons/bs";
import {
  getAllCart,
  getAllCheckout,
  removeAllCheckout,
} from "../repository/carts";
import { TelegramShareButton } from "react-share";
import { AiOutlineSend, AiOutlineMessage, AiOutlinePrinter } from "react-icons/ai";
import SocialMedia from "../components/SocialMedia";

function Checkout() {
  const [user, setUser] = useState(null);
  const [total, setTotal] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [products, setProducts] = useState([]);
  const { username } = useParams();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const productDetail = getAllCheckout();
    const userDetail = getUser(username);

    if (userDetail && productDetail) {
      setUser(userDetail);
      setProducts(productDetail);

      let tmpTotal = 0;
      let tmpTotalQty = 0;
      let message = "";

      productDetail.forEach((product) => {
        tmpTotal += product.qty * product.price;
        tmpTotalQty += product.qty;
        message += `**${product.name}** - ${product.qty}`;
      });

      setTotal(tmpTotal);
      setTotalQty(tmpTotalQty);
      setTitle(`aku beli produkmu yah 😁,

${message}

saya sudah tf yups! tolong di ceki ceki
Hatur nuhun~ ✨`);
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
    <div className="flex flex-col bg-gray-50 print:bg-white items-center w-full md:justify-center p-5 gap-4 print:w-full relative print:h-[calc(100dvh)] print:justify-normal">
      <div className="text-md flex flex-col gap-2 items-center md:w-1/2">
        <Link to={"/list"}>
          <BsShop className="text-5xl" />
        </Link>
        <p>{user.name_card}</p>
      </div>

      <div className="flex flex-col gap-3 p-2 w-full bg-white text-md md:w-1/2 print:w-full print:mt-10">
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
        <div className="bg-white w-full flex border-t-2 py-3 justify-between">
          <p>Total Quantity : {totalQty}</p>
          <p>{formatNumberIDR(total)}</p>
        </div>
      </div>
      <p className="font-bold p-2 text-md text-center ">
        Thank you for your purchase. <br />
        Don't forget to confirm with the seller if you have paid. 😁
      </p>
      <p className="text-md font-bold text-center md:w-1/2 print:hidden">Confirm Order</p>

      <div className="w-full md:w-1/3 flex flex-col items-center gap-5 print:hidden">
        <textarea className="rounded-md outline-2 font-serif  outline-dotted p-2 w-full h-44 bg-gray-50 shadow-lg" onChange={(e) => setTitle(e.target.value)}>
          {title}
        </textarea>
        <div className="flex gap-2">

        <SocialMedia title={title} size={30} />
        <AiOutlinePrinter className="hover:cursor-pointer text-3xl" title="Print Order" onClick={() => window.print()}/>
        </div>
      </div>

      <p className="text-md text-center md:w-1/2 print:hidden">
        Payment Method
      </p>

      <div className="w-full flex p-2 gap-2 md:w-1/2 overflow-y-auto print:hidden">
        {user.payments.map((payment, index) => {
          return <PaymentList payment={payment} key={index} />;
        })}
      </div>
    </div>
  );
}

export default Checkout;
