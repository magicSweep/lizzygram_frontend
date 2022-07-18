import {
  chain,
  compose,
  Done,
  NI_Next,
  tap,
  then,
  _catch,
  thenDoneFold,
} from "fmagic";
import { MutableRefObject, useCallback, useRef } from "react";
import { useDispatch, batch as batch_ } from "react-redux";
import useSendFormProcess from "../../../../../common/hook/useSendFormProcess";
import { AddRequests, DataAdapter, CleanUp } from "./service/types";
import { ProcessLifeCycle } from "./../../../../../common/hook/useSendFormProcess/types";
import { cleanUpOnError as cleanUpOnError_ } from "./../../../../../common/hook/addEdit.controller";
import {
  Photo,
  WorkerResponse,
  MainResponseData,
} from "lizzygram-common-data/dist/types";
import { showAlertAC as showAlertAC_ } from "../../../../../../../alert";
import { addPhotoAC as addPhotoAC_ } from "../../../../../../loadPhotos";
import { AddPhotoFormData, AddPhotoHookStage } from "../../../../../types";
import {
  addPhotoRequestSendAC,
  addPhotoRequestEndAC,
  addPhotoRequestErrorAC,
  addPhotoRequestSuccessAC,
  //addPhotoRequestStartAC,
} from "../../../../../store";
import * as requests from "./service/requests/requests.fake";
import * as dataAdapter from "./service/dataAdapter";
import * as cleanUp from "./../../../../../common/service/cleanUp/cleanUp.fake";
import { getToken as getToken_ } from "./../../../../../../../i-service/firebase/firebase.auth.fake";

export type UseAddPhotoProcessProps = {
  photoId: string;
  userUid: string;
  formData: AddPhotoFormData;
  dispatch: ReturnType<typeof useDispatch>;
  processLifeCycle: ProcessLifeCycle;
};

export type UseAddPhotoProcessData = UseAddPhotoProcessProps & {
  //onSendReq_: () => void;
  //state: PhotoReqState;
  //setState: Dispatch<SetStateAction<PhotoReqState>>;
  photoToAdd: Photo<any>;
  workerReqData: FormData;
  //firestoreReqData: any;
  /* formData: AddPhotoFormData;
    photo: Photo<Date>;
    workerRequest: WorkerRequest;*/
  /* base64: data.base64String as string,
              aspectRatio: data.photoInfo?.aspectRatio as number,
              imageExtension: data.photoInfo?.imageExtension as string,
              googleDriveId: data.googleDriveId as string,
              webImagesInfo: { */
  workerPhotoData: MainResponseData;
  stage: AddPhotoHookStage;
  error?: any;
};

