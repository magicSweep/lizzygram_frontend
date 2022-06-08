import { Reducer } from "redux";
import { LoadPhotosState, PhotosAction } from "../../types";
//import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import {
  onFetchMorePhotosRequestSuccess,
  onAddPhoto,
  onEditPhoto,
} from "./helper";

const photosInitialState: LoadPhotosState = {
  nextPageDocRef: undefined,
  hasNextPage: false,
  photos: undefined,
  loading: false,
  error: false,
};

const reducer: Reducer<LoadPhotosState, PhotosAction> = (
  state = photosInitialState,
  action: PhotosAction
) => {
  switch (action.type) {
    case "ALL_PHOTOS_REQUEST_NEW_START":
      return {
        ...state,
        photos: undefined,
        loading: true,
        error: false,
      };
    case "ALL_PHOTOS_REQUEST_MORE_START":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "ALL_PHOTOS_REQUEST_SUCCESS":
      return {
        ...state,
        photos: action.photos,
        loading: false,
        error: false,
        nextPageDocRef: action.nextPageDocRef,
        hasNextPage: action.hasNextPage === true,
      };

    case "FETCH_MORE_PHOTO_REQUEST_SUCCESS":
      return onFetchMorePhotosRequestSuccess(state, action);

    case "ALL_PHOTOS_REQUEST_ERROR":
      return {
        ...state,
        loading: false,
        error: true,
      };

    case "ADD_PHOTO":
      return onAddPhoto(state, action);

    case "EDIT_PHOTO":
      return onEditPhoto(state, action);

    default:
      return state;
  }
};

export default reducer;
