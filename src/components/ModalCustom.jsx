import React from "react";
import Modal from "react-modal";
import "./modalCustom.css";

function ModalCustom({ modalIsOpen, closeModal, children }) {
  const customStyles = {
    content: {
      top: "75%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "95%",
      display: "flex",
      justifyContent: "center",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Modal
      id="modal"
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
}

export default ModalCustom;
