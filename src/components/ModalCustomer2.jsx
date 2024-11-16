import React from "react";
import { getCustomer, storeCustomer } from "../repository/customer";
import { Flip, toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
useDisclosure,
} from "@nextui-org/react";

function ModalCustomer2({ setIsModalCustomer, isModalCustomer }) {
  const { customer, telegram } = getCustomer();
  
const {isOpen, onOpen, onClose} = useDisclosure();

  const formik = useFormik({
    initialValues: {
      customer: customer ?? "",
      telegram: telegram ?? "",
    },
    onSubmit: (values) => {
      storeCustomer(values);
      formik.resetForm();
      alert("success", "Registrasi berhasil");
      setIsModalCustomer(false);
    },
    validationSchema: yup.object().shape({
      customer: yup.string().min(3).required().label("Nama Lengkap - Divisi"),
      telegram: yup.string().min(3).required().label("akun telegram"),
    }),
  });

  const alert = (status, message) => {
    toast[status](message, {
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


  return (
    <Modal
      isOpen={isModalCustomer}
      closeModal={() => setIsModalCustomer(false)}
      backdrop="opaque"
      placement="auto"
    >
      <ModalContent>
        <form
          action="#"
          onSubmit={formik.handleSubmit}
          className="rounded-md flex flex-col gap-1 items-center text-sm w-full"
        >
          <ModalHeader>Registrasi Pembeli</ModalHeader>
          <ModalBody>
            <Input
              label="Nama Lengkap - Divisi"
              labelPlacement="outside"
              placeholder="Nama Lengkap - Divisi"
              variant="bordered"
              {...formik.getFieldProps("customer")}
              isInvalid={!!formik.errors.customer}
              errorMessage={formik.errors.customer}
            />
            <Input
              label="Akun Telegram"
              labelPlacement="outside"
              placeholder="@aseptea"
              variant="bordered"
              {...formik.getFieldProps("telegram")}
              isInvalid={!!formik.errors.telegram}
              errorMessage={formik.errors.telegram}
            />
            
            <div className="w-full flex flex-col mb-4 text-xs gap-1">
              <span>
                *) Akun Telegram akan digunakan untuk konfirmasi pesanan
              </span>
              <span>
                *) Form Registrasi Pembeli ini berlaku hanya sementara waktu
              </span>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={formik.isSubmitting || !formik.isValid}
              color="primary"
              type="submit"
              className={`w-full ${
                formik.isSubmitting || (!formik.isValid && "opacity-70")
              }`}
            >
              Simpan
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default ModalCustomer2;
