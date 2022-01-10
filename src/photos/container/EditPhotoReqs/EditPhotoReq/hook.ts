import { Dispatch, SetStateAction, MutableRefObject, useRef } from "react";
import {
  chain,
  compose,
  Done,
  elif,
  map,
  Next,
  set,
  tap,
  then,
  _catch,
} from "fmagic";
import {
  EditPhotoFormData,
  EditPhotoWorkerProps,
  FirestoreFieldsToEdit,
  EditPhotoFirestoreRequestBody,
  PhotoReqData,
  PhotoReqRefData,
  PhotoReqServiceData,
} from "../../../types";
import {
  FirestoreDate,
  Photo,
  WorkerRequest,
  WorkerResponse,
} from "lizzygram-common-data/dist/types";
import {
  isInSearchTerms as isInSearchTerms_,
  //makeEditPhotoData,
  makeEditPhotoData as makeEditPhotoData_,
  makeEditPhotoWorkerProps,
  makeEditPhotoWorkerProps as makeEditPhotoWorkerProps_,
} from "./helper";
import {
  editPhotoRequestEndAC,
  editPhotoRequestErrorAC,
  editPhotoSendRequestAC,
  editPhotoSuccessAC,
  getEditedPhotoErrorAC,
} from "../../../store/action";
import {
  editPhoto as editPhotoFirestoreReq_,
  getPhoto as getPhoto_,
} from "../../../service/DbService";
import { editPhoto as editPhotoWorkerReq_ } from "../../../service/WorkerService";
import { batch, useDispatch, useSelector } from "react-redux";
import { showAlertAC } from "../../../../alert";
//import { SearchTerms } from "../../../../search/types";
import { isEmptyObj } from "../../../../utils/other";
import { PhotoReqState, usePhotoReq } from "../../../hook/usePhotoReq";
import { GlobalState } from "../../../../types";
import { SearchTerms } from "../../../../search/types";

/* export type PhotoReqState = {
  showForm: boolean;
  formWasClosed: boolean;
  uploadLoading: boolean;
  isFormSubmited: boolean;
  //end: false,
  isEndReq: boolean;
};

// data that must be new
export type PhotoReqData = {
  photoId: string;
  userUid: string;
  searchTerms: SearchTerms;
};

// data we need to store
export type PhotoReqRefData = {
  editedPhoto: Photo<FirestoreDate>;
  formData: EditPhotoFormData;
  isNeedWorkerReq: boolean;
};

export type PhotoReqServiceData = {
  //isFormSubmited?: boolean;
  //photo: Photo<Date>;
  fieldsToUpdate?: FirestoreFieldsToEdit;
  editPhotoWorkerProps?: EditPhotoWorkerProps;
  editPhotoFirestoreRequestBody?: EditPhotoFirestoreRequestBody;
  photoWorker?: WorkerRequest;
  workerResponse?: WorkerResponse;
  isInSearchTerms?: boolean;
}; */

type EditPhotoReqRefData = PhotoReqRefData<EditPhotoFormData>;
type EditPhotoReqServiceData = PhotoReqServiceData<
  FirestoreFieldsToEdit,
  EditPhotoWorkerProps,
  EditPhotoFirestoreRequestBody
>;

export type UseEditPhotoReqData = PhotoReqData &
  EditPhotoReqServiceData & {
    mainRef: MutableRefObject<EditPhotoReqRefData>;
    state: PhotoReqState;
    setState: Dispatch<SetStateAction<PhotoReqState>>;
    dispatch: any;
  };

