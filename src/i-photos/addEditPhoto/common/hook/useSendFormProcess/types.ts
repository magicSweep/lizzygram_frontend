export type SendFormProcessState = {
  showForm: boolean;
  formWasClosed: boolean;
  uploadLoading: boolean;
  isFormSubmited: boolean;
  //end: false,
  isEndReq: boolean;
};

export type ProcessLifeCycle = {
  onFormClose: () => void;
  onSendReq: () => void;
  onReqError: () => void;
  onReqSuccess: () => void;
};
