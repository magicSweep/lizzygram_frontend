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

export type AddPhotoReqRefData = {
  formData: AddPhotoFormData;
};

export type AddPhotoReqServiceData = {
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
  AddPhotoReqServiceData & {
    //photoId: string;
    //userUid: string;
    //isFormSubmited: boolean;
    mainRef: MutableRefObject<AddPhotoReqRefData>;
    state: PhotoReqState;
    setState: Dispatch<SetStateAction<PhotoReqState>>;
    dispatch: any;
    /* formData: AddPhotoFormData;
  photo: Photo<Date>;
  workerRequest: WorkerRequest;
  workerResponse: WorkerResponse; */
  };

export const request_ =
  (
    makeAddPhotoData: typeof makeAddPhotoData_,
    addPhotoFirestoreReq: typeof addPhotoFirestoreReq_,
    makeAddPhotoWorkerData: typeof makeAddPhotoWorkerData_,
    addPhotoWorkerReq: typeof addPhotoWorkerReq_,
    onSuccess_: typeof onSuccess,
    onError_: typeof onError
  ) =>
  (data: UseAddPhotoReqData) =>
    compose<UseAddPhotoReqData, Promise<void>>(
      // SEND FIRESTORE REQUEST
      compose<UseAddPhotoReqData, Promise<UseAddPhotoReqData>>(
        tap(({ dispatch }: UseAddPhotoReqData) =>
          dispatch(addPhotoSendRequestAC())
        ),
        tap(({ setState }: UseAddPhotoReqData) =>
          setState((prevState: any) => ({
            ...prevState,
            uploadLoading: true,
            isFormSubmited: true,
          }))
        ),
        (data: UseAddPhotoReqData) => ({
          ...data,
          firestorePhotoToAdd: makeAddPhotoData(
            data.mainRef.current.formData,
            data.userUid,
            data.photoId
          ),
        }),
        async (data: UseAddPhotoReqData) => {
          await addPhotoFirestoreReq(data.firestorePhotoToAdd);
          return data;
        }
      ),

      // SEND WORKER REQUEST
      then(
        compose<UseAddPhotoReqData, Promise<UseAddPhotoReqData>>(
          (data: UseAddPhotoReqData) => ({
            ...data,
            workerRequest: makeAddPhotoWorkerData(
              data.mainRef.current.formData,
              data.userUid,
              data.photoId
            ),
          }),
          async (data: UseAddPhotoReqData) => ({
            ...data,
            workerResponse: await addPhotoWorkerReq(data.workerRequest),
          })
        )
      ),

      // PARSE WORKER RESPONSE
      then((data: UseAddPhotoReqData) => {
        data.workerResponse.status === "success"
          ? onSuccess_(
              data.dispatch,
              data.setState,
              data.mainRef.current.formData.photoFile[0].name,
              data.photoId
            )
          : onError_(
              data.dispatch,
              data.setState,
              data.mainRef.current.formData.photoFile[0].name
            );
      }),

      _catch((e: any) => {
        console.error("ERROR", e.message, data);
        //main catch
        /* if (!e.type || e.type !== "ERROR_FIRESTORE_ADD") {
          // REMOVE FIRESTORE RECORD
        } */

        onError_(
          data.dispatch,
          data.setState,
          data.mainRef.current.formData.photoFile[0].name
        );
      })
    )(data);

export const onError_ =
  (batch: typeof batch_) =>
  (
    //error: any,
    dispatch: any,
    setState: any,
    photoName: string
  ) => {
    batch(() => {
      dispatch(addPhotoRequestErrorAC());

      dispatch(
        showAlertAC(
          `К сожалению, мы не смогли сохранить фото - ${photoName}`,
          "error"
        )
      );
    });

    setState((prevState: any) => ({
      ...prevState,
      isEndReq: true,
      uploadLoading: false,
      //errorReq: error.msg ? error.msg : JSON.stringify(error),
    }));
  };

export const onSuccess_ =
  (getAddedPhotoReq_: typeof getAddedPhotoReq) =>
  (
    dispatch: any,
    setState: Dispatch<SetStateAction<PhotoReqState>>,
    photoName: string,
    photoId: string
  ) => {
    //getPhotoById(id).then(() => dispatch(getAddedPhotoSuccessAC()));

    /* batch(() => {
      dispatch(showAlertAC(`Фото успешно добавлено - ${photoName}`, "success"));
    }); */

    setState((prevState) => ({
      ...prevState,
      //successReq: true,
      //errorReq: "",
      uploadLoading: false,
      showForm: false,
      formWasClosed: true,
    }));

    // Get new added photo info from firestore
    // And add to store
    getAddedPhotoReq_(photoId, photoName, dispatch, setState);
  };

export const getAddedPhotoReq_ =
  (batch: typeof batch_, getPhoto: typeof getPhoto_) =>
  (
    photoId: string,
    photoName: string,
    dispatch: any,
    setState: Dispatch<SetStateAction<PhotoReqState>>
  ) => {
    getPhoto(photoId)
      .then((photo) => {
        batch(() => {
          dispatch(getAddedPhotoSuccessAC(photo));
          dispatch(
            showAlertAC(`Фото успешно добавлено - ${photoName}`, "success")
          );
        });

        setState((prevState) => ({
          ...prevState,
          isEndReq: true,
        }));
      })
      .catch((err) => {
        batch(() => {
          dispatch(getAddedPhotoErrorAC());
          dispatch(
            showAlertAC(`Фото успешно добавлено - ${photoName}`, "success")
          );
        });

        setState((prevState) => ({
          ...prevState,
          isEndReq: true,
        }));
      });
  };

export const getAddedPhotoReq = getAddedPhotoReq_(batch_, getPhoto_);
export const onError = onError_(batch_);
export const onSuccess = onSuccess_(getAddedPhotoReq);
export const request = request_(
  makeAddPhotoData_,
  addPhotoFirestoreReq_,
  makeAddPhotoWorkerData_,
  addPhotoWorkerReq_,
  onSuccess,
  onError
);

const addPhoto_ =
  (
    state: PhotoReqState,
    setState: Dispatch<SetStateAction<PhotoReqState>>,
    dispatch: any,
    mainRef: MutableRefObject<AddPhotoReqRefData>,
    photoId: string,
    userUid: string
    //searchTerms: SearchTerms
  ) =>
  (formData: any) => {
    mainRef.current = {
      formData,
    };

    request({
      dispatch,
      state,
      setState,
      photoId,
      userUid,
      mainRef,
      //searchTerms,
    });
  };

export const useAddPhotoReq = (
  photoId: string
  /* removeRequest: (id: string) => void */
) => {
  const dispatch = useDispatch();

  const mainRef: MutableRefObject<any> = useRef();

  const removeRequest = () => {
    dispatch(addPhotoRequestEndAC(photoId));
  };

  const { state, setState, onFormClose, userUid } = usePhotoReq({
    removeRequest,
  });

  //const searchTerms = useSelector<GlobalState, SearchTerms>(
  //(state) => state.search.terms
  //);

  const addPhoto = addPhoto_(
    state,
    setState,
    dispatch,
    mainRef,
    photoId,
    userUid
  );

  return {
    addPhoto,
    onFormClose,
    showForm: state.showForm,
    uploadLoading: state.uploadLoading,
  };
};
