import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getByID } from "../repository/produts";
import { BsArrowLeft } from "react-icons/bs";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { BiMap } from "react-icons/bi";
import { calculateDiscount, formatNumberIDR } from "../utils/formatter";
import { TelegramIcon, TelegramShareButton } from "react-share";

function DetailProduct() {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(0);
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    const productDetail = getByID(id);

    if (productDetail) {
      setProduct(productDetail);
      setTotal(
        calculateDiscount(productDetail.price, productDetail.discount) * qty
      );
      return;
    }

    navigate("/404");
  }, []);

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

  return (
    <div className="flex flex-col bg-gray-50 h-[calc(100dvh)]  relative">
      <div className="w-full flex md:justify-center">
        <div className="w-full md:w-1/2 flex justify-center md:border-x-4 border-white">
          <PhotoProvider className={`${!product.is_available && "grayscale"}`}>
            <PhotoView src={product.image}>
              <img
                src={product.image}
                alt="image product"
                className={`max-h-[20rem]  w-full relative object-contain border-2 border-gray-100 hover:cursor-zoom-in ${
                  !product.is_available && "grayscale"
                }`}
              />
            </PhotoView>
          </PhotoProvider>
          <div className="flex absolute start-5 md:end-[30rem] justify-between md:start-[26%] gap-5 top-5 ">
            <Link
              to={"/list"}
              className="  text-white text-2xl flex  items-center justify-between gap-3"
            >
              <BsArrowLeft className="bg-black rounded-full bg-opacity-30 text-3xl p-1" />
              <TelegramShareButton
                url={`Haloo Akang Teteh~`}
                title={`
Mangga in case ada yg mau beli

**~${product.name}~**
${product.image}
Harganya cuma **${formatNumberIDR(product.price)}** aja

untuk info detail produknya silakan kunjungi di bawah ini yah 
${location.href}

Hatur nuhun~ ✨
`}
              >
                <TelegramIcon size={32} round={true} />
              </TelegramShareButton>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex md:justify-center h-full">
        <div className="md:w-1/2 w-full    flex md:bg-white">
          <div className="mt-2 p-4 flex justify-between gap-5">
            <div className="flex flex-col gap-2">
              {product.discount > 0 && (
                <span className="text-sm text-primary font-serif underline">
                  Promo {product.discount}%
                </span>
              )}
              <p className="text-orange-600 text-md font-serif flex gap-2 items-center">
                {formatNumberIDR(
                  calculateDiscount(product.price, product.discount)
                )}
              </p>
              <p className="text-[#5D9F5D] text-center outline-dashed px-2 outline-[#5D9F5D] text-sm rounded-md capitalize">
                {product.tag} <span>{product.stock}</span>
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

              <div className="flex gap-5 items-center">
                <label htmlFor="" className="text-sm">Quantity</label>
                <div className="flex h-8 justify-center items-center w-32">
                  <button
                    onClick={() => {
                      if (qty > 1) {
                        calculateTotal(product.price, product.discount, "-");
                      }
                    }}
                    className=" w-full bg-primary text-white text-xl rounded-full h-full"
                  >
                    -
                  </button>
                  <div className="w-full  text-center h-full flex justify-center items-center">
                    {qty}
                  </div>
                  <button
                    onClick={() => {
                      if (
                        !product.stock ||
                        (product.stock > 1 && qty < product.stock)
                      )
                        calculateTotal(product.price, product.discount, "+");
                    }}
                    className="w-full bg-primary text-white text-xl rounded-full h-full"
                  >
                    +
                  </button>
                </div>
              </div>
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
      <div className=" w-full absolute bottom-0 flex items-center md:justify-center">
        <Link
          to={`/payment/${product.id}/${product.username}/${qty}`}
          className="hover:bg-opacity-90 flex h-10 w-full md:w-1/2 md:justify-center  bg-[#5D9F5D] "
        >
          <div className="text-center text-white text-sm w-full flex items-center justify-center font-serif">
            Order Now
          </div>
        </Link>
      </div>
    </div>
  );
}

export default DetailProduct;
