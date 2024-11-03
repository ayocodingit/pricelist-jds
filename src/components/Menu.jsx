import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { SlHome, SlQuestion, SlUser } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";
import { getCountCart } from "../repository/carts";

function Menu() {
  const location = useLocation();
  const activeClass = "opacity-100";
  const noActiveClass = "opacity-70";

  return (
    <div className="fixed bottom-0 h-14 w-full md:w-1/2">
      <ul className="bg-primary h-full flex items-center gap-2 justify-around px-10 py-2 text-white">
        <Link to={"/list"}>
          <SlHome
            className={`text-2xl text-white ${
              location.pathname == "/list" ? activeClass : noActiveClass
            } hover:opacity-100`}
            title="Produk"
          />
        </Link>
        <Link to={"/cart"} className="relative">
          <CiShoppingCart
            className={`text-3xl text-white ${
              location.pathname == "/cart" ? activeClass : noActiveClass
            } hover:opacity-100`}
            title="Keranjang"
          />
          <p
            className={`${
              location.pathname == "/cart" ? activeClass : noActiveClass
            } absolute rounded-full top-1 -right-4 text-white text-sm w-4 flex justify-center`}
          >
            ({getCountCart()})
          </p>
        </Link>
        {/* <li><SlHeart className={`text-2xl text-white ${location.pathname == '/favorit' ? activeClass : noActiveClass } hover:opacity-100`} /></li> */}
        <Link to={"#"}>
          <SlUser
            className={`text-2xl text-white ${
              location.pathname == "/me" ? activeClass : noActiveClass
            } hover:opacity-100`}
            title="Profil"
          />
        </Link>
        <Link to={"#"}>
          <SlQuestion
            className={`text-2xl text-white ${
              location.pathname == "/info" ? activeClass : noActiveClass
            } hover:opacity-100`}
            title="Info"
          />
        </Link>
      </ul>
    </div>
  );
}

export default Menu;
