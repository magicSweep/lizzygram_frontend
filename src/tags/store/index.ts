import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TagsState, TagData } from "./../types";

const initialState: TagsState = {
  items: undefined,
  loading: true,
  error: false,
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    tagsRequestStart(state) {
      state.loading = true;
      state.error = false;
    },
    tagsRequestSuccess(state, action: PayloadAction<TagData[]>) {
      state.items = action.payload;
      state.error = false;
      state.loading = false;
    },
    tagsRequestError(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  tagsRequestStart: tagsRequestStartAC,
  tagsRequestSuccess: tagsRequestSuccessAC,
  tagsRequestError: tagsRequestErrorAC,
} = tagsSlice.actions;

export default tagsSlice.reducer;
