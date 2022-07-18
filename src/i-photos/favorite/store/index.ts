import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoriteAction, FavoriteState } from "../types";

const initialState: FavoriteState = {
  favoriteReqs: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    favoritePhotoStartRequest(state, action: PayloadAction<string>) {
      state.favoriteReqs.push(action.payload);
    },
    favoritePhotoErrorRequest(state, action: PayloadAction<string>) {
      state.favoriteReqs = state.favoriteReqs.filter(
        (photoId) => photoId !== action.payload
      );
    },
    favoritePhotoSuccessRequest(state, action: PayloadAction<string>) {
      state.favoriteReqs = state.favoriteReqs.filter(
        (photoId) => photoId !== action.payload
      );
    },
  },
});

export const {
  favoritePhotoStartRequest: favoritePhotoStartRequestAC,
  favoritePhotoErrorRequest: favoritePhotoErrorRequestAC,
  favoritePhotoSuccessRequest: favoritePhotoSuccessRequestAC,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
