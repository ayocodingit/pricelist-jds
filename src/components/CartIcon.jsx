import { Badge } from "@nextui-org/react";
import React from "react";
import { SlBasket } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { getCountCart } from "../repository/carts";

function CartIcon() {
  const navigate = useNavigate();
  return (
    <div
      className="fixed bottom-16 right-6 z-30 flex justify-center items-center p-2 bg-white shadow-md  rounded-md hover:cursor-pointer"
      onClick={() => navigate("/cart")}
    >
      <Badge
        content={getCountCart()}
        color="danger"
        size="md"
        variant="solid"
        shape="circle"
      >
        <SlBasket className="text-3xl text-primary" />
      </Badge>
    </div>
  );
}

export default CartIcon;
