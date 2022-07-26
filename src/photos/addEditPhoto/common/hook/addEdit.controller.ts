import { AddPhotoHookStage } from "../../types";
import { CleanUp, AddEditRequests } from "../../common/service/types";

export const cleanUpOnError = async (
  stage: AddPhotoHookStage,
  cleanUp: CleanUp,
  cleanUpReq: AddEditRequests["cleanUpReq"]
) => {
  if (
    (stage === "SEND_FIRESTORE_REQUEST" || stage === "END_WORKER_REQUEST") &&
    cleanUp.isNeedReq() === true
  ) {
    cleanUpReq().catch((err: Error) => {
      console.log("ERROR ON CLEAN UP REQUEST", err);
    });
    cleanUp.saveNewCleanUpDate();
  }
};

export const cleanUpOnSuccessEdit = async (
  cleanUp: CleanUp,
  cleanUpReq: AddEditRequests["cleanUpReq"]
) => {
  if (cleanUp.isNeedReq() === true) {
    cleanUpReq().catch((err: Error) => {
      console.log("ERROR ON CLEAN UP REQUEST", err);
    });
    cleanUp.saveNewCleanUpDate();
  }
};
