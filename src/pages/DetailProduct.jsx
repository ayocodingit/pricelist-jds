import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getByID } from "../repository/produts";
import { BsChevronCompactLeft } from "react-icons/bs";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { BiMap } from "react-icons/bi";

function DetailProduct() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const productDetail = getByID(id);

    if (productDetail) {
      setProduct(productDetail);
      return;
    }

    // navigate("/404");
  }, []);
  console.log(product);

  if (!product) {
    return;
  }

  return (
    <div className="flex flex-col bg-white h-screen relative">
      <div className="w-full flex md:justify-center">
      <div className="w-full md:w-1/2 flex justify-center md:bg-gray-200">
        <PhotoProvider className={`${!product.is_available && "grayscale"}`}>
          <PhotoView src={product.image}>
            <img
              src={product.image}
              alt="image product"
              className={`max-h-[20rem]  w-full md:w-96 relative object-contain rounded-t-lg hover: cursor-zoom-in object-top ${
                !product.is_available && "grayscale"
              }`}
            />
          </PhotoView>
        </PhotoProvider>
        <Link
          to={"/list"}
          className="absolute start-5 md:start-[26%] top-5 bg-gray-50 p-2 rounded-md text-black"
        >
          <BsChevronCompactLeft className="text-md" />
        </Link>
      </div>
      </div>
      <div className="w-full flex md:justify-center">
        <div className="md:w-1/2 flex ">
          <div className="mt-2 p-2 flex gap-2">
            <div className="flex flex-col">
              <p className=" font-lg font-roboto capitalize">{product.name}</p>
              <p className="text-orange-600 font-md font-serif ">
                Rp{product.price} -{" "}
                <span className="text-xs text-gray-800 ">{product.tag}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full absolute bottom-0 flex items-center md:justify-center">
        <div className="md:w-1/2 flex h-12 text-white font-xs w-full md:justify-center">
          <div className="bg-orange-400 w-1/2 flex justify-center items-center">
            <p className="rounded-sm border-gray-500 capitalize flex gap-1 items-center">
              <BiMap /> {product.location}{" "}
            </p>
          </div>
          <div className="bg-green-600 w-1/2 flex items-center justify-center font-serif">
            <Link
              to={"/payment/" + product.username}
              className=" text-center text-white"
            >
              Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
