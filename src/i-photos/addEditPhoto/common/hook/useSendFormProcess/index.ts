import { useCallback, useEffect, useState } from "react";
//import { useAuth } from "../../../../../../auth";
import useSelfDestroy from "../useSelfDestroy";
import { SendFormProcessState } from "./types";
import {
  doesNeedSelfDestroy as doesNeedSelfDestroy_,
  onFormClose as onFormClose_,
  onSendReq as onSendReq_,
  onReqError as onReqError_,
  onReqSuccess as onReqSuccess_,
} from "./helper";

const useSendFormProcess = (processDestroy: () => void) => {
  //const { userUid } = useAuth();

  const [state, setState] = useState<SendFormProcessState>({
    showForm: false,
    formWasClosed: false,
    uploadLoading: false,
    isFormSubmited: false,
    //end
    isEndReq: false,
  });

  //console.log("useSendFormProcess", state);

  const doesNeedSelfDestroy = useCallback(
    () => doesNeedSelfDestroy_(state),
    [state]
  );

  // INIT  METHODS
  const onFormClose = useCallback(() => onFormClose_(setState), []);
  const onSendReq = useCallback(() => onSendReq_(setState), []);
  const onReqError = useCallback(() => onReqError_(setState), []);
  const onReqSuccess = useCallback(() => onReqSuccess_(setState), []);

  // OPEN FORM ON PROCESS CREATE
  useEffect(() => {
    setState((state) => ({
      ...state,
      showForm: true,
    }));
  }, []);

  useSelfDestroy(processDestroy, doesNeedSelfDestroy);

  return {
    lifeCycle: {
      onFormClose,
      onSendReq,
      onReqError,
      onReqSuccess,
    },
    showForm: state.showForm,
    uploadLoading: state.uploadLoading,
  };
};

export default useSendFormProcess;
