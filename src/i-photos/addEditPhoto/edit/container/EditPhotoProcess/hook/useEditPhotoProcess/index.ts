import { ProcessLifeCycle } from "../../../../../common/hook/useSendFormProcess/types";
import {
  chain,
  compose,
  Done,
  NI_Next,
  tap,
  then,
  _catch,
  thenDoneFold,
  map,
  elif,
} from "fmagic";
import { MutableRefObject, useCallback, useRef } from "react";
import { useDispatch, batch as batch_ } from "react-redux";
import useSendFormProcess from "../../../../../common/hook/useSendFormProcess";
import {
  EditRequests,
  DataAdapter,
  CleanUp,
  EditPhotoFirestoreRequestBody,
} from "./service/types";
import {
  Photo,
  FirestoreDate,
  WorkerResponse,
  MainResponseData,
} from "lizzygram-common-data/dist/types";
import { showAlertAC as showAlertAC_ } from "../../../../../../../alert";
import { editPhotoAC as editPhotoAC_ } from "../../../../../../loadPhotos";
import {
  AddPhotoHookStage,
  EditPhotoFormData,
  EditPhotoHookStage,
} from "../../../../../types";
import {
  editPhotoSendRequestAC,
  editPhotoRequestEndAC,
  editPhotoRequestErrorAC,
  editPhotoRequestSuccessAC,
  //addPhotoStartRequestAC,
} from "../../../../../store/action";
import * as requests from "./service/requests/requests.fake";
import * as dataAdapter from "./service/dataAdapter";
import * as cleanUp from "./../../../../../common/service/cleanUp/cleanUp.fake";
import { getToken as getToken_ } from "./../../../../../../../i-service/firebase/firebase.auth.fake";
import {
  cleanUpOnError as cleanUpOnError_,
  cleanUpOnSuccessEdit as cleanUpOnSuccessEdit_,
} from "./../../../../../common/hook/addEdit.controller";

export type UseEditPhotoProcessProps = {
  photoId: string;
  currPhoto: Photo<FirestoreDate>;
  //userUid: string;
  //isFormSubmited: boolean;
  formData: EditPhotoFormData;
  dispatch: ReturnType<typeof useDispatch>;
  processLifeCycle: ProcessLifeCycle;
};

export type UseEditPhotoProcessData = UseEditPhotoProcessProps & {
  //onSendReq_: () => void;
  //state: PhotoReqState;
  //setState: Dispatch<SetStateAction<PhotoReqState>>;

  fieldsToUpdate: Partial<Photo<any>>;
  workerReqData: FormData;
  firestoreReqData: EditPhotoFirestoreRequestBody;
  isNeedWorkerReq: boolean;
  isNeedFirestoreReq: boolean;
  /* formData: AddPhotoFormData;
      photo: Photo<Date>;
      workerRequest: WorkerRequest;*/
  /* base64: data.base64String as string,
                aspectRatio: data.photoInfo?.aspectRatio as number,
                imageExtention: data.photoInfo?.imageExtention as string,
                googleDriveId: data.googleDriveId as string,
                webImagesInfo: { */
  workerPhotoData: MainResponseData;
  stage: EditPhotoHookStage;
  error?: any;
};

