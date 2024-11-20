import React from "react";
import { SlBasket, SlHome, SlUser } from "react-icons/sl";
import { Link, useLocation } from "react-router-dom";

const paths = [
  {
    path: '/list',
    title: 'Produk',
    icon: SlHome
  },
  {
    path: '/cart',
    title: 'Keranjang',
    icon: SlBasket
  },
  {
    path: '/me',
    title: 'Keranjang',
    icon: SlUser
  },
]

function Menu({ children }) {
  const location = useLocation();

  

  return (
    <div className="fixed bottom-0 z-20 w-full text-xs shadow-sm">
      {children}
      <ul className="bg-white h-full flex items-center gap-2 justify-around px-10 py-2 text-black relative">
        { paths.map((path) => (
            <Link
          to={path.path}
          className={`flex flex-col items-center gap-1 `}
        >
          <hr className={`${location.pathname == path.path ? 'absolute' : 'hidden'} top-0 border-[1px] border-primary w-20`}/>
          <path.icon className={`text-xl hover:opacity-100`} title={path.title} />
          {path.title}
        </Link>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
