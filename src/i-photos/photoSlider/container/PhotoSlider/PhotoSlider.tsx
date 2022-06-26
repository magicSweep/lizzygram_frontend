import React from "react";
import { usePhotoSlider } from "./../../hook/usePhotoSlider";
import PhotoSliderWidget from "./PhotoSliderWithDesc";
import { PhotoSliderProvider } from "./PhotoSlider.provider";

export const PhotoSlider = () => {
  //const props: PhotoSliderWithDescProps = usePhotoSlider();

  //console.log("[PHOTO SLIDER] RENDER", props);

  //return <p>Hello....</p>;

  return (
    <PhotoSliderProvider>
      <PhotoSliderWidget />
    </PhotoSliderProvider>
  );
};

export default PhotoSlider;
