import { TagsFormState } from "./../../tags/types";
import { Action } from "redux";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";

export type AddPhotoHookStage =
  | "SEND_WORKER_REQUEST"
  | "END_WORKER_REQUEST"
  | "SEND_FIRESTORE_REQUEST";

export type EditPhotoHookStage = AddPhotoHookStage | "NOTHING_CHANGED";

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
  date?: Date | null;
  photoFile?: FileList;
  tags: TagsFormState;
};

// STORE
export type AddEditPhotoState = {
  addReqs: {
    numberOfActiveReqs: number;
    reqIds: string[];
  };
  editReqs: {
    activeReqIds: string[];
    reqIds: string[];
  };
};

export type AddEditPhotoActionTypes =
  //| "ADD_PHOTO"
  | "ADD_PHOTO_REQUEST_START"
  | "ADD_PHOTO_REQUEST_SEND"
  | "ADD_PHOTO_REQUEST_ERROR"
  | "ADD_PHOTO_REQUEST_SUCCESS"
  | "ADD_PHOTO_REQUEST_END"
  | "EDIT_PHOTO_REQUEST_START"
  | "EDIT_PHOTO_REQUEST_SEND"
  | "EDIT_PHOTO_REQUEST_SUCCESS"
  | "EDIT_PHOTO_REQUEST_ERROR"
  | "EDIT_PHOTO_REQUEST_END";

export interface AddEditPhotoAction extends Action<any> {
  type: AddEditPhotoActionTypes;
  //photo?: Photo<FirestoreDate>;
  photoId?: string;
}

export type WebSecureUrl = string;
export type Width = number;
