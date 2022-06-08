import { PhotosAction, GetAllPhotosResData } from "../../types";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";

//import { TPhotoData } from "../../types";

export const allPhotosStartNewRequestAC = (): PhotosAction => {
  return {
    type: "ALL_PHOTOS_REQUEST_NEW_START",
  };
};

export const allPhotosStartMoreRequestAC = (): PhotosAction => {
  return {
    type: "ALL_PHOTOS_REQUEST_MORE_START",
  };
};

export const allPhotosRequestSuccessAC = (
  data: GetAllPhotosResData
): PhotosAction => {
  return {
    type: "ALL_PHOTOS_REQUEST_SUCCESS",
    photos: data.photos,
    nextPageDocRef: data.nextPageDocRef,
    hasNextPage: data.hasNextPage,
  };
};

export const fetchMorePhotosRequestSuccessAC = (
  data: GetAllPhotosResData
): PhotosAction => {
  return {
    type: "FETCH_MORE_PHOTO_REQUEST_SUCCESS",
    photos: data.photos,
    nextPageDocRef: data.nextPageDocRef,
    hasNextPage: data.hasNextPage,
  };
};

export const allPhotosRequestErrorAC = (): PhotosAction => {
  return {
    type: "ALL_PHOTOS_REQUEST_ERROR",
  };
};

export const addPhotoAC = (photo: Photo<any>): PhotosAction => {
  return {
    type: "ADD_PHOTO",
    photo,
  };
};

export const editPhotoAC = (photo: Photo<any>): PhotosAction => {
  return {
    type: "EDIT_PHOTO",
    photo,
  };
};
