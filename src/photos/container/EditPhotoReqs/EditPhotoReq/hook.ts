//import { cond, flow } from "lodash";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import {
  editPhotoSendRequestAC,
  editPhotoRequestErrorAC,
  editPhotoSuccessAC,
  editPhotoRequestEndAC,
  getEditedPhotoErrorAC,
} from "../../../store/action";
import { showAlertAC } from "../../../../alert";
import { isEmptyObj } from "../../../../utils/other";
import {
  Photo,
  FirestoreDate,
  WorkerRequestBody,
  EditPhotoFirestoreRequestBody,
  FirestoreFieldsToEdit,
} from "./../../../types";
import { SearchTerms } from "../../../../search/types";
import { isInSearchTerms, makeEditPhotoData } from "./helper";
import {
  editPhoto as editPhotoFirestoreReq,
  getPhotoById,
} from "../../../service/DbService";
import { editPhoto as editPhotoWorkerReq } from "../../../service/WorkerService";
import {
  then,
  _catch,
  Done,
  Next,
  map,
  tap,
  chain,
  compose,
  cond,
  elif,
} from "fmagic";
import { GlobalState } from "../../../../types";
import { usePhotoReq } from "../../../hook/usePhotoReq";

const onError = (error: any, dispatch: any, setState: any, photoId: string) => {
  console.log("ERROR", error);

  batch(() => {
    dispatch(editPhotoRequestErrorAC(photoId));

    dispatch(
      showAlertAC(`К сожалению, мы не смогли сохранить изменения`, "error")
    );
  });

  setState((prevState: any) => ({
    ...prevState,
    uploadLoading: false,
    end: true,
    //errorReq: error.msg ? error.msg : JSON.stringify(error),
  }));
};

const onSuccess = (
  dispatch: any,
  setState: any,
  searchTerms: SearchTerms,
  fieldsToUpdate: any,
  photoId: string
) => {
  //getPhotoById(id).then(() => dispatch(getAddedPhotoSuccessAC()));

  //const isLastReq = this.requests.size === 0;
  //dispatch(addPhotoRequestSuccessAC());

  //console.log("-------BATCH");

  //if (isLastReq && !this.anotherForm) this.dispatch(hideAddFormAC());

  if (isInSearchTerms(searchTerms, fieldsToUpdate)) {
    //console.log("-------BATCH IN SEARCH TERM");
    getEditedPhotoReq(photoId, dispatch, setState);
  } else {
    //console.log("-------BATCH NOT IN SEARCH TERM");
    batch(() => {
      dispatch(editPhotoSuccessAC(photoId));

      dispatch(showAlertAC(`Фото успешно изменено.`, "success"));
    });

    setState((prevState: any) => ({
      ...prevState,
      end: true,
    }));
  }

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
  //getAddedPhotoReq(photoId, dispatch);
};

export const getEditedPhotoReq = (
  photoId: string,
  dispatch: any,
  setState: any
) => {
  getPhotoById(photoId)
    .then((photo) => {
      batch(() => {
        dispatch(editPhotoSuccessAC(photo));
        dispatch(showAlertAC(`Фото успешно изменено.`, "success"));
      });

      setState((prevState: any) => ({
        ...prevState,
        end: true,
      }));
    })
    .catch((err) => {
      batch(() => {
        dispatch(getEditedPhotoErrorAC(photoId));
        dispatch(showAlertAC(`Фото успешно изменено.`, "success"));
      });

      setState((prevState: any) => ({
        ...prevState,
        end: true,
      }));
    });
};

/* export const request = (
  dispatch: any,
  setState: any,
  formData: any,
  userUid: string,
  isNeedWorkerReq: boolean,
  photoId: string,
  searchTerms: SearchTerms,
  mainRef: MutableRefObject<any>,
  photo: Photo<FirestoreDate>
) =>
  compose(
    makeEditPhotoData(formData, photo),
    ///  tap((fieldsToUpdate) =>
   //   console.log("FIELDS TO UPDATE", fieldsToUpdate, formData, photo)
   // ), 
    (fieldsToUpdate) =>
      isEmptyObj(fieldsToUpdate) && !isNeedWorkerReq
        ? Done.of(dispatch(showAlertAC("Вы ничего не изменили.", "error")))
        : Next.of(fieldsToUpdate),
    map(
      tap((fieldsToUpdate) => {
        mainRef.current.isSubmited = true;
        mainRef.current.formData = formData;

        setState((prevState) => ({
          ...prevState,
          uploadLoading: true,
        }));
      })
    ),
    chain((fieldsToUpdate) =>
      compose(
        () => dispatch(editPhotoSendRequestAC(photoId)),
        elif(
          () => isNeedWorkerReq,
          () =>
            compose(
              (): EditPhotoWorkerData => ({
                photoId,
                userUid: userUid,
                file: (formData.photoFile as FileList)[0],
                ...fieldsToUpdate,
              }),
              editPhotoWorkerReq
            ),
          () =>
            compose(
              (): EditPhotoFirestoreData => ({
                photoId,
                fieldsToUpdate,
              }),
              editPhotoFirestoreReq
            )
        ),
        then((res: any) => {
          if (res && res.status === "error")
            throw new Error(`Error from worker...`);
        }),
        then(() =>
          onSuccess(dispatch, setState, searchTerms, fieldsToUpdate, photoId)
        ),
        _catch((err) => onError(err, dispatch, setState, photoId))
      )()
    )
  ); */

