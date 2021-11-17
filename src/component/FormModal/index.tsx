import React, { MutableRefObject } from "react";
import Modal, { ModalProps } from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Slide from "@mui/material/Slide";

export interface FormModalProps extends ModalProps {
  //wrapperRef?: MutableRefObject<any>;
  children: any;
}

const FormModal = ({
  open,
  children,
  //wrapperRef,
  ...props
}: FormModalProps) => {
  return (
    <>
      <Modal
        open={open}
        className="flex justify-center items-center overflow-auto border-0 bg-transparent"
        //onClose={onClose}
        disableAutoFocus={true}
        //aria-labelledby="simple-modal-title"
        //aria-describedby="simple-modal-description"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        closeAfterTransition
        {...props}
      >
        <Slide in={open} timeout={300} mountOnEnter unmountOnExit>
          <div className="outline-none overflow-auto relative max-h-9/10 shadow-lg bg-transparent">
            {children}
          </div>
        </Slide>
      </Modal>
    </>
  );
};

export default FormModal;
