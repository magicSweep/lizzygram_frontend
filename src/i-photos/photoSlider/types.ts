import { Action } from "redux";

export type PhotoSliderState = {
  show: boolean;
  activePhotoIndex: number;
};

export type PhotoSliderActionTypes = "SHOW_PHOTO_SLIDER" | "HIDE_PHOTO_SLIDER";

export interface PhotoSliderAction extends Action<any> {
  type: PhotoSliderActionTypes;
  photoIndex?: number;
  //userUid?: string;
}
