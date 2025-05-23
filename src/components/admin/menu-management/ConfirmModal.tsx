import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";



interface Props {
    isOpen: boolean;
    onOk: () => void;
    onCancel?: () => void;
  }

export default function ConfirmModal({ isOpen, onOk, onCancel }: Props) {
  return (
    <Modal
      backdrop="opaque"
      classNames={{
        body: "py-6 ",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "rounded-xl border-[#292f46] theme text-[#a8b0d3]",
        header: "theme border-[#292f46]",
        footer: "border-[#292f46]",
        // closeButton: "border-gray-300 theme",
      }}
      isOpen={isOpen}
      placement="top-center"
      radius="lg"
      onClose={onCancel}
    >
      <ModalContent>
        {(onCancel) => (
          <>
            <ModalHeader className="flex flex-col gap-1 justify-center items-center">
              <h1 className="text-xl font-semibold theme">Delete Menu</h1>
            </ModalHeader>
            <ModalBody className="flex justify-center items-center">
              <p>Are you sure you want to delete menu?</p>{" "}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onCancel}>
                Close
              </Button>
              <Button color="primary" onPress={onOk} >
                OK
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
