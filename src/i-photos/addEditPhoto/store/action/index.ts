import { AddEditPhotoState, AddEditPhotoAction } from "./../../types";

export const addPhotoStartRequestAC = (): AddEditPhotoAction => {
  return {
    type: "ADD_PHOTO_REQUEST_START",
  };
};

export const addPhotoSendRequestAC = (): AddEditPhotoAction => {
  return {
    type: "ADD_PHOTO_REQUEST_SEND",
  };
};

export const addPhotoRequestErrorAC = (): AddEditPhotoAction => {
  return {
    type: "ADD_PHOTO_REQUEST_ERROR",
  };
};

//addPhotoAC
export const addPhotoRequestSuccessAC = (): AddEditPhotoAction => {
  return {
    type: "ADD_PHOTO_REQUEST_SUCCESS",
  };
};

export const addPhotoRequestEndAC = (photoId: string): AddEditPhotoAction => {
  return {
    type: "ADD_PHOTO_REQUEST_END",
    photoId,
  };
};

export const editPhotoStartRequestAC = (
  photoId: string
): AddEditPhotoAction => {
  return {
    type: "EDIT_PHOTO_REQUEST_START",
    photoId,
  };
};

export const editPhotoSendRequestAC = (photoId: string): AddEditPhotoAction => {
  return {
    type: "EDIT_PHOTO_REQUEST_SEND",
    photoId,
  };
};

export const editPhotoRequestErrorAC = (
  photoId: string
): AddEditPhotoAction => {
  return {
    type: "EDIT_PHOTO_REQUEST_ERROR",
    photoId,
  };
};

export const editPhotoRequestSuccessAC = (
  photoId: string
): AddEditPhotoAction => {
  return {
    type: "EDIT_PHOTO_REQUEST_SUCCESS",
    photoId,
  };
};

export const editPhotoRequestEndAC = (photoId: string): AddEditPhotoAction => {
  return {
    type: "EDIT_PHOTO_REQUEST_END",
    photoId,
  };
};
