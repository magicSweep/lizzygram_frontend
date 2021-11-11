import React from "react";
import { usePhotoSlider } from "./hook";
import PhotoSliderWidget, {
  PhotoSliderWithDescProps,
} from "./PhotoSliderWithDesc";

export const PhotoSlider = () => {
  const props: PhotoSliderWithDescProps = usePhotoSlider();

  console.log("[PHOTO SLIDER] RENDER", props);

  //return <p>Hello....</p>;

  return <PhotoSliderWidget {...props} />;
};

export default PhotoSlider;