// TODO: mainRef.isSubmitted
export const request_ =
  (
    editPhotoFirestoreReq: typeof editPhotoFirestoreReq_,
    editPhotoWorkerReq: typeof editPhotoWorkerReq_,
    onError_: typeof onError,
    onSuccess_: typeof onSuccess,
    makeEditPhotoData: typeof makeEditPhotoData_,
    makeEditPhotoWorkerProps: typeof makeEditPhotoWorkerProps_
  ) =>
  (data: UseEditPhotoReqData) =>
    compose<UseEditPhotoReqData, Promise<void>>(
      // SET FIELDS TO UPDATE
      (data: UseEditPhotoReqData) => ({
        ...data,
        fieldsToUpdate: makeEditPhotoData(
          data.mainRef.current.formData,
          data.mainRef.current.editedPhoto
        ),
      }),
      //tap((data: UseEditPhotoReqData) => console.log("TAAAPPP 1", data)),
      // CHECK FORM FIELDS FOR NEW VALUES
      (data: UseEditPhotoReqData) =>
        isEmptyObj(data.fieldsToUpdate) &&
        data.mainRef.current.isNeedWorkerReq === false
          ? Done.of(
              data.dispatch(showAlertAC("Вы ничего не изменили.", "error"))
            )
          : Next.of(data),
      //tap((data: UseEditPhotoReqData) => console.log("TAAAPPP 2", data)),
      // SET START LOADING TO STATE
      map(
        tap(({ setState }: UseEditPhotoReqData) => {
          setState((prevState) => ({
            ...prevState,
            uploadLoading: true,
            isFormSubmited: true,
          }));
        })
      ),
      chain((data: UseEditPhotoReqData) =>
        compose<UseEditPhotoReqData, Promise<UseEditPhotoReqData>>(
          //tap((data: UseEditPhotoReqData) => console.log("TAAAPPP 3", data)),
          tap(({ dispatch }: UseEditPhotoReqData) =>
            dispatch(editPhotoSendRequestAC(data.photoId))
          ),
          elif(
            (data: UseEditPhotoReqData) => data.mainRef.current.isNeedWorkerReq,
            // SEND WORKER REQUEST
            compose<UseEditPhotoReqData, Promise<UseEditPhotoReqData>>(
              tap((data: UseEditPhotoReqData) =>
                console.log("TAAAPPP 4", data)
              ),
              (data: UseEditPhotoReqData) => ({
                ...data,
                editPhotoWorkerProps: makeEditPhotoWorkerProps(
                  data.fieldsToUpdate,
                  data.photoId,
                  data.userUid,
                  data.mainRef.current.formData.photoFile[0]
                ),
              }),
              /* tap((data: UseEditPhotoReqData) =>
                console.log("TAAAPPP 5", data)
              ), */
              async (data: UseEditPhotoReqData) => ({
                ...data,
                workerResponse: await editPhotoWorkerReq(
                  data.editPhotoWorkerProps
                ),
              }) /* {
              await editPhotoWorkerReq(data.editPhotoWorkerProps);
              return data;
            } */
            ),
            // SEND FIRESTORE REQUEST
            compose<UseEditPhotoReqData, Promise<UseEditPhotoReqData>>(
              (data: UseEditPhotoReqData) => ({
                ...data,
                editPhotoFirestoreRequestBody: {
                  photoId: data.photoId,
                  fieldsToUpdate: data.fieldsToUpdate,
                },
              }),
              async (data: UseEditPhotoReqData) => {
                await editPhotoFirestoreReq(data.editPhotoFirestoreRequestBody);
                return data;
              }
            )
          ),
          then((data: UseEditPhotoReqData) => {
            console.log("DATA", data);
            return data;
          }),
          then((data: UseEditPhotoReqData) => {
            if (
              data.workerResponse !== undefined &&
              data.workerResponse.status === "error"
            )
              throw new Error(`Error from worker...`);

            return data;
          }),

          then((data: UseEditPhotoReqData) => {
            //console.log("SUCCESS BEFORE GET EDITED PHOTO", data);
            onSuccess_(data);
          }),
          _catch((err) => {
            //console.error("ERROR BEFORE GET EDITED PHOTO", err.message, data);
            onError_(data.dispatch, data.setState, data.photoId);
          })
        )(data)
      )
    )(data);

export const onError_ =
  (batch: any) =>
  (
    dispatch: any,
    setState: Dispatch<SetStateAction<PhotoReqState>>,
    photoId: string
  ) => {
    //console.log("ERROR", error);
    batch(() => {
      dispatch(editPhotoRequestErrorAC(photoId));

      dispatch(
        showAlertAC(`К сожалению, мы не смогли сохранить изменения`, "error")
      );
    });

    setState((prevState: any) => ({
      ...prevState,
      uploadLoading: false,
      isEndReq: true,
      //errorReq: error.msg ? error.msg : JSON.stringify(error),
    }));
  };

