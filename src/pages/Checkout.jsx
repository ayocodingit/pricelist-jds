import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUser } from "../repository/users";
import PaymentList from "../components/PaymentList";
import { Flip, toast } from "react-toastify";
import { formatNumberIDR } from "../utils/formatter";
import { BsShop } from "react-icons/bs";
import { getAllCheckout } from "../repository/carts";
import { AiOutlinePrinter } from "react-icons/ai";
import SocialMedia from "../components/SocialMedia";
import "./checkout.css";

function Checkout() {
  const [user, setUser] = useState({});
  const [total, setTotal] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [products, setProducts] = useState([]);
  const { username } = useParams();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const productDetail = getAllCheckout();
    const userDetail = getUser(username);
    console.log(productDetail, userDetail);

    if (userDetail && productDetail) {
      setUser(userDetail);
      setProducts(productDetail);

      let tmpTotal = 0;
      let tmpTotalQty = 0;
      let message = "";

      productDetail.forEach((product) => {
        tmpTotal += product.qty * product.price;
        tmpTotalQty += product.qty;
        message += `**${product.name} - ${product.qty}** 
`;
      });

      setTotal(tmpTotal);
      setTotalQty(tmpTotalQty);
      setTitle(`aku beli produkmu yah 😁,

${message}
saya sudah tf yups! tolong di ceki ceki
Hatur nuhun~ ✨`);

      return;
    }

    navigate("/404");
  }, []);

  if (!user || products.length == 0) {
    return navigate("/404");
  }

  return (
    <div className="flex flex-col bg-gray-50 print:bg-white items-center w-full md:justify-center p-5 gap-4 relative print:justify-normal print:text-xs print:w-full print:font-extralight">
      <div className="text-md flex flex-col gap-2 items-center md:w-1/2">
        <Link to={"/list"}>
          <BsShop className="text-5xl print:text-3xl" />
        </Link>
        <p className="text-center">{user.name_card}</p>
      </div>

      <p className="font-bold print:font-normal text-md print:text-xs text-center flex flex-col ">
        <span>Thank you for your purchase.</span>
        <span className="print:hidden">
          Don't forget to confirm with the seller if you have paid. 😁
        </span>
      </p>

      <div className="flex flex-col gap-2 p-2 print:p-0 w-full bg-white text-md md:w-1/2 print:w-full print:py-2 print:border-t-[1px] border-black print:text-xs rounded-lg shadow-lg">
        {products.map((product, index) => {
          return (
            <div className=" flex flex-col gap-1" key={index}>
              <p className="font-bold print:font-normal print:text-xs">
                {index + 1}. {product.name}
              </p>
              <div className="flex justify-between ">
                <p className="px-4 print:text-xs">
                  {product.qty} x {product.price}
                </p>
                <p className="print:text-xs">{formatNumberIDR(product.qty * product.price)}</p>
              </div>
            </div>
          );
        })}
        <div className="bg-white w-full flex border-t-[1px] border-black py-1 justify-between mt-32">
          <p>Total QTY: {totalQty}</p>
          <p>{formatNumberIDR(total)}</p>
        </div>
      </div>
      <p className="text-md font-bold text-center md:w-1/2 print:hidden">
        Confirm Order
      </p>

      <div className="w-full md:w-1/3 flex flex-col items-center gap-5 print:hidden">
        <textarea
          className="rounded-md outline-2 font-serif  outline-dotted p-2 w-full h-44 bg-gray-50 shadow-lg"
          onChange={(e) => setTitle(e.target.value)}
        >
          {title}
        </textarea>
        <div className="flex gap-2">
          <SocialMedia title={title} size={30} />
          <AiOutlinePrinter
            className="hover:cursor-pointer text-3xl"
            title="Print Order"
            onClick={() => {
              const today = new Date();
              const month = today.getMonth() + 1;
              const year = today.getFullYear();
              const date = today.getDate();
              document.title = `Order Price List ${month}-${date}-${year}`;
              window.print();
            }}
          />
        </div>
      </div>

      <p className="text-md text-center md:w-1/2 print:hidden">
        Payment Method
      </p>

      <div className="w-full flex gap-2 md:w-1/2 overflow-y-auto print:hidden">
        {user.payments.map((payment, index) => {
          return <PaymentList payment={payment} key={index} />;
        })}
      </div>
    </div>
  );
}

export default Checkout;
