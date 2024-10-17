import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getByID } from "../repository/produts";
import { BsArrowLeft, BsCartPlus } from "react-icons/bs";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { BiMap } from "react-icons/bi";
import { calculateDiscount, formatNumberIDR } from "../utils/formatter";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { tagOptions } from "../utils/contstant/tag";
import SocialMedia from "../components/SocialMedia";
import { addToCart, getCountCart, moveToCheckOut } from "../repository/carts";
import { Flip, toast } from "react-toastify";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { getCustomer } from "../repository/customer";
import ModalCustomer from "../components/ModalCustomer";
import Profile from "../components/Profile";

function DetailProduct() {
  const [product, setProduct] = useState({});
  const [URLSearchParams] = useSearchParams();
  const [qty, setQty] = useState(parseInt(URLSearchParams.get("qty")) || 1);
  const [note, setNote] = useState(URLSearchParams.get("note") || "");
  const [total, setTotal] = useState(0);
  const { id } = useParams();
  const [showSocialMedia, setShowSocialMedia] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  const [isModalCustomer, setIsModalCustomer] = useState(false);
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

  const handleCheckout = () => {
    if (isStockEmpty) return;
    if (!getCustomer()) {
      setIsModalCustomer(true);
      return;
    }
    moveToCheckOut([{ ...product, qty, note }]);
    navigate(isStockEmpty ? "#" : `/checkout/${product.username}`);
  };

  return (
    <div className="flex flex-col h-[calc(100dvh)]  relative ">
      <div className="w-full flex md:justify-center ">
        <div className="w-full md:w-1/2 flex justify-center md:border-x-2 md:border-white ">
          <Profile />
          <PhotoProvider className={`${isStockEmpty && "grayscale"}`}>
            <PhotoView src={product.image}>
              <img
                src={product.image}
                alt="image product"
                className={`max-h-[15rem]  w-full relative object-contain hover:cursor-zoom-in`}
              />
            </PhotoView>
          </PhotoProvider>
          <div className="flex absolute start-5 justify-between md:start-[26%] top-5 items-center text-black rounded-full shadow-md bg-white px-2">
            <BsArrowLeft
              className="bg-white text-3xl rounded-full hover:cursor-pointer p-1"
              onClick={() => navigate("/list")}
            />
            <div className="flex gap-2 bg-white rounded-full p-2 ">
              <FaRegShareFromSquare
                className="p-1 hover: cursor-pointer text-3xl"
                onClick={() => setShowSocialMedia(!showSocialMedia)}
              />
              {showSocialMedia && (
                <SocialMedia
                  title={`
Mangga in case ada yg mau beli ~**${product.name}**~
${product.image}
Harganya cuma **${formatNumberIDR(product.price)}** aja

untuk info detail produknya silakan kunjungi di bawah ini yah 
${location.href}

Hatur nuhun~ ✨
`}
                />
              )}
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
        <div className="md:w-1/2 w-full flex bg-white">
          <div className="mt-5 p-4 flex justify-between w-full">
            <div className="flex flex-col gap-2 w-full">
              <p className="text-md font-roboto capitalize flex gap-2 text-wrap items-center">
                {product.name}
              </p>
              <p className="text-sm font-serif text-orange-600 flex gap-2 items-center">
                <span className="text-md">
                  {formatNumberIDR(
                    calculateDiscount(product.price, product.discount)
                  )}
                </span>
                {product.discount > 0 && (
                  <span className="bg-green-100  text-primary p-1 rounded-md text-xs">
                    -{product.discount}%
                  </span>
                )}
              </p>
              <p
                className={`${
                  isStockEmpty ? "text-gray-500 " : "text-primary"
                } text-sm rounded-md capitalize`}
              >
                {isStockEmpty && "Not "}
                {product.tag}:{" "}
                {product.tag == tagOptions.READY_STOCK && (
                  <span>{product.stock}</span>
                )}
              </p>

              {product.location && (
                <div className="flex items-center ">
                  <BiMap />
                  <p className="text-sm text-gray-600">{product.location}</p>
                </div>
              )}
              <div className="w-full flex flex-col outline-primary gap-2 max-h-18 text-gray-800">
                <div className="text-sm ">Description</div>
                <div className="text-xs">{product.description || "-"}</div>
              </div>
              {!isStockEmpty && (
                <div className="flex gap-2 mt-2">
                  <label htmlFor="" className="text-sm">
                    Quantity
                  </label>
                  <div className="flex h-6 justify-center items-center w-20 text-sm">
                    <button
                      onClick={() => {
                        if (qty > 1) {
                          calculateTotal(product.price, product.discount, "-");
                        }
                      }}
                      className=" w-1/2 h-full bg-primary text-white text-sm rounded-lg flex justify-center items-center"
                    >
                      <AiOutlineMinus />
                    </button>
                    <div className="w-1/2  text-center h-full flex justify-center items-center">
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
                      className="w-1/2 h-full bg-primary text-white text-sm rounded-lg flex justify-center items-center"
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
              )}

              <div className="w-full flex flex-col gap-2 text-sm">
                <textarea
                  id="note"
                  placeholder="Enter Note"
                  onChange={(e) => setNote(e.target.value)}
                  className="md:w-1/2 w-full rounded-md outline-dashed outline-1 text-xs p-2 focus:outline-primary italic h-20"
                  maxLength={100}
                  value={note}
                >
                  {note}
                </textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute w-full bottom-0 flex items-center  text-white justify-center h-12">
        <div className="flex w-full md:w-1/2 h-full  items-center">
          <button
            className={`w-1/2  h-full p-2 flex justify-center items-center hover:bg-opacity-90 ${
              isStockEmpty ? "bg-gray-500" : "bg-orange-600"
            }`}
            onClick={() => {
              if (isStockEmpty) return;
              const isNewProduct = addToCart(product, qty, note);
              setTotalCart(totalCart + 1);
              alert(isNewProduct);
            }}
          >
            <BsCartPlus className="text-2xl" />
          </button>
          <button
            className={` flex items-center justify-center h-full w-1/2 ${
              isStockEmpty ? "bg-gray-500" : "bg-primary hover:bg-opacity-90"
            } `}
            onClick={handleCheckout}
          >
            <span className="flex flex-col p-2">
              {isStockEmpty ? (
                "Not Ready Stock"
              ) : (
                <div className="flex flex-col items-center text-xs">
                  <span className="font-bold">Order Now </span>
                  <span className="text-md font-serif">
                    {formatNumberIDR(total)}
                  </span>
                </div>
              )}
            </span>
          </button>
        </div>
      </div>
      <ModalCustomer
        setIsModalCustomer={setIsModalCustomer}
        isModalCustomer={isModalCustomer}
      />
    </div>
  );
}

export default DetailProduct;
