import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUser } from "../repository/users";
import Payment from "../components/Payment";
import { BsChevronCompactLeft } from "react-icons/bs";

function Detail() {
  const [user, setUser] = useState(null);
  const { user: username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userDetail = getUser(username);

    if (userDetail) {
      setUser(userDetail);
      return;
    }
    navigate("/404");
  }, []);

  if (!user) {
    return navigate("/404");
  }

  return (
    <div className="h-full flex flex-col text-white items-center">
      <h1 className="text-3xl mt-10 flex justify-center items-center">
        <Link to={"/list"} className="text-md">
          <BsChevronCompactLeft />{" "}
        </Link>{" "}
        {user.name_card}
      </h1>

      <div className="mt-10 flex flex-col gap-5 w-full items-center">
        <p className="font-extrabold text-lg text-center">
          Thank you for your purchase. <br />
          Don't forget to confirm with the seller if you have paid.
        </p>
        <p className="text-2xl">Info Account</p>
        <Payment payment={{ provider: "telegram", value: user.username }} />
        <p className="text-2xl"> Info Payment</p>
        {user.payments.map((payment, index) => {
          return <Payment payment={payment} key={index} />;
        })}
      </div>
    </div>
  );
}

export default Detail;
