import React from "react";
import { SlBasket, SlHome, SlUser } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";

function Menu({ children }) {
  const location = useLocation();
  const activeClass = "opacity-100";
  const noActiveClass = "opacity-70";

  return (
    <div className="fixed bottom-0 w-full md:w-1/2 text-xs shadow-md">
      {children}
      <ul className="bg-primary h-full flex items-center gap-2 justify-around px-10 py-2 text-white">
        <Link
          to={"/list"}
          className={`flex flex-col items-center gap-1 ${
            location.pathname == "/list" ? activeClass : noActiveClass
          }`}
        >
          <SlHome className={`text-xl hover:opacity-100`} title="Produk" />
          Produk
        </Link>
        <Link
          to={"/cart"}
          className={`flex flex-col items-center gap-1 ${
            location.pathname == "/cart" ? activeClass : noActiveClass
          }`}
        >
          <SlBasket className={`text-xl hover:opacity-100`} title="Keranjang" />
          Keranjang
          {/*<p
            className={`${
              location.pathname == "/cart" ? activeClass : noActiveClass
            } absolute rounded-full top-1 -right-4 text-white w-4 flex justify-center`}
          >
            ({getCountCart()})
          </p>*/}
        </Link>
        {/* <li><SlHeart className={`text-2xl text-white ${location.pathname == '/favorit' ? activeClass : noActiveClass } hover:opacity-100`} /></li> */}
        <Link
          to={"/me"}
          className={`flex flex-col items-center gap-1 ${
            location.pathname == "/me" ? activeClass : noActiveClass
          }`}
        >
          <SlUser className={`text-xl hover:opacity-100`} title="Profil" />
          Profil
        </Link>
        {/* <Link to={"#"}>
          <SlQuestion
            className={`text-2xl text-white ${
              location.pathname == "/info" ? activeClass : noActiveClass
            } hover:opacity-100`}
            title="Info"
          />
        </Link> */}
      </ul>
    </div>
  );
}

export default Menu;
