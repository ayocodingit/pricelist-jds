import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getUser } from "../repository/users";
import Payment from "../components/Payment";
import { AiOutlineCopy, AiOutlineHome } from "react-icons/ai";
import { getByID } from "../repository/produts";
import CopyToClipboard from "react-copy-to-clipboard";
import { Flip, toast } from "react-toastify";
import { calculateDiscount, formatNumberIDR } from "../utils/formatter";

function Detail() {
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);
  const { product: productID, user: username, qty } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const productDetail = getByID(productID);
    const userDetail = getUser(username);

    if (userDetail && productDetail) {
      setUser(userDetail);
      setProduct(productDetail);

      return;
    }
    navigate("/404");
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

  if (!user || !product || isNaN(qty)) {
    return navigate("/404");
  }

  return (
    <div className="flex flex-col bg-gray-50 items-center h-[calc(100dvh)] p-5">
      <h1 className="text-md mt-5 flex gap-1 justify-center items-center">
        <Link to={"/list"}>
          <AiOutlineHome />
        </Link>
        {user.name_card}
      </h1>

      <div className="mt-10 flex flex-col gap-3 w-full items-center">
        <div className="flex flex-col items-center gap-2 text-sm pt-2 text-black bg-white rounded-md w-full md:w-96 shadow-lg">
          <p className=" capitalize text-wrap font-bold text-lg">
            {product.name}
          </p>
          <p className="text-md font-serif  flex">
            {formatNumberIDR(
              calculateDiscount(product.price, product.discount)
            )}{" "}
            x {qty}
          </p>
          <CopyToClipboard
            text={calculateDiscount(product.price, product.discount) * qty}
            onCopy={alert}
          >
            <p
              title="Copy Text"
              className="hover:bg-opacity-90 bg-[#5D9F5D] text-white hover:rounded-md hover:cursor-copy font-bold font-serif flex justify-center items-center border-t-2 border-gray-200 py-2 w-full"
            >
              {formatNumberIDR(
                calculateDiscount(product.price, product.discount) * qty
              )}
            </p>
          </CopyToClipboard>
        </div>
        <p className="font-bold p-2 text-sm md:text-md text-center">
          Thank you for your purchase. <br />
          Don't forget to confirm with the seller if you have paid. 😁
        </p>
        <p className="text-sm md:text-md">Info Account</p>
        <Payment
          payment={{ provider: "telegram", value: user.username }}
          product={product.name}
          name_card={user.name_card}
          qty={qty}
        />
        <p className="text-sm md:text-md"> Info Payment</p>
        {user.payments.map((payment, index) => {
          return <Payment payment={payment} key={index} />;
        })}
      </div>
    </div>
  );
}

export default Detail;
