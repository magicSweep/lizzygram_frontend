import { PhotoSliderAction } from "../../types";

export const showPhotoSliderAC = (photoIndex: number): PhotoSliderAction => {
  return {
    type: "SHOW_PHOTO_SLIDER",
    photoIndex,
  };
};

export const hidePhotoSliderAC = (): PhotoSliderAction => {
  return {
    type: "HIDE_PHOTO_SLIDER",
  };
};
