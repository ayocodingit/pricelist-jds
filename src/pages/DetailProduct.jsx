import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getByID } from "../repository/produts";
import { BsChevronCompactLeft } from "react-icons/bs";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { BiMap } from "react-icons/bi";

function DetailProduct() {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const productDetail = getByID(id);

    if (productDetail) {
      setProduct(productDetail);
      setTotal(productDetail.price * qty);
      return;
    }

    // navigate("/404");
  }, []);

  if (!product) {
    return;
  }

  return (
    <div className="flex flex-col bg-white h-[calc(100dvh)]  relative">
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
        <div className="   flex justify-center">
          <div className="mt-2 p-4 flex items-center justify-between gap-5">
            <div className="flex flex-col">
              <p className=" font-lg font-roboto capitalize">{product.name}</p>
              <p className="text-orange-600 font-md font-serif ">
                Rp{product.price}
              </p>
              <div className="flex">
                <BiMap />
                <p className="text-xs text-gray-600 text-center">
                  {product.location}
                </p>
              </div>
              <div className="flex gap-5 items-center">
                <label htmlFor="">Qty</label>
                <input
                  type="number"
                  min={1}
                  className="w-20 h-10 focus:outline-none border-b-2"
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                    setTotal(product.price * qty);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full absolute bottom-0 flex items-center md:justify-center">
        <div className="md:w-1/2 flex h-12 text-white w-full md:justify-center">
          <div className="bg-orange-400 w-1/2 flex justify-center items-center">
            <p className="rounded-sm border-gray-500 capitalize flex gap-1 items-center text-sm">
              Rp{total}
            </p>
          </div>
          <Link to={`/payment/${product.id}/${product.username}?qty=${qty}`} className="text-center text-white text-sm bg-green-600 w-1/2 flex items-center justify-center font-serif">
            
              Order
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
