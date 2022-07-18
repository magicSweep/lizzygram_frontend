import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FirestoreDate, Photo } from "lizzygram-common-data/dist/types";
import { LoadPhotosState, GetAllPhotosResData } from "../types";

const initialState: LoadPhotosState = {
  nextPageDocRef: undefined,
  hasNextPage: false,
  photos: undefined,
  loading: false,
  error: false,
};

const loadPhotosSlice = createSlice({
  name: "loadPhotos",
  initialState,
  reducers: {
    allPhotosStartNewRequest(state) {
      state.photos = undefined;
      state.loading = true;
      state.error = false;
    },
    allPhotosStartMoreRequest(state) {
      state.loading = true;
      state.error = false;
    },
    allPhotosRequestSuccess(state, action: PayloadAction<GetAllPhotosResData>) {
      state.photos = action.payload.photos;
      state.loading = false;
      state.error = false;
      state.nextPageDocRef = action.payload.nextPageDocRef;
      state.hasNextPage = action.payload.hasNextPage;
    },
    fetchMorePhotosRequestSuccess(
      state,
      action: PayloadAction<GetAllPhotosResData>
    ) {
      state.photos = state.photos?.concat(action.payload.photos);
      state.loading = false;
      state.error = false;
      state.nextPageDocRef = action.payload.nextPageDocRef;
      state.hasNextPage = action.payload.hasNextPage;
    },
    allPhotosRequestError(state) {
      state.loading = false;
      state.error = true;
    },
    addPhoto(state, action: PayloadAction<Photo<FirestoreDate>>) {
      if (state.photos === undefined) {
        state.photos = [action.payload];
      } else {
        state.photos.unshift(action.payload);
      }
    },
    editPhoto(state, action: PayloadAction<Photo<FirestoreDate>>) {
      if (state.photos !== undefined) {
        let photoToEditIndex = 0;

        const photoToEdit = state.photos?.find((photo, i) => {
          let isEqual = photo.id === action.payload.id;
          if (isEqual === true) photoToEditIndex = i;
          return isEqual;
        });

        if (photoToEdit !== undefined) {
          state.photos[photoToEditIndex] = {
            //...state.photos[photoToEditIndex],
            ...photoToEdit,
            ...action.payload,
          };
        }
      }
    },
  },
});

export const {
  allPhotosStartNewRequest: allPhotosStartNewRequestAC,
  allPhotosStartMoreRequest: allPhotosStartMoreRequestAC,
  allPhotosRequestSuccess: allPhotosRequestSuccessAC,
  fetchMorePhotosRequestSuccess: fetchMorePhotosRequestSuccessAC,
  allPhotosRequestError: allPhotosRequestErrorAC,
  addPhoto: addPhotoAC,
  editPhoto: editPhotoAC,
} = loadPhotosSlice.actions;

export default loadPhotosSlice.reducer;
