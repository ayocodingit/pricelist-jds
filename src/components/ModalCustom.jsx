import React from "react";
import Modal from "react-modal";

function ModalCustom({ modalIsOpen, closeModal, children }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          top: "auto",
          left: "50%",
          right: "auto",
          bottom: "0%",
          marginRight: "-50%",
          display: "flex",
          justifyContent: "center",
          transform: "translate(-50%, -50%)",
          width: "90%"
        },
      }}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
}

export default ModalCustom;