export const main_ =
  (
    batch: typeof batch_,
    stateAC: {
      editPhotoSendRequestAC: typeof editPhotoSendRequestAC;
      //addPhotoRequestEndAC: typeof addPhotoRequestEndAC;
      editPhotoRequestErrorAC: typeof editPhotoRequestErrorAC;
      editPhotoRequestSuccessAC: typeof editPhotoRequestSuccessAC;
      //addPhotoStartRequestAC: typeof addPhotoStartRequestAC;
    },
    editPhotoAC: typeof editPhotoAC_,
    showAlertAC: typeof showAlertAC_,
    dataAdapter: DataAdapter,
    requests: EditRequests,
    cleanUp: CleanUp,
    getToken: typeof getToken_,
    cleanUpOnError: typeof cleanUpOnError_,
    cleanUpOnSuccessEdit: typeof cleanUpOnSuccessEdit_
  ) =>
  (props: UseEditPhotoProcessProps) =>
    compose<UseEditPhotoProcessProps, Promise<void>>(
      (data: UseEditPhotoProcessProps) => ({
        ...data,
        fieldsToUpdate: dataAdapter.makeFieldsToUpdate(
          data.formData,
          data.currPhoto
        ),
      }),

      (data: UseEditPhotoProcessData) => ({
        ...data,
        isNeedWorkerReq: dataAdapter.isNeedWorkerReq(data.formData.photoFile),
        isNeedFirestoreReq: dataAdapter.isNeedFirestoreReq(data.fieldsToUpdate),
      }),

      (data: UseEditPhotoProcessData) =>
        data.isNeedFirestoreReq === false && data.isNeedWorkerReq === false
          ? //dispatch(showAlertAC("Вы ничего не изменили.", "error"))
            Done.of({
              stage: "NOTHING_CHANGED",
              ...data,
            })
          : NI_Next.of(data),

      map(
        tap(({ dispatch, photoId }: UseEditPhotoProcessData) =>
          dispatch(stateAC.editPhotoSendRequestAC(photoId))
        )
      ),

      map(
        tap(({ processLifeCycle }: UseEditPhotoProcessData) =>
          processLifeCycle.onSendReq()
        )
      ),

      //map(tap((data) => console.log("STAGE-1", data))),

      // SEND WORKER REQUEST IF NEEDED
      chain(
        elif(
          ({ isNeedWorkerReq }: UseEditPhotoProcessData) =>
            isNeedWorkerReq === false,
          (data: UseEditPhotoProcessData) => Promise.resolve(NI_Next.of(data)),
          compose(
            (data: UseEditPhotoProcessData) => ({
              ...data,
              workerReqData: dataAdapter.makeWorkerReqData(
                data.formData.photoFile[0]
              ),
            }),
            //tap((data) => console.log("STAGE-1.5", data)),
            async (data: UseEditPhotoProcessData) => {
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
          )
        )
      ),

      // SEND FIRESTORE REQUEST
      then(
        chain(
          compose<UseEditPhotoProcessData, Promise<UseEditPhotoProcessData>>(
            (data: UseEditPhotoProcessData) => ({
              ...data,
              firestoreReqData: dataAdapter.makeFirestoreReqData(
                data.fieldsToUpdate,
                data.photoId,
                data.workerPhotoData
              ),
            }),
            async (data: UseEditPhotoProcessData) => {
              await requests.firestoreReq(data.firestoreReqData);
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
        (data: UseEditPhotoProcessData) => {
          console.error("ERROR", data);

          const isNothingChanged = data.stage === "NOTHING_CHANGED";

          const alertTitle =
            isNothingChanged === true
              ? "Вы ничего не изменили..."
              : `К сожалению, мы не смогли сохранить изменения.`;

          batch(() => {
            props.dispatch(showAlertAC(alertTitle, "error"));

            if (isNothingChanged === false)
              props.dispatch(stateAC.editPhotoRequestErrorAC(data.photoId));
          });

          if (isNothingChanged === false) {
            props.processLifeCycle.onReqError();

            // Clean up if we save photos to cloudinary
            cleanUpOnError(
              data.stage as AddPhotoHookStage,
              cleanUp,
              requests.cleanUpReq
            );
          }

          /* if (
            (data.stage === "SEND_FIRESTORE_REQUEST" ||
              data.stage === "END_WORKER_REQUEST") &&
            cleanUp.isNeedReq() === true
          ) {
            requests.cleanUpReq().catch((err: Error) => {
              console.log("ERROR ON CLEAN UP REQUEST", err);
            });
            cleanUp.saveNewCleanUpDate();
          } */

          /*  onError(
            data.dispatch,
            processLifeCycle.onReqError,
            data.formData.photoFile[0].name
          ); */
        },
        // ON SUCCESS
        (data: UseEditPhotoProcessData) => {
          batch(() => {
            data.dispatch(showAlertAC(`Фото успешно изменено.`, "success"));

            data.dispatch(stateAC.editPhotoRequestSuccessAC(data.photoId));

            data.dispatch(
              editPhotoAC({
                id: data.firestoreReqData.photoId,
                ...data.firestoreReqData.fieldsToUpdate,
              } as any)
            );
          });

          data.processLifeCycle.onReqSuccess();

          // Clean up if we save photos to cloudinary
          cleanUpOnSuccessEdit(cleanUp, requests.cleanUpReq);
          /* if (cleanUp.isNeedReq() === true) {
            requests.cleanUpReq().catch((err: Error) => {
              console.log("ERROR ON CLEAN UP REQUEST", err);
            });
            cleanUp.saveNewCleanUpDate();
          } */
        }
      )
    )(props);

const main = main_(
  batch_,
  {
    editPhotoRequestErrorAC,
    editPhotoRequestSuccessAC,
    editPhotoSendRequestAC,
  },
  editPhotoAC_,
  showAlertAC_,
  dataAdapter,
  requests,
  cleanUp,
  getToken_,
  cleanUpOnError_,
  cleanUpOnSuccessEdit_
);

const editPhoto_ =
  (props: Omit<UseEditPhotoProcessProps, "formData">) =>
  (formData: EditPhotoFormData) => {
    main({
      ...props,
      formData,
    });
  };

const useEditPhotoProcess = (
  photoId: string,
  currPhoto: Photo<FirestoreDate>
) => {
  const dispatch = useDispatch();

  const formDataRef: MutableRefObject<EditPhotoFormData> = useRef();

  const setFormData = useCallback((formData: EditPhotoFormData) => {
    formDataRef.current = formData;
  }, []);

  const getFormData = useCallback(() => {
    return formDataRef.current;
  }, []);

  const removeRequest = useCallback(() => {
    dispatch(editPhotoRequestEndAC(photoId));
  }, []);

  const { lifeCycle, showForm, uploadLoading } =
    useSendFormProcess(removeRequest);

  //const searchTerms = useSelector<GlobalState, SearchTerms>(
  //(state) => state.search.terms
  //);

  const editPhoto = useCallback(
    editPhoto_({
      processLifeCycle: lifeCycle,
      photoId,
      currPhoto,
      //userUid,
      dispatch,
    }),
    []
  );

  return {
    editPhoto,
    onFormClose: lifeCycle.onFormClose,
    showForm,
    uploadLoading,
  };
};

export default useEditPhotoProcess;
