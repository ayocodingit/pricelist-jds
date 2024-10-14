import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getByID } from "../repository/produts";
import { BsArrowLeft } from "react-icons/bs";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { BiMap } from "react-icons/bi";
import { calculateDiscount, formatNumberIDR } from "../utils/formatter";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { tagOptions } from "../utils/contstant/tag";
import SocialMedia from "../components/SocialMedia";
import { addToCart, getCountCart, removeItemCart } from "../repository/carts";
import { Flip, toast } from "react-toastify";
import { CiShoppingCart } from "react-icons/ci";

function DetailProduct() {
  const [product, setProduct] = useState(null);
  const [URLSearchParams] = useSearchParams();
  const [qty, setQty] = useState(parseInt(URLSearchParams.get("qty")) || 1);
  const [total, setTotal] = useState(0);
  const { id } = useParams();
  const [showSocialMedia, setShowSocialMedia] = useState(false);
  const [totalCart, setTotalCart] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    const productDetail = getByID(id);
    setTotalCart(getCountCart);

    if (productDetail) {
      setProduct(productDetail);
      setTotal(
        calculateDiscount(productDetail.price, productDetail.discount) * qty
      );
      return;
    }

    navigate("/404");
  }, [totalCart]);

  const calculateTotal = (price, discount, operator) => {
    let count = qty;
    if (operator == "-") {
      count -= 1;
    } else {
      count += 1;
    }

    setQty(count);
    setTotal(calculateDiscount(price, discount) * count);
  };

  if (!product) {
    return navigate("/404");
  }

  const alert = (isNewProduct) => {
    toast.success(`${isNewProduct ? "Add To Cart" : "Updated"} Success`, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Flip,
    });

    return navigate("/list/" + product.id + "?qty=" + qty);
  };

  const isStockEmpty =
    (product.tag == tagOptions.READY_STOCK && product.stock == 0) ||
    !product.is_available;

  return (
    <div className="flex flex-col bg-gray-50 h-[calc(100dvh)]  relative">
      <div className="w-full flex md:justify-center">
        <div className="w-full md:w-1/2 flex justify-center md:border-x-4 md:border-white">
          <PhotoProvider className={`${isStockEmpty && "grayscale"}`}>
            <PhotoView src={product.image}>
              <img
                src={product.image}
                alt="image product"
                className={`max-h-[20rem]  w-full relative object-contain md:border-2 md:border-gray-100 hover:cursor-zoom-in ${
                  isStockEmpty && "grayscale"
                }`}
              />
            </PhotoView>
          </PhotoProvider>
          <div className="flex absolute start-5 justify-between md:start-[26%] gap-4 top-5 items-center text-black rounded-full shadow-md bg-white px-2">
            <BsArrowLeft className="bg-white text-4xl rounded-full hover:cursor-pointer p-1" onClick={() => navigate('/list')} />
            <div className="flex gap-2 bg-white rounded-full p-2 ">
              <FaRegShareFromSquare
                className="p-1 hover: cursor-pointer text-3xl"
                onClick={() => setShowSocialMedia(!showSocialMedia)}
              />
              {showSocialMedia && <SocialMedia product={product} />}
              <div className="relative" onClick={() => navigate("/cart")}>
                <CiShoppingCart className="text-3xl " />
                <p className="absolute rounded-full top-0 right-0 bg-primary text-white text-xs w-1/2 flex justify-center">
                  {totalCart}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex md:justify-center h-full">
        <div className="md:w-1/2 w-full flex md:bg-white">
          <div className="mt-2 p-4 flex justify-between gap-5">
            <div className="flex flex-col gap-2">
              {product.discount > 0 && (
                <div className="text-sm flex gap-2">
                  <span className="text-primary font-serif underline">
                    Discount {product.discount}%
                  </span>
                  <span className="line-through text-black">
                    {formatNumberIDR(product.price)}
                  </span>
                </div>
              )}

              <p className="text-orange-600 text-md font-serif flex gap-2 items-center">
                {formatNumberIDR(
                  calculateDiscount(product.price, product.discount)
                )}
              </p>
              <p
                className={`${
                  isStockEmpty
                    ? "text-gray-500 outline-gray-500"
                    : "text-primary outline-primary"
                } text-center outline-dashed px-2  text-sm rounded-md capitalize`}
              >
                {isStockEmpty && "Not "}
                {product.tag} {!isStockEmpty && <span>{product.stock}</span>}
              </p>
              <p className="text-lg font-bold font-sans capitalize flex gap-2 text-wrap items-center">
                {product.name}
              </p>

              {product.location && (
                <div className="flex items-center ">
                  <BiMap />
                  <p className="text-sm text-gray-600">{product.location}</p>
                </div>
              )}
              {!isStockEmpty && (
                <div className="flex gap-5 items-center">
                  <label htmlFor="" className="text-sm">
                    Quantity
                  </label>
                  <div className="flex h-8 justify-center items-center w-32">
                    <button
                      onClick={() => {
                        if (qty > 1) {
                          calculateTotal(product.price, product.discount, "-");
                        }
                      }}
                      className=" w-full bg-primary text-white text-xl rounded-lg h-full"
                    >
                      -
                    </button>
                    <div className="w-full  text-center h-full flex justify-center items-center">
                      {qty}
                    </div>
                    <button
                      onClick={() => {
                        if (
                          product.tag == tagOptions.PO ||
                          (product.stock > 1 && qty < product.stock)
                        )
                          calculateTotal(product.price, product.discount, "+");
                      }}
                      className="w-full bg-primary text-white text-xl rounded-lg h-full"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
              <div className="flex gap-5 items-center">
                <div className="text-sm">Total Price</div>
                <div className="text-orange-600 text-md font-serif">
                  {formatNumberIDR(total)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bottom-0 flex items-center  text-white text-sm  justify-center">
        <div className="flex w-full md:w-1/2 h-10 items-center">
          <button
            className="w-1/2 bg-orange-600 h-full"
            onClick={() => {
              const isNewProduct = addToCart(product, qty);
              setTotalCart(totalCart + 1);
              alert(isNewProduct);
            }}
          >
            Add To Cart
          </button>
          <button
            className={`hover:bg-opacity-90 flex items-center justify-center h-full w-1/2 ${
              isStockEmpty ? "bg-gray-500" : "bg-primary"
            } `}
            onClick={() => {
              removeItemCart(product.id);
              navigate(
                isStockEmpty
                  ? "#"
                  : `/payment/${product.id}/${product.username}/${qty}`
              );
            }}
          >
            {isStockEmpty ? "Not Ready Stock" : "Order Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
