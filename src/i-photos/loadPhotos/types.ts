import { Action } from "redux";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
// PHOTOS

export type PhotoId = string;
//export type FavoriteReqData = PhotoId[];
export type FavoriteReqs = PhotoId[];

// PHOTOS STATE
export interface LoadPhotosState {
  //activePhotoIndex: number;
  hasNextPage: boolean;
  nextPageDocRef: any;
  photos: Photo<FirestoreDate>[] | undefined;
  loading: boolean;
  error: boolean;
}

export type PhotosActionTypes =
  | "ALL_PHOTOS_REQUEST_NEW_START"
  | "ALL_PHOTOS_REQUEST_MORE_START"
  | "ALL_PHOTOS_REQUEST_SUCCESS"
  | "ALL_PHOTOS_REQUEST_ERROR"
  | "FETCH_MORE_PHOTO_REQUEST_START"
  | "FETCH_MORE_PHOTO_REQUEST_SUCCESS"
  | "FETCH_MORE_PHOTO_REQUEST_ERROR"
  | "ADD_PHOTO"
  | "EDIT_PHOTO";

export interface PhotosAction extends Action<any> {
  type: PhotosActionTypes;
  //reqId?: ID;
  //photoReq?: IPhotoReq;
  //photos?: TPhotosData;
  //photo?: TPhotoData;
  activePhotoIndex?: number;
  photos?: Photo<FirestoreDate>[];
  photo?: Photo<FirestoreDate>;
  //photoOrId?: Photo<FirestoreDate> | string;
  photoId?: string;
  hasNextPage?: boolean;
  nextPageDocRef?: any;
  userUid?: string;
  //isLastEditPhotoReq?: boolean;
  //isLastAddPhotoReq?: boolean;
}

export type PhotoFirestoreResponse = {
  data: () => Photo<FirestoreDate>;
  id: string;
};

// RESPONSE

export type GetAllPhotosResData = {
  hasNextPage: boolean;
  nextPageDocRef: any | undefined | null;
  photos: Photo<FirestoreDate>[];
};
