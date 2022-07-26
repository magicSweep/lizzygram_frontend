import { useContext } from "react";
import { PhotoSliderContext } from "../../container/PhotoSlider/PhotoSlider.provider";

export const usePhotoSliderContext = () => {
  const state = useContext(PhotoSliderContext);

  return state;
};
