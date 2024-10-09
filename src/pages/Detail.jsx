import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUser } from "../repository/users";
import Payment from "../components/Payment";
import { AiOutlineHome } from "react-icons/ai";
import { getByID } from "../repository/produts";

function Detail() {
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);
  const { product: productID, user: username } = useParams();
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
  
  if (!user || !product) {
    return navigate("/404");
  }

  return (
    <div className=" flex flex-col text-white items-center">
      <h1 className="text-lg mt-10 flex gap-1 justify-center items-center">
        <Link to={"/list"}>
          <AiOutlineHome />
        </Link>
        {user.name_card}
      </h1>

      <div className="mt-10 flex flex-col gap-3 w-full items-center">
        <p className="font-extrabold text-xs md:text-lg text-center">
          Thank you for your purchase. <br />
          Don't forget to confirm with the seller if you have paid.
        </p>
        <p className="text-sm md:text-md">Info Account</p>
        <Payment payment={{ provider: "telegram", value: user.username }} product={product.name} name_card={user.name_card} />
        <p className="text-sm md:text-md"> Info Payment</p>
        {user.payments.map((payment, index) => {
          return <Payment payment={payment} key={index}/>;
        })}
      </div>
    </div>
  );
}

export default Detail;
