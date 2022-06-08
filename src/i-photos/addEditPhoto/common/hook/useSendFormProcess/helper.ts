import { SendFormProcessState } from "./types";

import { SetStateAction, Dispatch } from "react";

export const doesNeedSelfDestroy = (state: SendFormProcessState) => {
  // remove request if:
  // - it successfully done
  // - it has error and form already closed
  // - form closed without submit
  // - form closed and we get error

  //if (isSelfKilled === true) return false;

  //if (state.successReq === true) onSelfKilling();

  if (state.showForm === false && state.formWasClosed === true) {
    if (state.isFormSubmited === false || state.isEndReq === true) {
      //selfKilling();
      return true;
    }

    // end
    /* if (isEndReq === true) {
        onSelfKilling();
      } */
  }

  return false;
};

export const onFormClose = (
  setState: Dispatch<SetStateAction<SendFormProcessState>>
) =>
  setState((prevState) => ({
    ...prevState,
    showForm: false,
    formWasClosed: true,
  }));

export const onSendReq = (
  setState: Dispatch<SetStateAction<SendFormProcessState>>
) =>
  setState((prevState) => ({
    ...prevState,
    uploadLoading: true,
    isFormSubmited: true,
  }));
export const onReqError = (
  setState: Dispatch<SetStateAction<SendFormProcessState>>
) =>
  setState((prevState) => ({
    ...prevState,
    isEndReq: true,
    uploadLoading: false,
  }));
export const onReqSuccess = (
  setState: Dispatch<SetStateAction<SendFormProcessState>>
) =>
  setState((prevState) => ({
    ...prevState,
    //successReq: true,
    //errorReq: "",
    uploadLoading: false,
    showForm: false,
    formWasClosed: true,
    isEndReq: true,
  }));
