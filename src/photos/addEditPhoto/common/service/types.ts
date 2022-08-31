import { Photo, MainResponseData } from "lizzygram-common-data/dist/types";
//import { AddPhotoFormData } from "./../../../../../../types";

export type DataAdapter = {
  // FormData<{file: File}>
  makeWorkerReqData: (photoFile: File) => FormData;

  // FormData<Photo<Date>>
  /*  makeFirestoreReqData: (
    workerPhotoData: MainResponseData,
    formData: AddPhotoFormData,
    userUid: string,
    photoId: string
  ) => Photo<any>; */
};

export type CleanUpReqData = {
  googleDriveId: Photo<any>["googleDriveId"];
  webImagesInfo: MainResponseData["webImagesInfo"];
};

export type AddEditRequests = {
  // FormData<{file: File}>
  mainWorkerReq: (
    formData: FormData,
    token: string
  ) => Promise<MainResponseData>;

  // FormData<{file: File}>
  //firestoreReq: (photo: Photo<any>) => Promise<void>;

  cleanUpWorkerReq: (data: CleanUpReqData) => Promise<any>;
};

export type WebSecureUrl = string;
export type Width = number;
