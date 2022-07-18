import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PhotoSliderState } from "../types";

const initialState: PhotoSliderState = {
  show: false,
  activePhotoIndex: 0,
  /* activePhotoIndex: 0,
  activePhoto: undefined,
  isZoomed: false, */
};

const photoSlider = createSlice({
  name: "photoSlider",
  initialState,
  reducers: {
    showPhotoSlider(state, action: PayloadAction<number>) {
      state.show = true;
      state.activePhotoIndex = action.payload;
    },
    hidePhotoSlider(state) {
      state.show = false;
    },
  },
});

export const {
  showPhotoSlider: showPhotoSliderAC,
  hidePhotoSlider: hidePhotoSliderAC,
} = photoSlider.actions;

export default photoSlider.reducer;
