import { Action } from "redux";
import { TagsFormState } from "./../tags/types";

// PHOTOS

export type ImgExt = "jpeg" | "jpg" | "png";
export type FirestoreDate = {
  toDate: () => Date;
};

export interface Photo<T> {
  id: any;
  base64: string;
  files: string[];
  aspectRatio: number; //1.6
  srcSet: string;
  iconSrc: string;
  src: string;

  _timestamp: Date | FirestoreDate;
  description: string;
  date: T;
  yearsOld: number;
  tags: {
    [id: string]: boolean;
  };

  googleDriveId: string;
  imageExtention: ImgExt;
  addedByUserUID: string;
  // do we make changes by express
  isActive: boolean;
}

export type AddPhotoFormData = {
  desc?: string;
  date: Date;
  photoFile: FileList;
  tags: TagsFormState;
};

/* export interface IEditPhotoFormData
  extends Omit<IAddPhotoFormData, "photoFile"> {} */
export type EditPhotoFormData = {
  desc?: string;
  date?: Date;
  photoFile?: FileList;
  tags: TagsFormState;
};

export type FirestoreFieldsToEdit = {
  description?: string;
  date?: Date;
  //isActive?: boolean;
  yearsOld?: number;
  tags?: { [name: string]: boolean };
};

export type UtcDateString = string;
export type JsonString = string;

export type WorkerRequestBody = {
  photoId: string;
  userUid: string;
  photoFile: File;
  description?: string;
  date?: UtcDateString;
  tags?: JsonString;
  //isActive?: boolean;
  //yearsOld?: number;
  // tags?: { [name: string]: boolean };
};

/* export type AddPhotoWorkerData = {
  photoId: string;
  userUid: string;
  photoFile: File;
};

export type EditPhotoWorkerData = {
  photoId: string;
  userUid: string;
  file: File;
  description?: string;
  date?: Date;
  //isActive?: boolean;
  yearsOld?: number;
  tags?: { [name: string]: boolean };
}; */

export type EditPhotoFirestoreRequestBody = {
  photoId: string;
  fieldsToUpdate: FirestoreFieldsToEdit;
};

// PHOTOS STATE
export interface PhotosState {
  activePhotoIndex: number;
  showPhotoSlider: boolean;
  hasNextPage: boolean;
  nextPageDocRef: any;
  photos: Photo<FirestoreDate>[] | undefined;
  loading: boolean;
  error: boolean;
  addReqs: {
    numberOfActiveReqs: number;
    reqIds: string[];
  };
  editReqs: {
    activeReqIds: string[];
    reqIds: string[];
  };
  //numberOfAddedPhotoReqs: number;
  //editedPhotosIds: string[];
}

export type PhotosActionTypes =
  //| "ADD_PHOTO"
  | "ADD_PHOTO_REQUEST_START"
  | "ADD_PHOTO_REQUEST_SEND"
  | "ADD_PHOTO_REQUEST_ERROR"
  | "GET_ADDED_PHOTO_REQUEST_SUCCESS"
  | "GET_ADDED_PHOTO_REQUEST_ERROR"
  | "ADD_PHOTO_REQUEST_END"
  //| "EDIT_PHOTO"
  | "EDIT_PHOTO_REQUEST_START"
  | "EDIT_PHOTO_REQUEST_SEND"
  | "EDIT_PHOTO_REQUEST_SUCCESS"
  | "EDIT_PHOTO_REQUEST_ERROR"
  | "GET_EDITED_PHOTO_REQUEST_ERROR"
  | "EDIT_PHOTO_REQUEST_END"
  //| "DELETE_PHOTO"
  //| "ADD_PHOTO_END_REQUEST"
  /* | "ADD_PHOTO_ANOTHER_FORM"
  | "ADD_PHOTO_REQUEST_SUCCESS"
  | "ADD_PHOTO_REQUEST_ERROR" */
  | "ALL_PHOTOS_REQUEST_NEW_START"
  | "ALL_PHOTOS_REQUEST_MORE_START"
  | "ALL_PHOTOS_REQUEST_SUCCESS"
  | "ALL_PHOTOS_REQUEST_ERROR"
  /*  | "EDIT_PHOTO_ANOTHER_FORM"
  | "EDIT_PHOTO_REQUEST_SUCCESS"
  | "EDIT_PHOTO_REQUEST_ERROR" */
  | "FETCH_MORE_PHOTO_REQUEST_START"
  | "FETCH_MORE_PHOTO_REQUEST_SUCCESS"
  | "FETCH_MORE_PHOTO_REQUEST_ERROR"
  | "SHOW_PHOTO_SLIDER"
  | "HIDE_PHOTO_SLIDER";
//| "REMOVE_PHOTO_REQUEST_INFO";

export interface PhotosAction extends Action<any> {
  type: PhotosActionTypes;
  //reqId?: ID;
  //photoReq?: IPhotoReq;
  //photos?: TPhotosData;
  //photo?: TPhotoData;
  activePhotoIndex?: number;
  photos?: Photo<FirestoreDate>[];
  photo?: Photo<FirestoreDate>;
  photoOrId?: Photo<FirestoreDate> | string;
  photoId?: string;
  hasNextPage?: boolean;
  nextPageDocRef?: any;
  //isLastEditPhotoReq?: boolean;
  //isLastAddPhotoReq?: boolean;
}

export type PhotoFirestoreResponse = {
  data: () => Photo<FirestoreDate>;
  id: string;
};

// SEARCH

/* export interface ISearchState {
  tags?: FirestoreTagsData;
  yearsOld: number;
  isSearch: boolean;
}

export type TSearchActionTypes = "SET_SEARCH_STATE" | "RESET_SEARCH_STATE";

export interface ISearchAction extends Action<TSearchActionTypes> {
  type: TSearchActionTypes;
  state?: ISearchState;
} */

// RESPONSE

export type GetAllPhotosResData = {
  hasNextPage: boolean;
  nextPageDocRef: any | undefined | null;
  photos: Photo<FirestoreDate>[];
};
