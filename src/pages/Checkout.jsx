import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchSeller, getUser } from "../repository/users";
import { formatNumberIDR } from "../utils/formatter";
import { BsArrowLeft, BsPencil, BsShop } from "react-icons/bs";
import { getAllCheckout } from "../repository/carts";
import { AiOutlineCopy, AiOutlinePrinter } from "react-icons/ai";
import SocialMedia from "../components/SocialMedia";
import { getAttrDate } from "../utils/date";
import { checkCompleteCustomer, getCustomer } from "../repository/customer";
import PaymentList from "../components/PaymentList";
import Dropzone from "../components/Dropzone";
import { BiTrash } from "react-icons/bi";
import { sendOrders } from "../repository/orders";
import { Flip, toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Loading from "../components/Loading";
import { SlArrowLeft } from "react-icons/sl";
import { Button, Radio, RadioGroup } from "@nextui-org/react";
import promo from "../utils/promo";

function Checkout() {
  const [user, setUser] = useState({});
  const [total, setTotal] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(false);
  const { username } = useParams();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [note, setNote] = useState("");
  const [VA, setVA] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSeller().then((users) => {
      const productDetail = getAllCheckout();
      const seller = getUser(users, username);
      setUser(seller);
      setProducts(productDetail);

      if (!seller || productDetail.length == 0 || !checkCompleteCustomer()) {
        return navigate("/404");
      }

      let tmpTotal = 0;
      let tmpTotalQty = 0;
      let message = "";

      productDetail.forEach((product, index) => {
        tmpTotal += (product.price * product.qty) - product.voucher;
        tmpTotalQty += product.qty;

        message += `
${index + 1}. <b>${product.name}</b> ${
          product.variant ? `- <i>${product.variant}</i>` : ""
        } 
    ${product.qty} x ${product.price} = ${formatNumberIDR(
          (product.price * product.qty) - product.voucher
        )}
    ${product.voucher > 0 ? `Hemat: ${formatNumberIDR(product.voucher)}` : ""}
    <i>${product.note || "tidak ada"}</i>`;
      });

      setTotal(tmpTotal);
      setTotalQty(tmpTotalQty);
      setTitle(message);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, []);

  const alert = (typeAlert, message) => {
    toast[typeAlert](message, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Flip,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoadingSubmit(true);

    const orderId = `#${Date.now()}`;
    const message = `No Order: <b>${orderId}</b>
Seller: <b>@${username}</b>

<b><u>Data Pembeli</u></b>
Nama: <b>${getCustomer().customer}</b>
Akun: <b>@${getCustomer().telegram.replace("@", "")}</b>
Metode Pembayaran: <b>${paymentMethod.toUpperCase()}</b>
Catatan: <b>${note || "tidak ada"}</b>

<b><u>Data Produk</u></b> ${title}

Total: <b>${formatNumberIDR(total)}</b>

<strong>Jangan lupa Konfirmasi Pesanan ini ke pelanggan kamu 🤝</strong>

<strong>JDS Mart - Dari <b>UMKM</b> untuk <b>Semua!</b> 😁</strong>
${location.origin}
`;

console.log(message);

    if (paymentMethod != "cash" && !file)
      return alert("error", `bukti transfer belum di unggah!`);

    if (file && file.size >= 1024 * 1024) {
      return alert("error", `file tidak boleh lebih dari 1MB`);
    }

    if (file && !/image/.test(file.type)) {
      return alert("error", `file yang di upload harus berupa gambar`);
    }

    setTimeout(() => {
      setIsLoadingSubmit(false);
      sendOrders(orderId, products, paymentMethod, file, message);
      navigate("/success-order");
    }, 1000);
  };

  return (
    <form action="#" onSubmit={handleSubmit} className="text-sm  md:text-base">
      <div className="bg-gray-50 h-[calc(100dvh)] flex flex-col relative text-sm">
        <div className="flex gap-2 py-3 px-2 items-center shadow-sm sticky top-0 z-10 bg-white text-black">
          <SlArrowLeft
            className="text-lg hover:cursor-pointer"
            onClick={() => navigate("/list")}
          />
          <p className="text-base">Proses Bayar</p>
        </div>
        <div className="w-full h-[calc(82dvh)] overflow-auto md:flex gap-5">
          {!isLoading && (
            <>
              <div className="md:w-full">
                <p className="py-3 px-2 text-base">Rincian Pembelian</p>
                <div className="border-1 flex flex-col gap-2 py-2 items-center justify-center w-full bg-white shadow-md p-4">
                  {products.map((product, index) => {
                    return (
                      <div className=" flex flex-col gap-1 w-full " key={index}>
                        <p className="print:font-normal print:text-xs">
                          {index + 1}. {product.name}{" "}
                          {product.variant && (
                            <span className="capitalize font-bold">
                              - {product.variant} <br />
                            </span>
                          )}{" "}
                        </p>
                        <p className="print:text-xs text-sm px-4 italic text-gray-600">
                          catatan: {product.note || "tidak ada"}
                        </p>
                        <div className="flex justify-between ">
                          <p className="px-4 print:text-xs flex gap-5 items-center">
                            {product.qty} x {formatNumberIDR(product.price)}{" "}
                            {product.voucher > 0 && (
                              <span className="text-xs">
                                Hemat {formatNumberIDR(product.voucher)}
                              </span>
                            )}
                          </p>
                          <p className="print:text-xs">
                            {formatNumberIDR(
                              (product.qty * product.price) - product.voucher
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div className="bg-white w-full flex border-t-[1px] border-black py-1 justify-between mt-10">
                    <p>Total Jumlah: {totalQty}</p>
                    <p>{formatNumberIDR(total)}</p>
                  </div>
                </div>
                <p className="py-3 px-2 text-base">Catatan Buat Penjual</p>
                <div className="px-2">
                  <textarea
                    name="note"
                    rows={3}
                    maxLength={50}
                    className="w-full rounded-md resize-none p-2 focus:outline-none border-[1px] border-primary"
                    placeholder="Pesanan nya aku ambil hari Senin yah..."
                    onChange={(e) => setNote(e.target.value)}
                    value={note}
                  >
                    {note}
                  </textarea>
                </div>
              </div>
              <div className="md:w-full">
                <p className=" py-3 px-2 text-base">Metode Pembayaran</p>
                <div className="flex flex-col gap-2 p-2 bg-white rounded-md">
                  <RadioGroup
                    color="primary"
                    value={paymentMethod}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setVA(e.target.id);
                    }}
                  >
                    <PaymentList
                      payment={{ provider: "cash", value: "" }}
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                      setVA={setVA}
                    />
                    {user?.payments?.map((payment, index) => {
                      return (
                        <PaymentList
                          payment={payment}
                          key={index}
                          paymentMethod={paymentMethod}
                          setPaymentMethod={setPaymentMethod}
                          setVA={setVA}
                        />
                      );
                    })}
                  </RadioGroup>
                </div>
                {paymentMethod != "cash" && VA && (
                  <div
                    className={` flex flex-col gap-2  p-2 bg-white animate-opacity-open`}
                  >
                    <div className="border border-primary rounded-md flex justify-between items-center p-4">
                      <p className="">
                        {" "}
                        No Rek <span className="font-bold">{VA}</span>
                      </p>
                      <CopyToClipboard
                        text={VA}
                        onCopy={() =>
                          alert("success", "No Rek Disalin di Papan Klip")
                        }
                      >
                        <AiOutlineCopy
                          className={
                            "text-3xl hover:cursor-copy bg-gray-100 rounded-md text-primary"
                          }
                        />
                      </CopyToClipboard>
                    </div>
                  </div>
                )}
                {paymentMethod != "cash" && (
                  <div className="flex flex-col items-center px-2 py-5 gap-5 w-full animate-opacity-open">
                    <p>Upload Bukti Pembayaran</p>
                    <div className="relative flex flex-col items-center gap-6 w-full">
                      <Dropzone setFile={setFile} />

                      {file && (
                        <div className="absolute bg-white border border-dashed rounded-md border-primary w-full p-5 h-full flex justify-center items-center">
                          <>
                            <PhotoProvider>
                              <PhotoView src={URL.createObjectURL(file)}>
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt="gambar uploaded"
                                  className="object-contain w-40 h-32 hover:cursor-pointer"
                                />
                              </PhotoView>
                            </PhotoProvider>
                            <BiTrash
                              className="text-2xl text-red-500 absolute top-2 right-2"
                              onClick={() => setFile(undefined)}
                            />
                          </>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {isLoading && (
            <div className="flex h-[calc(76dvh)] w-full justify-center items-center">
              <Loading></Loading>
            </div>
          )}
        </div>
        <div className="fixed md:relative bottom-0  text-sm h-24 flex w-full items-center gap-2 md:bg-transparent bg-white shadow-lg justify-between md:justify-end">
          <div className=" flex flex-col w-full md:w-1/2 items-center py-2 px-4 gap-2 h-full md:bg-white md:shadow-lg">
            <div className="flex items-center justify-between w-full">
              <p>Total Bayar</p>
              <div className="flex items-center gap-1">
                <CopyToClipboard
                  text={total}
                  onCopy={() =>
                    alert("success", "Total Bayar Disalin di Papan Klip")
                  }
                >
                  <AiOutlineCopy
                    className={
                      "text-3xl hover:cursor-copy p-1 bg-gray-100 rounded-md text-primary"
                    }
                  />
                </CopyToClipboard>
                <p>
                  {!isLoading ? (
                    formatNumberIDR(total)
                  ) : (
                    <Loading size={15}></Loading>
                  )}
                </p>
              </div>
            </div>
            <Button
              className="w-full bg-primary rounded-md p-2 flex gap-3 justify-center items-center text-white"
              type="submit"
            >
              Bayar
              {isLoadingSubmit && <Loading size={20} color="#fff"></Loading>}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Checkout;
