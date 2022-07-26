import React from "react";
import SliderModal from "../../component/SliderModal";
import PhotoSlider from "./PhotoSlider";

// <SliderModal open={show}>
export const ModalPhotoSlider = ({ show }: { show: boolean }) => {
  //console.log("[PHOTO SLIDER] RENDER");
  return (
    <SliderModal open={show}>
      <PhotoSlider />
    </SliderModal>
  );
};

export default ModalPhotoSlider;
