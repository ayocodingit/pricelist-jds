import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchProducts, getByID } from "../repository/produts";
import { BsCartPlus } from "react-icons/bs";
import { BiMap, BiMessageRoundedDetail, BiUserCheck } from "react-icons/bi";
import { calculateDiscount, formatNumberIDR } from "../utils/formatter";
import { tagOptions } from "../utils/contstant/tag";
import SocialMedia from "../components/SocialMedia";
import { addToCart, getCartByID, getCountCart } from "../repository/carts";
import { Flip, Slide, toast } from "react-toastify";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useFormik } from "formik";
import * as yup from "yup";
import { SlActionRedo, SlArrowLeft, SlBasket } from "react-icons/sl";
import { Button, Chip, Image, Textarea } from "@nextui-org/react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import CartIcon from "../components/CartIcon";

function DetailProduct() {
  const [product, setProduct] = useState({});
  const [URLSearchParams] = useSearchParams();
  const [total, setTotal] = useState(0);
  const { id } = useParams();
  const [showSocialMedia, setShowSocialMedia] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  const [cartId, setCartId] = useState(URLSearchParams.get("id") || "");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      isRequiredVariant: false,
      qty: 1,
      note: "",
      variant: "",
    },
    validationSchema: yup.object().shape({
      isRequiredVariant: yup.boolean(),
      qty: yup.number().required().min(1),
      note: yup.string().optional().max(20),
      variant: yup.string().when("isRequiredVariant", {
        is: (s) => s,
        then: (s) => s.required(),
      }),
    }),
  });

  useEffect(() => {
    fetchProducts().then((products) => {
      const product = getByID(products, id);

      if (!product) return navigate("/404");

      const cart = getCartByID(cartId)[0];
      formik.setFieldValue("isRequiredVariant", product.variants.length > 0);

      if (product.variants.length > 0) {
        formik.setFieldValue(
          "variant",
          product.variants.length > 0
            ? formik.values.variant || product.variants[0]
            : ""
        );
      }

      if (!cart) {
        formik.setFieldValue("qty", 1);
      } else {
        formik.setFieldValue(
          "qty",
          cart.qty <= product.stock ? cart.qty : product.stock
        );
        formik.setFieldValue("variant", cart.variant);
        formik.setFieldValue("note", cart.note);
      }

      setProduct(product);
      setTotalCart(getCountCart());
      setTotal(
        calculateDiscount(product.price, product.discount) * formik.values.qty
      );
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, [formik.values.variant]);

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
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      }
    );

    return navigate(
      `/list/${product.id}?id=${product.id}-${formik.values.variant}`
    );
  };

  const isStockEmpty =
    (product.tag == tagOptions.READY_STOCK && product.stock == 0) ||
    !product.is_available;

  const handleRedirectCall = () => {
    window.open(`https://t.me/${product.username}`, "_blank");
  };

  return (
    <div className="bg-gray-50 h-[calc(100dvh)] text-sm md:text-md flex flex-col">
      <div className="flex items-center py-2 px-5 md:px-32 gap-5 justify-between bg-white sticky top-0 z-10 shadow-sm">
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
          <CartIcon></CartIcon>
        </div>
      </div>
      <div className="w-full md:flex md:justify-center md:gap-5 max-h-[calc(85dvh)] md:h-full items-center overflow-auto md:overflow-hidden">
        <div className="flex relative rounded-md w-full md:h-auto md:w-1/3">
          {!isLoading && isStockEmpty && (
            <span className="absolute rounded-full z-20 animate-opacity-open bg-gray-900 text-white p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-md shadow-lg font-roboto">
              Habis
            </span>
          )}
          <PhotoProvider>
            <PhotoView src={product.image}>
              <Image
                removeWrapper
                src={product.image}
                alt="image product"
                className={`w-full h-[20rem] md:h-[calc(60dvh)] hover:cursor-zoom-in rounded-md object-contain`}
              />
            </PhotoView>
          </PhotoProvider>
        </div>
        <div className="  md:max-h-[calc(99dvh)] min-h-[calc(44dvh)] md:justify-center md:p-4 bg-white md:w-1/2 md:shadow-md md:rounded-md md:overflow-auto">
          <div className="p-5 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <Chip
                className={`${
                  isStockEmpty
                    ? "text-black "
                    : "text-white bg-primary rounded-md p-1 text-center "
                } text-xs rounded-md capitalize`}
                size="sm"
              >
                {!isStockEmpty ? product.tag : "sold out"}{" "}
                {product.tag == tagOptions.READY_STOCK && !isStockEmpty && (
                  <span>{product.stock}</span>
                )}
              </Chip>
              <div>
                {!isStockEmpty && (
                  <div className="flex h-5 justify-center items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        if (formik.values.qty > 1) {
                          calculateTotal(product.price, product.discount, "-");
                        }
                      }}
                      className="h-full min-w-8 w-10 bg-gray-300 text-black  rounded-md flex justify-center items-center"
                    >
                  -
                    </Button>
                    <div className="w-1/2   text-center h-full flex justify-center items-center">
                      {formik.values.qty}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        if (
                          product.tag == tagOptions.PO ||
                          (product.stock > 1 &&
                            formik.values.qty < product.stock)
                        )
                          calculateTotal(product.price, product.discount, "+");
                      }}
                      className=" h-full min-w-8 w-10 bg-primary text-white  rounded-md flex justify-center items-center"
                    >
                      +
                    </Button>
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
                <p className=" text-wrap text-md">{product.name}</p>
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
              <span className="text-justify">{product.description || "-"}</span>
            </div>
            {product.location && (
              <div className="flex items-center">
                <BiMap className="text-xl" />
                <p className="">{product.location}</p>
              </div>
            )}

            {product.variants?.length > 0 && (
              <div className="flex flex-col gap-2 mt-2 w-full">
                <p>Pilih Variasi</p>
                <div className="gap-2 grid  grid-cols-2">
                  {product.variants?.map((variant, index) => (
                    <Button
                      key={index}
variant="ghost"
                      className={`rounded-md capitalize ${
                        formik.values.variant == variant
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-black"
                      }`}
                      onClick={(e) => {
                        formik.setFieldValue("variant", variant);
                        setCartId(product.id + "-" + variant);
                      }}
                    >
                      {variant}
                    </Button>
                  ))}
                </div>
                <span className=" first-letter:capitalize  text-red-600">
                  {formik.errors.variant}
                </span>
              </div>
            )}
            <div className="flex flex-col gap-2 mt-2">
              <Textarea
                isInvalid={!!formik.errors.note}
                label="Catatan"
                variant="bordered"
                labelPlacement="outside"
                placeholder="Catatan untuk Produk yang akan dibeli"
                className={`shadow-sm rounded-md border-primary resize-none capitalize ${
                  formik.errors.note && "focus:outline-red-600"
                }`}
                errorMessage={formik.errors.note}
                {...formik.getFieldProps("note")}
              />
            </div>
          </div>
          <div className="fixed md:relative bottom-0 w-full text-white">
            <div className="flex w-full items-center border-t-[1px] md:border-0 bg-white h-full p-2 rounded-md">
              <div className="p-2 flex flex-col w-1/3 text-black">
                <p className="">Total</p>
                <p className="font-[sans-serif]">
                  {formatNumberIDR(!isStockEmpty ? total : 0)}
                </p>
              </div>
              <Button
                className={`w-full text-white ${
                  isStockEmpty || !formik.isValid
                    ? "bg-gray-900 "
                    : "bg-primary"
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
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
