import { Button, Modal } from "flowbite-react";

const ModalCore = ({
  title,
  btnTitle,
  formSubmit,
  children,
  openModal,
  actClose,
}) => {
  return (
    <>
      <Modal
        className="bg-black bg-opacity-60"
        show={openModal}
        position={"center"}
        onClose={() => actClose()}
      >
        <Modal.Header>{title}</Modal.Header>
        <form onSubmit={formSubmit}>
          <Modal.Body>{children}</Modal.Body>
          <Modal.Footer>
            <Button className="text-white" type="submit">
              {btnTitle}
            </Button>
            <Button color="gray" onClick={() => actClose()}>
              Back
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default ModalCore;
