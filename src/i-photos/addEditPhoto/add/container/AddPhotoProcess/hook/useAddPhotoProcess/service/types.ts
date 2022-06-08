import { Photo, MainResponseData } from "lizzygram-common-data/dist/types";
import { AddPhotoFormData } from "./../../../../../../types";
import {
  DataAdapter as DataAdapter_,
  AddEditRequests,
} from "../../../../../../common/service/types";
export { CleanUp } from "../../../../../../common/service/types";

export type DataAdapter = {
  // FormData<{file: File}>
  makeWorkerReqData: DataAdapter_["makeWorkerReqData"];

  // FormData<Photo<Date>>
  makeFirestoreReqData: (
    workerPhotoData: MainResponseData,
    formData: AddPhotoFormData,
    userUid: string,
    photoId: string
  ) => Photo<any>;
};

export type AddRequests = {
  // FormData<{file: File}>
  workerReq: AddEditRequests["workerReq"];

  // FormData<{file: File}>
  firestoreReq: (photo: Photo<any>) => Promise<void>;

  cleanUpReq: AddEditRequests["cleanUpReq"];
};

/* export type CleanUp = {
  isNeedReq: () => boolean;

  saveNewCleanUpDate: () => void;
}; */

export type WebSecureUrl = string;
export type Width = number;
