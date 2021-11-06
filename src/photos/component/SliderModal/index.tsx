import React, { MutableRefObject } from "react";
import Modal, { ModalProps } from "@mui/material/Modal";
import Grow from "@mui/material/Grow";

export interface SliderModalProps extends ModalProps {
  //wrapperRef?: MutableRefObject<any>;
  children: any;
}

const SliderModal = ({
  open,
  children,
  //wrapperRef,
  ...props
}: SliderModalProps) => {
  //const classes = useStyles();
  return (
    <>
      {/* <Button variant="outlined" color="primary" onClick={handleToggle}>
        Show backdrop
      </Button> */}
      <Modal
        open={open}
        className="flex justify-center items-center overflow-auto border-0 bg-transparent"
        //onClose={onClose}
        disableAutoFocus={true}
        //aria-labelledby="simple-modal-title"
        //aria-describedby="simple-modal-description"
        closeAfterTransition
        hideBackdrop
        {...props}
      >
        <Grow in={open} timeout={1000} mountOnEnter unmountOnExit>
          <div
            //@ts-ignore
            /*  ref={wrapperRef} */
            className="relative outline-none overflow-auto bg-black w-screen h-screen"
          >
            {children}
          </div>
        </Grow>
      </Modal>
    </>
  );
};

export default SliderModal;

{
  /*  <div className={wrapperClass}>
          <ModalCloseButton
            onClick={onClose}
            ariaLabel="Закрыть модальное окно."
          />
          {children}
        </div> */
}
