import { compose, tap, then, _catch } from "fmagic";
import { AddPhotoFormData, PhotoReqData } from "../../../types";

import {
  Photo,
  WorkerRequest,
  WorkerResponse,
} from "lizzygram-common-data/dist/types";
import {
  makeAddPhotoData as makeAddPhotoData_,
  makeAddPhotoWorkerData as makeAddPhotoWorkerData_,
} from "./helper";
import {
  addPhotoRequestEndAC,
  addPhotoRequestErrorAC,
  addPhotoSendRequestAC,
  getAddedPhotoErrorAC,
  getAddedPhotoSuccessAC,
} from "../../../store/action";
import {
  addPhoto as addPhotoFirestoreReq_,
  getPhoto as getPhoto_,
} from "../../../service/DbService";
import { addPhoto as addPhotoWorkerReq_ } from "../../../service/WorkerService";
import { batch as batch_, useDispatch } from "react-redux";
import { showAlertAC } from "../../../../alert";
import { Dispatch, MutableRefObject, SetStateAction, useRef } from "react";
import { PhotoReqState, usePhotoReq } from "../../../hook/usePhotoReq";

export type AddPhotoProcessRefData = {
  formData: AddPhotoFormData;
};

export type AddPhotoProcessServiceData = {
  //isFormSubmited?: boolean;
  //photo: Photo<Date>;
  firestorePhotoToAdd?: Photo<Date>;
  //editPhotoWorkerProps?: TPhotoWorkerProps;
  //addPhotoFirestoreRequestBody?: TPhotoFirestoreReqBody;
  workerRequest?: WorkerRequest;
  workerResponse?: WorkerResponse;
  isInSearchTerms?: boolean;
};

export type UseAddPhotoReqData = PhotoReqData &
  AddPhotoProcessServiceData & {
    //photoId: string;
    //userUid: string;
    //isFormSubmited: boolean;
    mainRef: MutableRefObject<AddPhotoProcessRefData>;
    state: PhotoReqState;
    //setPhotoProcessState: Dispatch<SetStateAction<PhotoReqState>>;
    dispatch: any;
    /* formData: AddPhotoFormData;
  photo: Photo<Date>;
  workerRequest: WorkerRequest;
  workerResponse: WorkerResponse; */
  };

export const useAddPhotoProcess = () => {};