export const onSuccess_ =
  (
    getEditedPhotoReq_: typeof getEditedPhotoReq,
    batch: any,
    isInSearchTerms: typeof isInSearchTerms_
  ) =>
  (data: UseEditPhotoReqData) => {
    //getPhotoById(id).then(() => dispatch(getAddedPhotoSuccessAC()));

    //const isLastReq = this.requests.size === 0;
    //dispatch(addPhotoRequestSuccessAC());

    //console.log("-------BATCH");

    //if (isLastReq && !this.anotherForm) this.dispatch(hideAddFormAC());

    data.isInSearchTerms = isInSearchTerms(
      data.searchTerms,
      data.fieldsToUpdate
    );

    if (data.isInSearchTerms === true) {
      //console.log("-------IN SEARCH TERM", searchTerms, fieldsToUpdate);
      getEditedPhotoReq_(data.photoId, data.dispatch, data.setState);
    } else {
      //console.log("-------NOT IN SEARCH TERM", searchTerms, fieldsToUpdate);
      batch(() => {
        data.dispatch(editPhotoSuccessAC(data.photoId));

        data.dispatch(showAlertAC(`Фото успешно изменено.`, "success"));
      });

      /* data.setState((prevState) => ({
        ...prevState,
        isEndReq: true,
      })); */
    }

    //console.log("SUCCESS EDIT PHOTO", data);

    data.setState((prevState: any) => ({
      ...prevState,
      //successReq: true,
      //errorReq: "",
      isEndReq: data.isInSearchTerms === true ? false : true,
      uploadLoading: false,
      showForm: false,
      formWasClosed: true,
    }));

    // Get new added photo info from firestore
    // And add to store
    //getAddedPhotoReq(photoId, dispatch);
  };

export const getEditedPhotoReq_ =
  (getPhoto: typeof getPhoto_, batch: any) =>
  (
    photoId: string,
    dispatch: any,
    setState: Dispatch<SetStateAction<PhotoReqState>>
  ) => {
    getPhoto(photoId)
      .then((photo) => {
        //console.log("EDITED PHOTO", photo);
        batch(() => {
          dispatch(editPhotoSuccessAC(photo));
          dispatch(showAlertAC(`Фото успешно изменено.`, "success"));
        });

        /* setState((prevState: any) => ({
        ...prevState,
        isEndReq: true,
      })); */
      })
      .catch((err) => {
        console.error("GET EDITED PHOTO", err);
        batch(() => {
          dispatch(getEditedPhotoErrorAC(photoId));
          dispatch(showAlertAC(`Фото успешно изменено.`, "success"));
        });

        /*  setState((prevState: any) => ({
        ...prevState,
        isEndReq: true,
      })) */
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          isEndReq: true,
        }));
      });
  };

export const getEditedPhotoReq = getEditedPhotoReq_(getPhoto_, batch);

export const onSuccess = onSuccess_(getEditedPhotoReq, batch, isInSearchTerms_);

export const onError = onError_(batch);

export const request = request_(
  editPhotoFirestoreReq_,
  editPhotoWorkerReq_,
  onError,
  onSuccess,
  makeEditPhotoData_,
  makeEditPhotoWorkerProps
);

///////////////////

const editPhoto_ =
  (
    state: PhotoReqState,
    setState: Dispatch<SetStateAction<PhotoReqState>>,
    dispatch: any,
    mainRef: MutableRefObject<EditPhotoReqRefData>,
    photoId: string,
    userUid: string,
    editedPhoto: Photo<FirestoreDate>,
    searchTerms: SearchTerms
  ) =>
  (formData: any) => {
    mainRef.current = {
      isNeedWorkerReq: formData.photoFile
        ? formData.photoFile.length > 0
        : false,
      formData,
      editedPhoto,
    };

    request({
      dispatch,
      state,
      setState,
      photoId,
      userUid,
      mainRef,
      searchTerms,
    });
  };

export const useEditPhotoReq = (
  photoId: string,
  photo: Photo<FirestoreDate>
) => {
  const dispatch = useDispatch();

  const mainRef: MutableRefObject<any> = useRef();

  const removeRequest = () => {
    dispatch(editPhotoRequestEndAC(photoId));
  };

  const { state, setState, onFormClose, userUid } = usePhotoReq({
    removeRequest,
  });

  const searchTerms = useSelector<GlobalState, SearchTerms>(
    (state) => state.search.terms
  );

  const editPhoto = editPhoto_(
    state,
    setState,
    dispatch,
    mainRef,
    photoId,
    userUid,
    photo,
    searchTerms
  );

  return {
    editPhoto,
    onFormClose,
    showForm: state.showForm,
    uploadLoading: state.uploadLoading,
  };
};

//////////////////

