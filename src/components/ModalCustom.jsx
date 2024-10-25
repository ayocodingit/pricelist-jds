import React from "react";
import Modal from "react-modal";
import './ModalCustom.css'

function ModalCustom({ modalIsOpen, closeModal, children }) {
  return (
    <Modal
      id="modal"
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={300}
      style={{
        content: {
          top: "auto",
          left: "50%",
          right: "auto",
          bottom: "0%",
          display: "flex",
          justifyContent: "center",
          transform: "translate(-50%, -50%)",
          width: "90%",
        },
      }}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
}

export default ModalCustom;
