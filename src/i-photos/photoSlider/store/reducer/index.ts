import { Reducer } from "redux";
import { PhotoSliderAction, PhotoSliderState } from "../../types";

const photosInitialState: PhotoSliderState = {
  show: false,
  activePhotoIndex: 0,
  /* activePhotoIndex: 0,
  activePhoto: undefined,
  isZoomed: false, */
};

const reducer: Reducer<PhotoSliderState, PhotoSliderAction> = (
  state = photosInitialState,
  action: PhotoSliderAction
) => {
  switch (action.type) {
    case "SHOW_PHOTO_SLIDER":
      return {
        ...state,
        show: true,
        activePhotoIndex: action.photoIndex as number,
      };

    case "HIDE_PHOTO_SLIDER":
      return {
        ...state,
        show: false,
      };

    default:
      return state;
  }
};

export default reducer;
