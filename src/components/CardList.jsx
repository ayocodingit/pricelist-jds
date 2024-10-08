import React from "react";
import { Link } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

function CardList({ product }) {
  return (
    <div className=" rounded-lg bg-white shadow-xl flex p-5 mb-5">
      <div className="flex flex-col gap-2 justify-center w-full">
        <div className="flex shadow-b-md justify-center">
          <PhotoProvider className={`${
                  !product.is_available && "grayscale"
                }`}>
            <PhotoView src={product.image} >
              <img
                src={product.image}
                alt="image product"
                className={`w-32 min-h-32 rounded-lg hover: cursor-zoom-in object-contain ${
                  !product.is_available && "grayscale"
                }`}
                loading="lazy"
              />
            </PhotoView>
          </PhotoProvider>
        </div>
        <div className="text-center flex flex-col">
          <h1 className="md:text-base text-lg font-roboto capitalize">
            {product.name} 
          </h1>
          
          <p className="md:text-sm text-lg font-serif"> Rp {product.price} </p>
        </div>
        <div className="flex flex-col gap-1">
          <Link
            to={product.is_available ? "/list/" + product.username : "#"}
            className={`w-full h-8 ${
              product.is_available ? "bg-blue-600" : "bg-gray-600"
            } text-md md:text-sm flex justify-center items-center text-white rounded-sm shadow-lg `}
          >
            {product.is_available ? "Order" : "Out of Stock"}
          </Link>
          <span className="text-xs text-gray-600 text-center">{ product.location }</span>
        </div>
      </div>
    </div>
  );
}

export default CardList;
