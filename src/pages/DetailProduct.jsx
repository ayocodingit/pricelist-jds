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
    if (!getCustomer()?.customer) {
      setIsModalCustomer(true);
      return;
    }
    moveToCheckOut([{ ...product, qty, note }]);
    navigate(isStockEmpty ? "#" : `/checkout/${product.username}`);
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100dvh)]  flex md:justify-center">
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="flex relative">
          <PhotoProvider className={`${isStockEmpty && "grayscale"}`}>
            <PhotoView src={product.image}>
              <img
                src={product.image}
                alt="image product"
                className={`w-full h-[20rem] p-2 object-contain hover:cursor-zoom-in`}
              />
            </PhotoView>
          </PhotoProvider>
          <div className="flex absolute start-5 justify-between top-5 items-center text-black rounded-full shadow-md bg-white px-2">
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
        <div className="pl-2 text-sm h-full md:h-auto">
          <div className="p-5 shadow-lg rounded-t-3xl bg-white flex flex-col h-full">
          <div className="flex justify-between">
            <div>
              <p
                className={`${
                  isStockEmpty ? "text-gray-500 " : "text-primary"
                } rounded-md capitalize`}
              >
                {isStockEmpty && "Not "}
                {product.tag}{" "}
                {product.tag == tagOptions.READY_STOCK && (
                  <span>{product.stock}</span>
                )}
              </p>
            </div>
            <div>
              {!isStockEmpty && (
                <div className="flex gap-2">
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
            </div>
          </div>
          <div className="text-md font-bold font-roboto capitalize  items-center flex gap-2">
            {product.discount > 0 && (
              <p className="bg-green-100  text-primary p-1 rounded-lg text-xs">
                -{product.discount}%
              </p>
            )}
            <p className="text-wrap">{product.name}</p>
          </div>
          <div className=" outline-primary max-h-18 text-gray-400">
            <div className="text-xs">{product.description || "-"}</div>
          </div>
          {product.location && (
            <div className="flex items-center text-xs">
              <BiMap />
              <p className="text-gray-600">{product.location}</p>
            </div>
          )}

          <div className="flex flex-col gap-2 mt-6 ">
            <p>Note</p>
            <textarea
              id="note"
              placeholder="Enter Note"
              onChange={(e) => setNote(e.target.value)}
              className="rounded-md outline-dashed outline-1 p-2 focus:outline-primary italic h-20"
              maxLength={100}
              value={note}
            >
              {note}
            </textarea>
          </div>
          <div className=" flex gap-2 my-5 justify-between text-white">
            <div className=" bg-orange-600 p-2 items-center flex flex-col rounded-lg shadow-lg w-1/2">
              <p className="text-xs">Total Price</p>
              <p className="font-serif">
                {formatNumberIDR(
                  total
                )}
              </p>
            </div>
            <button
              className={` p-2 flex gap-2 rounded-lg shadow-lg justify-center items-center hover:bg-opacity-90 w-1/2 ${
                isStockEmpty ? "bg-gray-700" : "bg-primary"
              }`}
              onClick={() => {
                if (isStockEmpty) return;
                const isNewProduct = addToCart(product, qty, note);
                setTotalCart(totalCart + 1);
                alert(isNewProduct);
              }}
            >
              <BsCartPlus className="text-2xl" />
              Go To Cart
            </button>
          </div>
          </div>
        </div>
        <ModalCustomer
          setIsModalCustomer={setIsModalCustomer}
          isModalCustomer={isModalCustomer}
        />
      </div>
    </div>
  );
}

export default DetailProduct;
