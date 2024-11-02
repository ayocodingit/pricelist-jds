import React from "react";
import { SlHandbag, SlHome, SlQuestion, SlUser } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";

function Menu() {
  const location = useLocation();
  const activeClass = "opacity-100";
  const noActiveClass = "opacity-50";

  return (
    <div className="fixed bottom-0 h-14 w-full md:w-1/2">
      <ul className="bg-primary h-full flex items-center gap-2 justify-between px-10 text-white">
        <Link to={'/list'}>
          <SlHome
            className={`text-2xl text-white ${
              location.pathname == "/list" ? activeClass : noActiveClass
            } hover:opacity-100`}
            title="Produk"
          />
        </Link>
        <Link to={'/cart'}>
          <SlHandbag
            className={`text-2xl text-white ${
              location.pathname == "/cart" ? activeClass : noActiveClass
            } hover:opacity-100`}
            title="Keranjang"
          />
        </Link>
        {/* <li><SlHeart className={`text-2xl text-white ${location.pathname == '/favorit' ? activeClass : noActiveClass } hover:opacity-100`} /></li> */}
        <Link to={'#'}>
          <SlUser
            className={`text-2xl text-white ${
              location.pathname == "/me" ? activeClass : noActiveClass
            } hover:opacity-100`}
            title="Profil"
          />
        </Link>
        <Link to={'#'}>
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
