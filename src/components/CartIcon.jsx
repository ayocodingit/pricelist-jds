import { Badge } from "@nextui-org/react";
import React from "react";
import { SlBasket } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { getCountCart } from "../repository/carts";

function CartIcon() {
    const navigate = useNavigate();
  return (
    <div
      className="relative  rounded-full p-1 hover:cursor-pointer"
      onClick={() => navigate("/cart")}
    >
      <Badge
        content={getCountCart()}
        color="primary"
        size="md"
        variant="shadow"
        shape="circle"
      >
        <SlBasket className="text-2xl " />
      </Badge>
    </div>
  );
}

export default CartIcon;
