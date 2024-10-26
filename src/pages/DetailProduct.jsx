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

function DetailProduct() {
  const [product, setProduct] = useState({});
  const [URLSearchParams] = useSearchParams();
  const [total, setTotal] = useState(0);
  const { id } = useParams();
  const [showSocialMedia, setShowSocialMedia] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [])

  useEffect(() => {
    setIsLoading(true);
    fetchProducts().then((products) => {
      const product = getByID(products, id);

      if (!product) {
        return navigate("/404");
      }
      formik.setFieldValue(
        "qty",
        formik.values.qty <= product.stock ? formik.values.qty : product.stock
      );
      setProduct(product);
      setTotalCart(getCountCart);
      setTotal(
        calculateDiscount(product.price, product.discount) * formik.values.qty
      );
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [formik.values.qty]);

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
    <div className="bg-gray-100 min-h-[calc(100dvh)]  flex md:justify-center">
      <div className="w-full md:w-1/2 flex flex-col relative">
        <div className="flex relative rounded-md">
          {isStockEmpty && (
            <span className="absolute rounded-full bg-gray-900 text-white p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-md shadow-lg font-roboto">
              Habis
            </span>
          )}
          <PhotoProvider>
            <PhotoView src={product.image}>
              <img
                src={product.image}
                alt="image product"
                className={`w-full h-[20rem] p-2 object-contain hover:cursor-zoom-in`}
              />
            </PhotoView>
          </PhotoProvider>
          <div className="absolute justify-between top-5 text-black w-full p-5 px-4">
            <div className="flex justify-between items-center">
              <BsArrowLeft
                className="bg-white text-4xl rounded-full hover:cursor-pointer p-1 shadow-lg"
                onClick={() => navigate("/list")}
              />
              <div className="flex gap-2  items-center">
                {showSocialMedia && (
                  <SocialMedia
                    size={34}
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
                <VscShare
                  className="p-1 hover:cursor-pointer text-4xl bg-white rounded-full shadow-lg"
                  onClick={() => setShowSocialMedia(!showSocialMedia)}
                />

                <div
                  className="relative bg-white rounded-full p-1 hover:cursor-pointer shadow-lg"
                  onClick={() => navigate("/cart")}
                >
                  <CiShoppingCart className="text-3xl " />
                  <p className="absolute rounded-full top-1 right-1 outline-black outline-1 outline-double bg-white text-xs w-4 flex justify-center">
                    {totalCart}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-2 text-sm ">
          <div className="p-4 flex flex-col gap-2 rounded-t-3xl bg-white h-[calc(48dvh)] overflow-auto">
            <div className="flex justify-between">
              <div>
                <p
                  className={`${
                    isStockEmpty ? "text-gray-500 " : "text-primary"
                  } rounded-md capitalize`}
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
                    <div className="flex h-6 justify-center items-center w-20 text-sm">
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
                        className=" w-1/2 h-full bg-primary text-white text-sm rounded-md flex justify-center items-center"
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
                        className="w-1/2 h-full bg-primary text-white text-sm rounded-md flex justify-center items-center"
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
                <p className="bg-green-100  text-primary p-1 rounded-md text-xs">
                  -{product.discount}%
                </p>
              )}
              <p className="text-wrap">{product.name}</p>
            </div>
            <div className="flex flex-col w-full gap-2 py-2">
              <p className="text-xs">Kontak Penjual</p>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <BiUserCheck className="text-3xl" />
                  <p>@{product.username}</p>
                </div>
                <div className="flex gap-4">
                  <BiMessageRoundedDetail
                    className="text-3xl text-primary hover:cursor-pointer"
                    onClick={handleRedirectCall}
                  />
                  <BiPhoneCall
                    className="text-3xl text-primary hover:cursor-pointer"
                    onClick={handleRedirectCall}
                  />
                </div>
              </div>
            </div>
            <div className=" outline-primary max-h-18 text-gray-400 overflow-auto">
              <div className="text-xs">{product.description || "-"}</div>
            </div>
            {product.location && (
              <div className="flex items-center text-xs">
                <BiMap />
                <p className="text-gray-600">{product.location}</p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <p>Catatan</p>
              <textarea
                id="note"
                placeholder="Catatan untuk penjual"
                {...formik.getFieldProps("note")}
                className={`rounded-md outline-dashed outline-1 p-2 focus:outline-primary italic h-20 ${
                  formik.errors.note && "focus:outline-red-600"
                }`}
              >
                {formik.values.note}
              </textarea>
              <span className="italic first-letter:capitalize text-xs text-red-600">
                {formik.errors.note}
              </span>
            </div>
          </div>
        </div>
        <div className="fixed md:relative bottom-0 w-full h-16 px-2 text-white">
          <div className="flex w-full items-center bg-white h-full p-2 rounded-md">
            <div className="p-2 flex flex-col w-1/3 text-black">
              <p className="">Total</p>
              <p className="font-[sans-serif]">
                {!isLoading ? (
                  formatNumberIDR(!isStockEmpty ? total : 0)
                ) : (
                  <Loading isLoading={isLoading} size={15} color="#000" />
                )}
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
                if (isNewItem) setTotalCart(totalCart + 1);
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