export const request = (
  dispatch: any,
  setState: any,
  formData: any,
  userUid: string,
  isNeedWorkerReq: boolean,
  photoId: string,
  searchTerms: SearchTerms,
  mainRef: MutableRefObject<any>,
  photo: Photo<FirestoreDate>
) =>
  compose(
    makeEditPhotoData(formData, photo),
    //  tap((fieldsToUpdate) =>
    //   console.log("FIELDS TO UPDATE", fieldsToUpdate, formData, photo)
    //),
    (fieldsToUpdate: FirestoreFieldsToEdit) =>
      isEmptyObj(fieldsToUpdate) && !isNeedWorkerReq
        ? Done.of(dispatch(showAlertAC("Вы ничего не изменили.", "error")))
        : Next.of(fieldsToUpdate),
    map(
      tap((fieldsToUpdate: FirestoreFieldsToEdit) => {
        mainRef.current.isSubmited = true;
        mainRef.current.formData = formData;

        setState((prevState) => ({
          ...prevState,
          uploadLoading: true,
        }));
      })
    ),
    chain((fieldsToUpdate: FirestoreFieldsToEdit) =>
      compose(
        () => dispatch(editPhotoSendRequestAC(photoId)),
        elif(
          () => isNeedWorkerReq,
          compose(
            (): WorkerRequestBody => ({
              photoId,
              userUid: userUid,
              photoFile: (formData.photoFile as FileList)[0],
              //...fieldsToUpdate,
              description: fieldsToUpdate.description,
              date:
                fieldsToUpdate.date !== undefined
                  ? JSON.stringify(fieldsToUpdate.date)
                  : undefined,
              tags:
                fieldsToUpdate.tags !== undefined
                  ? JSON.stringify(fieldsToUpdate.tags)
                  : undefined,
            }),

            editPhotoWorkerReq
          ),
          compose(
            (): EditPhotoFirestoreRequestBody => ({
              photoId,
              fieldsToUpdate,
            }),
            editPhotoFirestoreReq
          )
        ),
        then((res: any) => {
          if (res && res.status === "error")
            throw new Error(`Error from worker...`);
        }),
        then(() =>
          onSuccess(dispatch, setState, searchTerms, fieldsToUpdate, photoId)
        ),
        _catch((err) => onError(err, dispatch, setState, photoId))
      )()
    )
  );

export const useEditPhotoReq = (id: string, photo: Photo<FirestoreDate>) => {
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
};

/* export const useEditPhotoReq = (
  id: string,
  removeRequest: (id: string) => void,
  photo: IPhoto<FirestoreDate>
) => {
  const mainRef = useRef<any>({
    isSubmited: false,
    formData: {},
    selfKilling: false,
    timerId: null,
  });

  const [state, setState] = useState({
    showForm: false,
    formWasClosed: false,
    uploadLoading: false,
    successReq: false,
    errorReq: "",
  });

  const dispatch = useDispatch();

  // TODO:
  /* const userUid = useSelector((state: any) =>
        state.auth.user ? state.auth.user.uid : ""
      ); /
  const userUid = "userUid";

  const searchState = useSelector<GlobalState, ISearchState>(
    (state) => state.search
  );

  const onSelfKilling = () => {
    console.log("onSelfKilling", mainRef);
    mainRef.current.selfKilling = true;

    mainRef.current.timerId = setTimeout(() => {
      removeRequest(id);
    }, 1000);
  };

  useEffect(() => {
    setState({
      ...state,
      showForm: true,
    });
  }, []);

  // remove self
  useEffect(() => {
    // remove request if:
    // - it successfully done
    // - it has error and form already closed
    // - form closed without submit
    // - form closed and we get error

    if (mainRef.current.selfKilling === true) return;

    //if (state.successReq === true) onSelfKilling();

    if (state.showForm === false && state.formWasClosed === true) {
      onSelfKilling();
      /* if (state.errorReq || mainRef.current.isSubmited) {
        onSelfKilling();
      } /
    }

    return () => {
      if (mainRef.current.timerId) clearTimeout(mainRef.current.timerId);
    };
  }, [state.successReq, state.showForm, state.formWasClosed]);

  const onFormClose = () => {
    ///console.log("ON FORM CLOSE");
    setState((prevState) => ({
      ...prevState,
      showForm: false,
      formWasClosed: true,
    }));
  };

  const editPhoto = (formData: any) => {
    // check if data changed
    /*  const fieldsToUpdate = makeEditPhotoData(formData, photo);

    
    if (isEmptyObj(fieldsToUpdate) && !isNeedWorkerReq) {
      dispatch(showAlertAC("Вы ничего не изменили.", "error"));
      return;
    }

    mainRef.current.isSubmited = true;
    mainRef.current.formData = formData;

    setState((prevState) => ({
      ...prevState,
      uploadLoading: true,
    })); /

    // Add countAddReq++ to global state
    // Set uploadLoading = true

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
      searchState,
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
};
 */
