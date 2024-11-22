import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { useEffect } from "react";

function Description({ description, setShowDetail }) {
  const { isOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpenChange();
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        placement="auto"
        onClose={() => {
          setShowDetail(false);
          onClose();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-md">
                Detail Produk
              </ModalHeader>
              <ModalBody>
                <div
                  dangerouslySetInnerHTML={{ __html: description || "-" }}
                  className="text-sm"
                ></div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Description;
