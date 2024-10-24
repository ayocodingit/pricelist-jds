import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchSeller, getUser } from "../repository/users";
import { formatNumberIDR } from "../utils/formatter";
import { BsArrowLeft, BsPencil, BsShop } from "react-icons/bs";
import { getAllCheckout } from "../repository/carts";
import { AiOutlineCopy, AiOutlinePrinter } from "react-icons/ai";
import SocialMedia from "../components/SocialMedia";
import { getAttrDate } from "../utils/date";
import { getCustomer } from "../repository/customer";
import PaymentList from "../components/PaymentList";
import Dropzone from "../components/Dropzone";
import { BiTrash } from "react-icons/bi";
import { sendOrders } from "../repository/orders";
import { Flip, toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import { PhotoProvider, PhotoView } from "react-photo-view";

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
  const [VA, setVA] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSeller().then((users) => {
      const productDetail = getAllCheckout();
      setUser(getUser(users, username));
      setProducts(productDetail);

      let tmpTotal = 0;
      let tmpTotalQty = 0;
      let message = "";

      productDetail.forEach((product, index) => {
        tmpTotal += product.price * product.qty;
        tmpTotalQty += product.qty;
        message += `
${index + 1}. <b>${product.name}</b>
    ${product.qty} x ${product.price} = ${formatNumberIDR(
          product.qty * product.price
        )}
    <i>${product.note}</i>`;
      });

      setTotal(tmpTotal);
      setTotalQty(tmpTotalQty);
      setTitle(message);
    });
  }, []);

  if (
    Object.keys(user).length === 0 ||
    products.length == 0 ||
    !getCustomer()
  ) {
    return navigate("/404");
  }

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
    const message = `Asiik ada yang beli produkmu @${username}
 
<b>Berikut Rinciannya</b>

<b><u>Data Pelanggan</u></b>

Nama: <b>${getCustomer().customer}</b>
Akun: <b>@${getCustomer().telegram}</b>
Metode Pembayaran: <b>${paymentMethod.toUpperCase()}</b>
Detail produk: ${title}
Total: <b>${formatNumberIDR(total)}</b>

<strong>Jangan lupa Konfirmasi Pesanan ini ke pelanggan</strong>

${location.origin}
`;
    if (paymentMethod != "cash" && !file)
      return alert("error", `bukti transfer belum di unggah!`);

    if (file && file.size >= 1024 * 1024) {
      return alert("error", `file tidak boleh lebih dari 1MB`);
    }

    if (file && !/image/.test(file.type)) {
      return alert("error", `file yang di upload harus berupa gambar`);
    }

    sendOrders(products, paymentMethod, file, message);
    navigate("/success-order");
  };

  return (
    <>
      <form action="#" onSubmit={handleSubmit} className="print:hidden">
        <div className="bg-gray-50 min-h-[calc(100dvh)] print:hidden flex flex-col md:items-center relative text-sm">
          <div className="w-full md:w-1/2 max-h-[calc(88dvh)] overflow-auto">
            <div className="flex gap-2 py-3 px-2 items-center shadow-lg sticky top-0 z-10 bg-primary text-white">
              <BsArrowLeft
                className="p-1 text-3xl hover:cursor-pointer"
                onClick={() => navigate("/list")}
              />
              <p>Proses Bayar</p>
            </div>
            <p className="font-bold py-3 px-2">Rincian Pembelian</p>
            <div className="border-1 flex flex-col gap-2 py-2 items-center justify-center w-full bg-white shadow-md p-4">
              {products.map((product, index) => {
                return (
                  <div className=" flex flex-col gap-1 w-full " key={index}>
                    <p className="print:font-normal print:text-xs">
                      {index + 1}. {product.name}
                    </p>
                    <p className="print:text-xs text-sm px-4 -my-1 italic text-gray-600">
                      {product.note}
                    </p>
                    <div className="flex justify-between ">
                      <p className="px-4 print:text-xs">
                        {product.qty} x {product.price}
                      </p>
                      <p className="print:text-xs">
                        {formatNumberIDR(product.qty * product.price)}
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
            <p className="font-bold py-3 px-2">Metode Pembayaran</p>
            <div className="flex flex-col gap-2 p-2 bg-white rounded-lg">
              <PaymentList
                payment={{ provider: "cash", value: "" }}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                setVA={setVA}
              />
              {user.payments.map((payment, index) => {
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
            </div>
            {paymentMethod != "cash" && VA && (
              <div className=" flex flex-col gap-2  p-2 bg-white">
                <div className="outline-dotted outline-primary outline-1  flex justify-between items-center p-5">
                  <p className=""> No Rek {VA}</p>
                  <CopyToClipboard
                    text={VA}
                    onCopy={() =>
                      alert("success", "No Rek Disalin di Papan Klip")
                    }
                  >
                    <AiOutlineCopy
                      className={"text-2xl hover:cursor-copy mr-5"}
                    />
                  </CopyToClipboard>
                </div>
              </div>
            )}
            {paymentMethod != "cash" && (
              <div className="flex flex-col items-center p-5 gap-5 w-full">
                <p>Upload Bukti Pembayaran</p>
                <div className="relative flex flex-col items-center gap-6 w-full">
                  <Dropzone setFile={setFile} />

                  {file && (
                    <div className="absolute bg-gray-50 border border-dashed border-primary w-full p-5 h-full flex justify-center items-center">
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
          <div className="fixed md:relative bottom-0 z-10 text-sm h-24 flex w-full items-center gap-2 bg-white shadow-lg md:w-1/2 justify-between">
            <div className=" flex flex-col w-full items-center  px-5 py-2 h-full">
              <div className="flex items-center justify-between p-2 w-full">
                <p>Total Bayar</p>
                <div className="flex items-center">
                  <p>{formatNumberIDR(total)}</p>
                  <CopyToClipboard
                    text={total}
                    onCopy={() =>
                      alert("success", "Total Bayar Disalin di Papan Klip")
                    }
                  >
                    <AiOutlineCopy className={"text-xl hover:cursor-copy"} />
                  </CopyToClipboard>
                </div>
              </div>
              <button
                className="w-full bg-primary h-full text-white"
                type="submit"
              >
                Bayar
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="hidden print:flex flex-col bg-gray-50 print:bg-white items-center w-full md:justify-center p-5 gap-4 relative print:justify-normal print:text-xs print:w-[58mm] print:h-[100mm] print:font-extralight min-h-screen">
        <div className="text-md flex flex-col gap-2 items-center md:w-1/2">
          <Link to={"/list"}>
            <BsShop className="text-5xl print:text-3xl" />
          </Link>
          <p className="text-center">{user.name_card}</p>
        </div>

        <div className="flex flex-col gap-2 p-2 print:p-0 w-full bg-white shadow-lg print:shadow-none text-md md:w-1/2 print:w-full print:py-2 print:border-t-[1px] border-black print:text-xs">
          {products.map((product, index) => {
            return (
              <div className=" flex flex-col gap-1" key={index}>
                <p className="font-bold print:font-normal print:text-xs">
                  {index + 1}. {product.name}
                </p>
                <p className="print:text-xs text-sm px-4 -my-1 italic text-gray-600">
                  {product.note}
                </p>
                <div className="flex justify-between ">
                  <p className="px-4 print:text-xs">
                    {product.qty} x {product.price}
                  </p>
                  <p className="print:text-xs">
                    {formatNumberIDR(product.qty * product.price)}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="bg-white w-full flex border-t-[1px] border-black py-1 justify-between mt-32">
            <p>Total QTY: {totalQty}</p>
            <p>{formatNumberIDR(total)}</p>
          </div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-center gap-5 print:hidden">
          <div className="flex gap-2 items-center">
            <SocialMedia title={title} size={30} />
            <AiOutlinePrinter
              className="hover:cursor-pointer text-3xl"
              title="Print Order"
              onClick={() => {
                const { month, date, year } = getAttrDate();
                document.title = `Order Price List ${month}-${date}-${year}`;
                window.print();
              }}
            />
            <BsPencil
              title="Edit Message"
              className={`text-2xl ${edit && "border-b-2 border-black"}`}
              onClick={() => setEdit((prev) => !prev)}
            />
          </div>
          {edit && (
            <textarea
              className="rounded-md outline-2 outline-primary font-[sans-serif]  outline-dashed p-2 w-full h-44 bg-white shadow-lg"
              onChange={(e) => setTitle(e.target.value)}
              disabled={!edit}
            >
              {title}
            </textarea>
          )}
        </div>
      </div>
    </>
  );
}

export default Checkout;
