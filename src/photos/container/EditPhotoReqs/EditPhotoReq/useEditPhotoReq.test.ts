import {
  mockBatch,
  mockSetState,
  mockUseEffect,
  setInitState,
  state,
  clearMockSetState,
} from "../../../../utils/mock";
import { onError_, onSuccess_, request_ } from "./hook";

describe("request_", () => {
  /* (
    editPhotoFirestoreReq: typeof editPhotoFirestoreReq_,
    editPhotoWorkerReq: typeof editPhotoWorkerReq_,
    onError_: typeof onError,
    onSuccess_: typeof onSuccess,
    makeEditPhotoData: typeof makeEditPhotoData_,
    makeEditPhotoWorkerProps: typeof makeEditPhotoWorkerProps_
  ) =>
  (data: UseEditPhotoReqData) */

  const editPhotoFirestoreReq = jest.fn(() => Promise.resolve());
  const editPhotoWorkerReq = jest.fn().mockResolvedValue({
    status: "success",
  });
  const onError = jest.fn();
  const onSuccess = jest.fn();
  const makeEditPhotoData = jest.fn().mockReturnValue({
    description: "super puper",
    tags: { quer: true },
  });
  const makeEditPhotoWorkerProps = jest.fn();
  const setState = jest.fn(mockSetState);
  const dispatch = jest.fn();

  const initData = {
    photoId: "photoId",
    userUid: "userUid",
    dispatch,
    setState,
    mainRef: {
      current: {
        formData: {
          photoFile: ["file"],
        },
        editedPhoto: "editedPhoto",
        isNeedWorkerReq: false,
      },
    },
  };

  afterEach(() => {
    clearMockSetState();
    jest.clearAllMocks();
  });

  test.skip("We check values and if no new data we show alert and do nothing", async () => {
    let data = { ...initData };

    makeEditPhotoData.mockResolvedValueOnce({});

    const request = request_(
      editPhotoFirestoreReq,
      editPhotoWorkerReq,
      onError,
      onSuccess,
      makeEditPhotoData,
      makeEditPhotoWorkerProps
    );

    const res = await request(data as any);

    expect(data.dispatch).toHaveBeenCalledTimes(1);
    expect(data.dispatch).toHaveBeenNthCalledWith(1, {
      alertType: "error",
      message: "Вы ничего не изменили.",
      type: "SHOW_ALERT",
    });
  });

  test("If we get valid photoFile we send success request to worker", async () => {
    let data = { ...initData };
    data.mainRef.current.isNeedWorkerReq = true;
    makeEditPhotoWorkerProps.mockReturnValueOnce({
      tags: JSON.stringify({ ertw: 123 }),
      date: "12-33-2045",
    });

    const request = request_(
      editPhotoFirestoreReq,
      editPhotoWorkerReq,
      onError,
      onSuccess,
      makeEditPhotoData,
      makeEditPhotoWorkerProps
    );

    const res = await request(data as any);

    //expect(setState).toHaveBeenCalledTimes(1);

    //expect(res).toEqual("helo");

    expect(dispatch).toHaveBeenCalledTimes(1);

    expect(setState).toHaveBeenCalledTimes(1);
    expect(state).toEqual({ isFormSubmited: true, uploadLoading: true });

    expect(makeEditPhotoData).toHaveBeenCalledTimes(1);
    expect(makeEditPhotoData).toHaveBeenNthCalledWith(
      1,
      { photoFile: ["file"] },
      "editedPhoto"
    );
    expect(makeEditPhotoWorkerProps).toHaveBeenCalledTimes(1);
    expect(makeEditPhotoWorkerProps).toHaveBeenNthCalledWith(
      1,
      { description: "super puper", tags: { quer: true } },
      "photoId",
      "userUid",
      "file"
    );

    expect(editPhotoWorkerReq).toHaveBeenCalledTimes(1);
    expect(editPhotoWorkerReq).toHaveBeenNthCalledWith(1, {
      date: "12-33-2045",
      tags: '{"ertw":123}',
    });
    expect(editPhotoFirestoreReq).toHaveBeenCalledTimes(0);

    expect(onError).toHaveBeenCalledTimes(0);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    //expect(onSuccess).toHaveBeenNthCalledWith(1, data);
  });

  test("If worker response with status error - we call onError", async () => {
    let data = { ...initData };
    data.mainRef.current.isNeedWorkerReq = true;
    makeEditPhotoWorkerProps.mockReturnValueOnce({
      tags: JSON.stringify({ ertw: 123 }),
      date: "12-33-2045",
    });

    editPhotoWorkerReq.mockResolvedValueOnce({
      status: "error",
    });

    const request = request_(
      editPhotoFirestoreReq,
      editPhotoWorkerReq,
      onError,
      onSuccess,
      makeEditPhotoData,
      makeEditPhotoWorkerProps
    );

    const res = await request(data as any);

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenNthCalledWith(1, dispatch, setState, "photoId");
    expect(onSuccess).toHaveBeenCalledTimes(0);
    //expect(onSuccess).toHaveBeenNthCalledWith(1, data);
  });

  test("If we do not have photoFile we send success request to firestore", async () => {
    let data = { ...initData };
    data.mainRef.current.isNeedWorkerReq = false;
    data.mainRef.current.formData = {
      description: "desc",
      date: "12-12-2212",
    } as any;

    const request = request_(
      editPhotoFirestoreReq,
      editPhotoWorkerReq,
      onError,
      onSuccess,
      makeEditPhotoData,
      makeEditPhotoWorkerProps
    );

    const res = await request(data as any);

    //expect(setState).toHaveBeenCalledTimes(1);

    //expect(res).toEqual("helo");

    expect(dispatch).toHaveBeenCalledTimes(1);

    expect(setState).toHaveBeenCalledTimes(1);
    expect(state).toEqual({ isFormSubmited: true, uploadLoading: true });

    expect(makeEditPhotoData).toHaveBeenCalledTimes(1);
    expect(makeEditPhotoData).toHaveBeenNthCalledWith(
      1,
      { date: "12-12-2212", description: "desc" },
      "editedPhoto"
    );
    expect(makeEditPhotoWorkerProps).toHaveBeenCalledTimes(0);

    expect(editPhotoWorkerReq).toHaveBeenCalledTimes(0);

    expect(editPhotoFirestoreReq).toHaveBeenCalledTimes(1);
    expect(editPhotoFirestoreReq).toHaveBeenNthCalledWith(1, {
      fieldsToUpdate: { description: "super puper", tags: { quer: true } },
      photoId: "photoId",
    });

    expect(onError).toHaveBeenCalledTimes(0);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    //expect(onSuccess).toHaveBeenNthCalledWith(1, data);
  });
});

