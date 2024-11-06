import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchProducts, getByID } from "../repository/produts";
import { BsArrowLeft, BsCartPlus } from "react-icons/bs";
import { PhotoProvider, PhotoView } from "react-photo-view";
import {
  BiMap,
  BiMessageRoundedDetail,
  BiPhoneCall,
  BiUserCheck,
} from "react-icons/bi";
import { calculateDiscount, formatNumberIDR } from "../utils/formatter";
import { tagOptions } from "../utils/contstant/tag";
import SocialMedia from "../components/SocialMedia";
import { addToCart, getCountCart } from "../repository/carts";
import { Flip, toast } from "react-toastify";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { VscShare } from "react-icons/vsc";
import { useFormik } from "formik";
import * as yup from "yup";
import Loading from "../components/Loading";
import Image from "../components/Image";
import { SlActionRedo, SlArrowLeft, SlBasket } from "react-icons/sl";

function DetailProduct() {
  const [product, setProduct] = useState({});
  const [URLSearchParams] = useSearchParams();
  const [total, setTotal] = useState(0);
  const { id } = useParams();
  const [showSocialMedia, setShowSocialMedia] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      qty: parseInt(URLSearchParams.get("qty")) || 1,
      note: URLSearchParams.get("note") ?? "",
    },
    validationSchema: yup.object().shape({
      qty: yup.number().required().min(1),
      note: yup.string().optional().max(20),
    }),
  });

  useEffect(() => {
    fetchProducts().then((products) => {
      const product = getByID(products, id);

      if (!product) return navigate("/404");
      formik.setFieldValue(
        "qty",
        formik.values.qty <= product.stock ? formik.values.qty : product.stock
      );
      setProduct(product);
      setTotalCart(getCountCart);
      setTotal(
        calculateDiscount(product.price, product.discount) * formik.values.qty
      );
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, []);

  const calculateTotal = (price, discount, operator) => {
    let count = formik.values.qty;
    if (operator == "-") {
      count -= 1;
    } else {
      count += 1;
    }

    formik.setFieldValue("qty", count);
    setTotal(calculateDiscount(price, discount) * count);
  };

  const alert = (isNewProduct) => {
    toast.success(
      `${isNewProduct ? "Tambah Keranjang" : "Update Keranjang"} Sukses`,
      {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Flip,

      }
    );

    return navigate(
      `/list/${product.id}?qty=${formik.values.qty}&note=${formik.values.note}`
    );
  };

  const isStockEmpty =
    (product.tag == tagOptions.READY_STOCK && product.stock == 0) ||
    !product.is_available;

  const handleRedirectCall = () => {
    window.open(`https://t.me/${product.username}`, "_blank");
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100dvh)] text-sm md:text-md flex md:justify-center">
      <div className="w-full md:w-1/2 flex flex-col h-[calc(91dvh)] overflow-auto">
        <div className="flex items-center py-2 px-5 gap-5 justify-between bg-white sticky top-0 z-10 shadow-sm">
          <SlArrowLeft
            className="text-3xl rounded-full hover:cursor-pointer p-1"
            onClick={() => navigate("/list")}
          />
          <div className="flex gap-2  items-center">
            {showSocialMedia && (
              <SocialMedia
                size={30}
                title={`
Mangga in case ada yg mau beli 

~**${product.name}**~
${product.description ? product.description : ""}
${product.image}

Harganya cuma **${formatNumberIDR(product.price)}** aja ${
                  product.discount > 0
                    ? "dan Mumpung Sedang promo " + product.discount + "% ges"
                    : ""
                }

Yuk buruan beli produknya sebelum kehabisan
${location.href}

Hatur nuhun~ ✨`}
              />
            )}
            <SlActionRedo
              className="p-1 hover:cursor-pointer text-3xl"
              onClick={() => setShowSocialMedia(!showSocialMedia)}
            />

            <div
              className="relative  rounded-full p-1 hover:cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <SlBasket className="text-2xl " />
              <p className="absolute rounded-md top-0 text-white right-0 bg-primary  w-4 flex justify-center text-xs">
                {totalCart}
              </p>
            </div>
          </div>
        </div>
        <div className="flex relative rounded-md">
          {!isLoading && isStockEmpty && (
            <span className="absolute rounded-full animate-opacity-open bg-gray-900 text-white p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-md shadow-lg font-roboto">
              Habis
            </span>
          )}
          <Image
            src={product.image}
            alt="image product"
            className={`w-full h-[20rem] p-2 object-contain hover:cursor-zoom-in rounded-md `}
          />
        </div>
        <div className="  ">
          <div className="p-3 flex flex-col gap-2 rounded-t-3xl bg-white min-h-[calc(44dvh)]">
            <div className="flex justify-between">
              <div>
                <p
                  className={`${
                    isStockEmpty ? "text-gray-500 " : "text-white bg-primary rounded-md p-1 text-center "
                  } text-xs rounded-md capitalize`}
                >
                  {!isStockEmpty ? product.tag : "sold out"}{" "}
                  {product.tag == tagOptions.READY_STOCK && !isStockEmpty && (
                    <span>{product.stock}</span>
                  )}
                </p>
              </div>
              <div>
                {!isStockEmpty && (
                  <div className="flex gap-2">
                    <div className="flex h-6 justify-center items-center w-20 ">
                      <button
                        onClick={() => {
                          if (formik.values.qty > 1) {
                            calculateTotal(
                              product.price,
                              product.discount,
                              "-"
                            );
                          }
                        }}
                        className=" w-1/2 h-full bg-gray-300 text-black  rounded-md flex justify-center items-center"
                      >
                        <AiOutlineMinus />
                      </button>
                      <div className="w-1/2  text-center h-full flex justify-center items-center">
                        {formik.values.qty}
                      </div>
                      <button
                        onClick={() => {
                          if (
                            product.tag == tagOptions.PO ||
                            (product.stock > 1 &&
                              formik.values.qty < product.stock)
                          )
                            calculateTotal(
                              product.price,
                              product.discount,
                              "+"
                            );
                        }}
                        className="w-1/2 h-full bg-primary text-white  rounded-md flex justify-center items-center"
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="text-lg capitalize  justify-center flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <p className=" text-primary">
                  {formatNumberIDR(
                    calculateDiscount(product.price, product.discount) || 0
                  )}
                </p>
                {product.discount > 0 && (
                  <>
                    <span className=" line-through text-gray-600 text-sm">
                      {formatNumberIDR(product.price)}
                    </span>
                    <p className=" bg-primary text-xs text-white p-1 rounded-md ">
                      -{product.discount}%
                    </p>
                  </>
                )}
              </div>
              <div>
                <p className=" text-wrap text-sm">{product.name}</p>
              </div>
            </div>

            <div className="flex flex-col w-full gap-2 py-1">
              {/* <p className="">Kontak Penjual</p> */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <BiUserCheck className="text-3xl" />
                  <p>@{product.username}</p>
                </div>
                <div className="flex gap-4">
                  <BiMessageRoundedDetail
                    className="text-3xl  hover:cursor-pointer"
                    onClick={handleRedirectCall}
                  />
                  {/* <BiPhoneCall
                    className="text-3xl text-primary hover:cursor-pointer"
                    onClick={handleRedirectCall}
                  /> */}
                </div>
              </div>
            </div>
            <div className=" outline-primary text-black flex flex-col gap-1 text-sm">
              Deskripsi Produk{" "}
              <span className="text-justify">
                {product.description || "-"}
              </span>
            </div>
            {product.location && (
              <div className="flex items-center">
                <BiMap />
                <p className="">{product.location}</p>
              </div>
            )}

            <div className="flex flex-col gap-2 mt-2">
              <p>Catatan</p>
              <textarea
                id="note"
                placeholder="Catatan untuk Produk yang akan dibeli"
                rows="2"
                disabled={isStockEmpty}
                {...formik.getFieldProps("note")}
                className={`shadow-sm border-[1px] p-2 focus:outline-none  rounded-md border-primary resize-none ${
                  formik.errors.note && "focus:outline-red-600"
                }`}
              >
                {formik.values.note}
              </textarea>
              <span className=" first-letter:capitalize  text-red-600">
                {formik.errors.note}
              </span>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 w-full  text-white ">
          <div className="flex w-full md:w-1/2 items-center border-t-[1px] bg-white h-full p-2 rounded-md">
            <div className="p-2 flex flex-col w-1/3 text-black">
              <p className="">Total</p>
              <p className="font-[sans-serif]">
                {formatNumberIDR(!isStockEmpty ? total : 0)}
              </p>
            </div>
            <button
              className={` flex gap-3 rounded-md p-2 shadow-lg justify-center items-center hover:bg-opacity-90 w-full ${
                isStockEmpty || !formik.isValid ? "bg-gray-900" : "bg-primary"
              }`}
              disabled={!formik.isValid}
              onClick={() => {
                if (isStockEmpty) return;
                const isNewProduct = addToCart(product, formik.values);
                if (isNewProduct) setTotalCart(totalCart + 1);
                alert(isNewProduct);
              }}
            >
              <BsCartPlus className="text-2xl" />
              Tambah Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
