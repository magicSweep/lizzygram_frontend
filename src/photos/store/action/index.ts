import {
  PhotosAction,
  GetAllPhotosResData,
  Photo,
  FirestoreDate,
} from "../../types";
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

export const addPhotoStartRequestAC = (): PhotosAction => {
  return {
    type: "ADD_PHOTO_REQUEST_START",
  };
};

export const addPhotoSendRequestAC = (): PhotosAction => {
  return {
    type: "ADD_PHOTO_REQUEST_SEND",
  };
};

export const addPhotoRequestErrorAC = (): PhotosAction => {
  return {
    type: "ADD_PHOTO_REQUEST_ERROR",
  };
};

export const showPhotoSliderAC = (activePhotoIndex: number = 0) => {
  return {
    type: "SHOW_PHOTO_SLIDER",
    activePhotoIndex,
  };
};

export const hidePhotoSliderAC = () => {
  return {
    type: "HIDE_PHOTO_SLIDER",
  };
};

/* export const addPhotoAnotherFormAC = (): PhotosAction => {
  return {
    type: "ADD_PHOTO_ANOTHER_FORM",
  };
};

export const addPhotoRequestSuccessAC = (): PhotosAction => {
  return {
    type: "ADD_PHOTO_REQUEST_SUCCESS",
  };
}; 

*/

//addPhotoAC
export const getAddedPhotoSuccessAC = (
  photo: Photo<FirestoreDate>
): PhotosAction => {
  return {
    type: "GET_ADDED_PHOTO_REQUEST_SUCCESS",
    photo,
  };
};

export const getAddedPhotoErrorAC = (): PhotosAction => {
  return {
    type: "GET_EDITED_PHOTO_REQUEST_ERROR",
  };
};

export const addPhotoRequestEndAC = (photoId: string): PhotosAction => {
  return {
    type: "ADD_PHOTO_REQUEST_END",
    photoId,
  };
};

export const editPhotoStartRequestAC = (photoId: string): PhotosAction => {
  return {
    type: "EDIT_PHOTO_REQUEST_START",
    photoId,
  };
};

export const editPhotoSendRequestAC = (photoId: string): PhotosAction => {
  return {
    type: "EDIT_PHOTO_REQUEST_SEND",
    photoId,
  };
};

export const editPhotoRequestErrorAC = (photoId: string): PhotosAction => {
  return {
    type: "EDIT_PHOTO_REQUEST_ERROR",
    photoId,
  };
};

/* export const editPhotoRequestSuccessAC = (
  isLastEditPhotoReq: boolean,
  reqId: ID,
  photoId?: string
): IPhotosAction => {
  return {
    type: "EDIT_PHOTO_REQUEST_SUCCESS",
    photoId,
    isLastEditPhotoReq,
    reqId,
  };
}; 

export const editPhotoRequestErrorAC = (
  isLastEditPhotoReq: boolean,
  reqId: ID
): IPhotosAction => {
  return {
    type: "EDIT_PHOTO_REQUEST_ERROR",
    isLastEditPhotoReq,
    reqId,
  };
};*/

//editPhotoAC
export const editPhotoSuccessAC = (
  photoOrId: Photo<FirestoreDate> | string
): PhotosAction => {
  return {
    type: "EDIT_PHOTO_REQUEST_SUCCESS",
    photoOrId,
  };
};

export const getEditedPhotoErrorAC = (photoId: string): PhotosAction => {
  return {
    type: "GET_EDITED_PHOTO_REQUEST_ERROR",
    photoId,
  };
};

export const editPhotoRequestEndAC = (photoId: string): PhotosAction => {
  return {
    type: "EDIT_PHOTO_REQUEST_END",
    photoId,
  };
};

//REMOVE_PHOTO_REQUEST_INFO
/* export const removePhotoReqAC = (photoId: string): IPhotosAction => {
  return {
    type: "REMOVE_PHOTO_REQUEST_INFO",
    reqId: photoId,
  };
}; */

/* export const deletePhotoAC = (photoId: string): PhotosAction => {
  return {
    type: "DELETE_PHOTO",
    photoId,
  };
}; */