describe("onError_ - we notify global state, show error alert and notify local state", () => {
  const batch = jest.fn(mockBatch);
  const setState = jest.fn(mockSetState);
  const dispatch = jest.fn();

  /*  (batch: any) =>
  (
    dispatch: any,
    setState: Dispatch<SetStateAction<PhotoReqState>>,
    photoId: string */

  beforeEach(() => {});

  afterEach(() => {
    clearMockSetState();
    jest.clearAllMocks();
  });

  test("", () => {
    setInitState({ prev: "value" });

    onError_(batch)(dispatch, setState, "photoId13");

    expect(batch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(setState).toHaveBeenCalledTimes(1);

    expect(state).toEqual({
      isEndReq: true,
      prev: "value",
      uploadLoading: false,
    });
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      photoId: "photoId13",
      type: "EDIT_PHOTO_REQUEST_ERROR",
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      alertType: "error",
      message: "К сожалению, мы не смогли сохранить изменения",
      type: "SHOW_ALERT",
    });
  });
});

describe(`onSuccess_ 
        - we notify global state, show success alert and notify local state,
        - if edited photo in searchTerms we send request for new photo
    `, () => {
  const getEditedPhotoReq = jest.fn();
  const batch = jest.fn(mockBatch);
  const setState = jest.fn(mockSetState);
  const dispatch = jest.fn();
  const isInSearchTerms = jest.fn();

  const data = {
    dispatch,
    setState,
    searchTerms: "searchTerms",
    fieldsToUpdate: "fieldsToUpdate",
    photoId: "photoId123",
  };

  /*  (batch: any) =>
    (
      dispatch: any,
      setState: Dispatch<SetStateAction<PhotoReqState>>,
      photoId: string */

  beforeEach(() => {});

  afterEach(() => {
    clearMockSetState();
    jest.clearAllMocks();
  });

  test("if edited photo in searchTerms we send request for new photo and do not notify global state", () => {
    setInitState({ prev: "value" });
    isInSearchTerms.mockReturnValueOnce(true);

    onSuccess_(getEditedPhotoReq, batch, isInSearchTerms)(data as any);

    expect(batch).toHaveBeenCalledTimes(0);
    expect(dispatch).toHaveBeenCalledTimes(0);
    expect(setState).toHaveBeenCalledTimes(1);

    expect(state).toEqual({
      isEndReq: false,
      prev: "value",
      uploadLoading: false,
      formWasClosed: true,
      showForm: false,
    });
    //expect(dispatch).toHaveBeenNthCalledWith(1, "helo");
    //expect(dispatch).toHaveBeenNthCalledWith(2, "helo");

    expect(getEditedPhotoReq).toHaveBeenCalledTimes(1);
    expect(getEditedPhotoReq).toHaveBeenNthCalledWith(
      1,
      "photoId123",
      dispatch,
      setState
    );
  });

  test("if edited photo not in searchTerms we notify global state", () => {
    setInitState({ prev: "value" });
    isInSearchTerms.mockReturnValueOnce(false);

    onSuccess_(getEditedPhotoReq, batch, isInSearchTerms)(data as any);

    expect(batch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(setState).toHaveBeenCalledTimes(1);

    expect(state).toEqual({
      isEndReq: true,
      prev: "value",
      uploadLoading: false,
      formWasClosed: true,
      showForm: false,
    });
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      photoOrId: "photoId123",
      type: "EDIT_PHOTO_REQUEST_SUCCESS",
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      alertType: "success",
      message: "Фото успешно изменено.",
      type: "SHOW_ALERT",
    });

    expect(getEditedPhotoReq).toHaveBeenCalledTimes(0);
  });
});
