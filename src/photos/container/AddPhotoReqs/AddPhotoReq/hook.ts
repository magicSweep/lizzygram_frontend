//import { useState, Fragment, useEffect, useRef, useCallback, FC } from "react";
import { tap, _catch, then, compose } from "fmagic";
import { makeAddPhotoData, makeAddPhotoWorkerData } from "./helper";
import {
  addPhoto as addPhotoFirestoreReq,
  getPhotoById,
} from "../../../service/DbService";
import { addPhoto as addPhotoWorkerReq } from "../../../service/WorkerService";
import {
  addPhotoSendRequestAC,
  addPhotoRequestErrorAC,
  //addPhotoRequestSuccessAC,
  getAddedPhotoSuccessAC,
  getAddedPhotoErrorAC,
  addPhotoRequestEndAC,
} from "../../../store/action";
/* import {
  AddPhotoWorkerData,
  IAddPhotoFormData,
  IPhoto,
} from "./../../../types"; */
import { batch } from "react-redux";
import { showAlertAC } from "../../../../alert";
import { usePhotoReq } from "../../../hook/usePhotoReq";

const onError = (
  error: any,
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
    end: true,
    uploadLoading: false,
    //errorReq: error.msg ? error.msg : JSON.stringify(error),
  }));
};

const onSuccess = (
  dispatch: any,
  setState: any,
  photoName: string,
  photoId: string
) => {
  //getPhotoById(id).then(() => dispatch(getAddedPhotoSuccessAC()));

  /* batch(() => {
    dispatch(showAlertAC(`Фото успешно добавлено - ${photoName}`, "success"));
  }); */

  setState((prevState: any) => ({
    ...prevState,
    //successReq: true,
    //errorReq: "",
    uploadLoading: false,
    showForm: false,
    formWasClosed: true,
  }));

  // Get new added photo info from firestore
  // And add to store
  getAddedPhotoReq(photoId, photoName, dispatch, setState);
};

export const getAddedPhotoReq = (
  photoId: string,
  photoName: string,
  dispatch: any,
  setState: any
) => {
  getPhotoById(photoId)
    .then((photo) => {
      batch(() => {
        dispatch(getAddedPhotoSuccessAC(photo));
        dispatch(
          showAlertAC(`Фото успешно добавлено - ${photoName}`, "success")
        );
      });

      setState((prevState: any) => ({
        ...prevState,
        end: true,
      }));
    })
    .catch((err) => {
      batch(() => {
        dispatch(getAddedPhotoErrorAC());
        dispatch(
          showAlertAC(`Фото успешно добавлено - ${photoName}`, "success")
        );
      });

      setState((prevState: any) => ({
        ...prevState,
        end: true,
      }));
    });
};

export const firestoreReq = (
  dispatch: any,
  setState: any,
  formData: any,
  userUid: string,
  photoId: string
) =>
  compose(
    tap(() => dispatch(addPhotoSendRequestAC())),
    tap(() =>
      setState((prevState: any) => ({ ...prevState, uploadLoading: true }))
    ),
    makeAddPhotoData(formData, userUid, photoId),
    addPhotoFirestoreReq
    /* _catch((e) => {
      // do stuff
      throw { type: "ERROR_FIRESTORE_ADD", error: e };
    }) */
  );

export const request = (
  dispatch: any,
  setState: any,
  userUid: string,
  photoId: string,
  formData: any
) => {
  //flow(photoFormData: IAddPhotoFormData)

  //console.log("BEFORE FIRESTORE REQUEST", formData, userUid, photoId);

  const sendFirestoreReq = firestoreReq(
    dispatch,
    setState,
    formData,
    userUid,
    photoId
  );

  return compose(
    async () => {
      // dispatch
      // prepare data
      // send request
      await sendFirestoreReq();
    },
    then(() =>
      addPhotoWorkerReq(makeAddPhotoWorkerData(formData, userUid, photoId))
    ),
    /* then((res: any) => {
      console.log("AFTER WORKER REQUEST", res);
      return res;
    }), */
    //then((data: AddPhotoWorkerData) => addPhotoWorkerReq(data)),
    then((res: any) => {
      res.status === "success"
        ? onSuccess(dispatch, setState, formData.photoFile[0].name, photoId)
        : onError(res.data, dispatch, setState, formData.photoFile[0].name);
    }),
    _catch((e) => {
      console.error("ERROR", e.message);
      //main catch
      /* if (!e.type || e.type !== "ERROR_FIRESTORE_ADD") {
        // REMOVE FIRESTORE RECORD
      } */

      onError(e, dispatch, setState, formData.photoFile[0].name);
    })
  );
};

//
// open formModel
// if form closed before submit - remove self
// formSubmit -> send request
// if form closed - do nothing, if not - show loading
//

export const useAddPhotoReq = (
  id: string
  /* removeRequest: (id: string) => void */
) => {
  const removeRequest = (dispatch: any) => {
    dispatch(addPhotoRequestEndAC(id));
  };

  const { onFormClose, state, setState, userUid, dispatch, mainRef } =
    usePhotoReq(id, removeRequest);

  const addPhoto = (formData: any) => {
    mainRef.current.isSubmited = true;
    mainRef.current.formData = formData;

    setState((prevState) => ({
      ...prevState,
      uploadLoading: true,
    }));

    // Add countAddReq++ to global state
    // Set uploadLoading = true

    const start = request(dispatch, setState, userUid, id, formData);

    start();
  };

  return {
    addPhoto,
    onFormClose,
    showForm: state.showForm,
    uploadLoading: state.uploadLoading,
  };
};