/* 
// TODO: mainRef.isSubmitted
export const request =
  (
    dispatch: any,
    setState: Dispatch<SetStateAction<PhotoReqState>>,
    mainRef: MutableRefObject<PhotoReqRefData>
  ) =>
  (data: EditPhotoReqData) =>
    compose<EditPhotoReqData, Promise<void>>(
      (data: EditPhotoReqData) => ({
        ...data,
        fieldsToUpdate: makeEditPhotoData(data.formData, data.editedPhoto),
      }),
      (data: EditPhotoReqData) =>
        isEmptyObj(data.fieldsToUpdate) && data.isNeedWorkerReq === false
          ? Done.of(dispatch(showAlertAC("Вы ничего не изменили.", "error")))
          : Next.of(data),
      map(
        tap((data: EditPhotoReqData) => {
          //mainRef.current.isSubmited = true;
          //mainRef.current.formData = formData;

          setState((prevState) => ({
            ...prevState,
            uploadLoading: true,
            isFormSubmited: true,
          }));
        })
      ),
      chain((data: EditPhotoReqData) =>
        compose<EditPhotoReqData, Promise<EditPhotoReqData>>(
          tap(() => dispatch(editPhotoSendRequestAC(data.photoId))),
          elif(
            (data: EditPhotoReqData) => data.isNeedWorkerReq,
            // SEND WORKER REQUEST
            compose<EditPhotoReqData, Promise<EditPhotoReqData>>(
              (data: EditPhotoReqData) => ({
                ...data,
                editPhotoWorkerProps: makeEditPhotoWorkerProps(
                  data.fieldsToUpdate,
                  data.photoId,
                  data.userUid,
                  data.formData.photoFile[0]
                ),
              }),
              async (data: EditPhotoReqData) => {
                await editPhotoWorkerReq(data.editPhotoWorkerProps);
                return data;
              }
            ),
            // SEND FIRESTORE REQUEST
            compose<EditPhotoReqData, Promise<EditPhotoReqData>>(
              (data: EditPhotoReqData) => ({
                ...data,
                editPhotoFirestoreRequestBody: {
                  photoId: data.photoId,
                  fieldsToUpdate: data.fieldsToUpdate,
                },
              }),
              async (data: EditPhotoReqData) => {
                await editPhotoFirestoreReq(data.editPhotoFirestoreRequestBody);
                return data;
              }
            )
          ),
          then((res: any) => {
            if (res && res.status === "error")
              throw new Error(`Error from worker...`);
          }),
          then(() => {
            console.log("SUCCESS BEFORE GET EDITED PHOTO", data);
            onSuccess(dispatch, setState, data);
          }),
          _catch((err) => {
            console.error("ERROR BEFORE GET EDITED PHOTO", err.message, data);
            onError(dispatch, setState, data.photoId);
          })
        )
      )
    )(data);
*/

//////////////////

/* type UseEditPhotoReqData = ReturnType<typeof usePhotoReq> & {
  id: string, 
  photo: Photo<FirestoreDate>,
  removeRequest: (id: string, dispatch: any) => void;
}

export const useEditPhotoReq = (usePhotoReq_: typeof usePhotoReq, editPhotoRequestEndAC_: typeof editPhotoRequestEndAC) => compose<UseEditPhotoReqData, any>(
  set("removeRequest", (self: UseEditPhotoReqData) => {
    const removeRequest_ = (id: string) => (dispatch: any) => {
      dispatch(editPhotoRequestEndAC_(id));
    }
    return removeRequest_(self.id);
  }),
  (data: UseEditPhotoReqData) => ({
    ...data,
    ...usePhotoReq_(data.id, data.removeRequest)
  }),
  (data: UseEditPhotoReqData)
);

(id: string, photo: Photo<FirestoreDate>) => {
  const removeRequest = (dispatch: any) => {
    dispatch(editPhotoRequestEndAC(id));
  };

  const { onFormClose, state, setState, userUid, dispatch, mainRef } =
    usePhotoReq(id, removeRequest);

  const searchTerms = useSelector<GlobalState, SearchTerms>(
    (state) => state.search.terms
  );

  const editPhoto = (formData: any) => {
    const isNeedWorkerReq = formData.photoFile
      ? formData.photoFile.length > 0
      : false;

    const start = request(
      dispatch,
      setState,
      formData,
      userUid,
      isNeedWorkerReq,
      id,
      searchTerms,
      mainRef,
      photo
    );

    start();
  };
 
  return {
    editPhoto,
    onFormClose,
    showForm: state.showForm,
    uploadLoading: state.uploadLoading,
  };
};*/
