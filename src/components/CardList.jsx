import React from "react";
import { Link } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { BiMap } from "react-icons/bi";

function CardList({ product }) {
  return (
    <div className=" rounded-md bg-white shadow-xl flex">
      <div className="flex flex-col gap-1 justify-center w-full">
        <div className="flex shadow-b-md justify-center">
          <PhotoProvider className={`${!product.is_available && "grayscale"}`}>
            <PhotoView src={product.image}>
              <img
                src={product.image}
                alt="image product"
                className={` rounded-t-lg min-h-[10rem] h-8 p-1 hover: cursor-zoom-in object-cover object-top ${
                  !product.is_available && "grayscale"
                }`}
                loading="lazy"
              />
            </PhotoView>
          </PhotoProvider>
        </div>
        <Link to={product.is_available ? "/list/" + product.id : "#"} className="p-2 hover: bg-gray-50" title={product.name}>
          <div className="px-1 flex flex-col ">
            <h1 className={` ${!product.is_available && 'line-through'} text-nowrap overflow-hidden text-sm text-ellipsis font-roboto capitalize w-full`} >
              {product.name}
            </h1>

            <p className="text-sm font-serif text-orange-600">
              Rp{product.price}
            </p>
          </div>
         
        </Link>
      </div>
    </div>
  );
}

export default CardList;