export const main_ =
  (
    /*  makeAddPhotoData: typeof makeAddPhotoData_,
    addPhotoFirestoreReq: typeof addPhotoFirestoreReq_,
    makeAddPhotoWorkerData: typeof makeAddPhotoWorkerData_,
    addPhotoWorkerReq: typeof addPhotoWorkerReq_, */
    batch: typeof batch_,
    stateAC: {
      addPhotoRequestSendAC: typeof addPhotoRequestSendAC;
      //addPhotoRequestEndAC: typeof addPhotoRequestEndAC;
      addPhotoRequestErrorAC: typeof addPhotoRequestErrorAC;
      addPhotoRequestSuccessAC: typeof addPhotoRequestSuccessAC;
      //addPhotoRequestStartAC: typeof addPhotoRequestStartAC;
    },
    addPhotoAC: typeof addPhotoAC_,
    showAlertAC: typeof showAlertAC_,
    dataAdapter: DataAdapter,
    requests: AddRequests,
    cleanUp: CleanUp,
    getToken: typeof getToken_,
    cleanUpOnError: typeof cleanUpOnError_
    /* onSuccess: ReturnType<typeof onSuccess_>,
    onError: ReturnType<typeof onError_> */
    //onSendReq_: typeof onSendReq
  ) =>
  (props: UseAddPhotoProcessProps) =>
    compose<UseAddPhotoProcessProps, Promise<void>>(
      // SEND WORKER REQUEST
      compose<UseAddPhotoProcessData, Promise<UseAddPhotoProcessData>>(
        tap(({ dispatch }: UseAddPhotoProcessData) =>
          dispatch(stateAC.addPhotoRequestSendAC())
        ),
        tap(({ processLifeCycle }: UseAddPhotoProcessData) =>
          processLifeCycle.onSendReq()
        ),
        (data: UseAddPhotoProcessData) => ({
          ...data,
          workerReqData: dataAdapter.makeWorkerReqData(
            data.formData.photoFile[0]
          ),
        }),
        async (data: UseAddPhotoProcessData) => {
          const token = await getToken();
          data.workerPhotoData = await requests.workerReq(
            data.workerReqData,
            token
          );
          data.stage = "END_WORKER_REQUEST";
          return data;
        },
        then(NI_Next.of),
        _catch((error: any) =>
          Done.of({
            stage: "SEND_WORKER_REQUEST",
            error,
          })
        )
      ),

      // SEND FIRESTORE REQUEST
      then(
        chain(
          compose<UseAddPhotoProcessData, Promise<UseAddPhotoProcessData>>(
            (data: UseAddPhotoProcessData) => ({
              ...data,
              photoToAdd: dataAdapter.makeFirestoreReqData(
                data.workerPhotoData,
                data.formData,
                data.userUid,
                data.photoId
              ),
            }),
            async (data: UseAddPhotoProcessData) => {
              await requests.firestoreReq(data.photoToAdd);
              return data;
            },
            then(NI_Next.of),
            _catch((error: any) =>
              Done.of({
                stage: "SEND_FIRESTORE_REQUEST",
                error,
              })
            )
          )
        )
      ),

      thenDoneFold(
        (data: UseAddPhotoProcessData) => {
          console.error("ERROR", data);

          batch(() => {
            props.dispatch(
              showAlertAC({
                message: `К сожалению, мы не смогли сохранить фото - ${props.formData.photoFile[0].name}`,
                alertType: "error",
              })
            );

            props.dispatch(stateAC.addPhotoRequestErrorAC());
          });

          props.processLifeCycle.onReqError();

          cleanUpOnError(data.stage, cleanUp, requests.cleanUpReq);

          /*  onError(
            data.dispatch,
            processLifeCycle.onReqError,
            data.formData.photoFile[0].name
          ); */
        },
        // ON SUCCESS
        (data: UseAddPhotoProcessData) => {
          batch(() => {
            data.dispatch(
              showAlertAC({
                message: `Фото успешно добавлено - ${data.formData.photoFile[0].name}`,
                alertType: "success",
              })
            );

            data.dispatch(stateAC.addPhotoRequestSuccessAC());

            const photoDate = new Date(data.photoToAdd.date);

            data.dispatch(
              addPhotoAC({
                ...data.photoToAdd,
                date: {
                  toDate: () => photoDate,
                },
              })
            );
          });

          data.processLifeCycle.onReqSuccess();
        }
      )

      // ON ERROR
      /*     _catch((e: any) => {
        console.error("ERROR", e.message, props);

        batch(() => {
          props.dispatch(
            showAlertAC(
              {message: `К сожалению, мы не смогли сохранить фото - ${props.formData.photoFile[0].name}`,
              alertType: "error"}
            )
          );

          props.dispatch(stateAC.addPhotoRequestErrorAC());
        });

        props.processLifeCycle.onReqError();

        // Clean up if we save photos to cloudinary
        if (cleanUp.isNeedReq() === true) {
          requests.cleanUpReq().catch((err: Error) => {
            console.log("ERROR ON CLEAN UP REQUEST", err);
          });
          cleanUp.saveNewCleanUpDate();
        }

        /*  onError(
          data.dispatch,
          processLifeCycle.onReqError,
          data.formData.photoFile[0].name
        ); /
      }) */
    )(props);

const main = main_(
  batch_,
  {
    addPhotoRequestErrorAC,
    addPhotoRequestSuccessAC,
    addPhotoRequestSendAC,
  },
  addPhotoAC_,
  showAlertAC_,
  dataAdapter,
  requests,
  cleanUp,
  getToken_,
  cleanUpOnError_
);

const addPhoto_ =
  (props: Omit<UseAddPhotoProcessProps, "formData">) =>
  (formData: AddPhotoFormData) => {
    main({
      ...props,
      formData,
    });
  };

const useAddPhotoProcess = (
  userUid: string,
  photoId: string
  /* removeRequest: (id: string) => void */
) => {
  const dispatch = useDispatch();

  const formDataRef: MutableRefObject<AddPhotoFormData | undefined> = useRef();

  const setFormData = useCallback((formData: AddPhotoFormData) => {
    formDataRef.current = formData;
  }, []);

  const getFormData = useCallback(() => {
    return formDataRef.current;
  }, []);

  const removeRequest = useCallback(() => {
    dispatch(addPhotoRequestEndAC(photoId));
  }, []);

  const { lifeCycle, showForm, uploadLoading } =
    useSendFormProcess(removeRequest);

  //const searchTerms = useSelector<GlobalState, SearchTerms>(
  //(state) => state.search.terms
  //);

  const addPhoto = useCallback(
    addPhoto_({
      processLifeCycle: lifeCycle,
      photoId,
      userUid,
      dispatch,
    }),
    []
  );

  return {
    addPhoto,
    onFormClose: lifeCycle.onFormClose,
    showForm,
    uploadLoading,
  };
};

export default useAddPhotoProcess;
