import { Photo, MainResponseData } from "lizzygram-common-data/dist/types";
import { EditPhotoFormData } from "./../../../../../../types";
import {
  DataAdapter as DataAdapter_,
  AddEditRequests,
} from "../../../../../../common/service/types";

export type FieldsToUpdateFromForm = Partial<Photo<any>>;

export type EditPhotoFirestoreRequestBody = {
  photoId: string;
  fieldsToUpdate: Partial<Photo<any>>;
};

export type DataAdapter = {
  isNeedWorkerReq: (photoFile?: FileList) => boolean;

  isNeedFirestoreReq: (fieldsToUpdate: Partial<Photo<any>>) => boolean;

  makeFieldsToUpdate: (
    formData: EditPhotoFormData,
    currPhoto: Photo<any>
  ) => Partial<Photo<any>>;

  // FormData<{file: File}>
  makeWorkerReqData: DataAdapter_["makeWorkerReqData"];

  // FormData<Photo<Date>>
  makeFirestoreReqData: (
    fieldsToUpdate: FieldsToUpdateFromForm,
    //userUid: string,
    photoId: string,
    workerPhotoData?: MainResponseData
  ) => EditPhotoFirestoreRequestBody;
};

export type EditRequests = AddEditRequests & {
  // FormData<{file: File}>
  // workerReq: AddEditRequests["workerReq"];

  // FormData<{file: File}>
  firestoreReq: (dataToUpdate: EditPhotoFirestoreRequestBody) => Promise<void>;

  //cleanUpReq: AddEditRequests["cleanUpReq"];
};

/* export type CleanUp = {
  isNeedReq: () => boolean;

  saveNewCleanUpDate: () => void;
}; */

export type WebSecureUrl = string;
export type Width = number;
