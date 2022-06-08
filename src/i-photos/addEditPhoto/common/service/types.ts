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

export type AddEditRequests = {
  // FormData<{file: File}>
  workerReq: (formData: FormData, token: string) => Promise<MainResponseData>;

  // FormData<{file: File}>
  //firestoreReq: (photo: Photo<any>) => Promise<void>;

  cleanUpReq: () => Promise<void>;
};

export type CleanUp = {
  isNeedReq: () => boolean;

  saveNewCleanUpDate: () => void;
};

export type WebSecureUrl = string;
export type Width = number;
