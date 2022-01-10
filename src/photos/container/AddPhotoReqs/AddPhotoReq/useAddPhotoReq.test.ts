import {
  mockBatch,
  mockSetState,
  mockUseEffect,
  setInitState,
  state,
  clearMockSetState,
} from "../../../../utils/mock";
import { onError_, onSuccess_, request_ } from "./hook";

describe.only("request_", () => {
  /* makeAddPhotoData_,
  addPhotoFirestoreReq_,
  makeAddPhotoWorkerData_,
  addPhotoWorkerReq_,
  onSuccess,
  onError */

  const addPhotoFirestoreReq = jest.fn(() => Promise.resolve());
  const addPhotoWorkerReq = jest.fn().mockResolvedValue({
    status: "success",
  });
  const onError = jest.fn();
  const onSuccess = jest.fn();
  const makeAddPhotoData = jest.fn().mockReturnValue({
    photoFile: "file",
    userUid: "userUid",
    photoId: "photoId",
  });
  const makeAddPhotoWorkerData = jest.fn().mockReturnValue({
    description: "super puper",
    tags: { wer: true, werr: true },
  });
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
          photoFile: [{ name: "photo.jpg" }],
        },
      },
    },
  };

  afterEach(() => {
    clearMockSetState();
    jest.clearAllMocks();
  });

  test("We send success request to worker", async () => {
    let data = { ...initData };

    const request = request_(
      makeAddPhotoData,
      addPhotoFirestoreReq,
      makeAddPhotoWorkerData,
      addPhotoWorkerReq,
      onSuccess,
      onError
    );

    const res = await request(data as any);

    //expect(setState).toHaveBeenCalledTimes(1);

    expect(dispatch).toHaveBeenCalledTimes(1);

    expect(setState).toHaveBeenCalledTimes(1);
    expect(state).toEqual({ isFormSubmited: true, uploadLoading: true });

    expect(makeAddPhotoData).toHaveBeenCalledTimes(1);
    expect(makeAddPhotoData).toHaveBeenNthCalledWith(
      1,
      { photoFile: [{ name: "photo.jpg" }] },
      "userUid",
      "photoId"
    );

    expect(makeAddPhotoWorkerData).toHaveBeenCalledTimes(1);
    expect(makeAddPhotoWorkerData).toHaveBeenNthCalledWith(
      1,
      { photoFile: [{ name: "photo.jpg" }] },
      "userUid",
      "photoId"
    );

    expect(addPhotoFirestoreReq).toHaveBeenCalledTimes(1);
    expect(addPhotoFirestoreReq).toHaveBeenNthCalledWith(1, {
      photoFile: "file",
      photoId: "photoId",
      userUid: "userUid",
    });

    expect(addPhotoWorkerReq).toHaveBeenCalledTimes(1);
    expect(addPhotoWorkerReq).toHaveBeenNthCalledWith(1, {
      description: "super puper",
      tags: { wer: true, werr: true },
    });

    expect(onError).toHaveBeenCalledTimes(0);
    expect(onSuccess).toHaveBeenCalledTimes(1);
    //expect(onSuccess).toHaveBeenNthCalledWith(1, data);
  });

  test("We got error on request", async () => {
    let data = { ...initData };
    addPhotoFirestoreReq.mockRejectedValueOnce("Super firestore error...");

    const request = request_(
      makeAddPhotoData,
      addPhotoFirestoreReq,
      makeAddPhotoWorkerData,
      addPhotoWorkerReq,
      onSuccess,
      onError
    );

    await request(data as any);

    //expect(setState).toHaveBeenCalledTimes(1);

    expect(dispatch).toHaveBeenCalledTimes(1);

    expect(setState).toHaveBeenCalledTimes(1);
    expect(state).toEqual({ isFormSubmited: true, uploadLoading: true });

    expect(makeAddPhotoData).toHaveBeenCalledTimes(1);
    expect(makeAddPhotoData).toHaveBeenNthCalledWith(
      1,
      { photoFile: [{ name: "photo.jpg" }] },
      "userUid",
      "photoId"
    );

    expect(makeAddPhotoWorkerData).toHaveBeenCalledTimes(0);

    expect(addPhotoFirestoreReq).toHaveBeenCalledTimes(1);

    expect(addPhotoWorkerReq).toHaveBeenCalledTimes(0);

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onSuccess).toHaveBeenCalledTimes(0);
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

    onError_(batch)(dispatch, setState, "hello.png");

    expect(batch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(setState).toHaveBeenCalledTimes(1);

    expect(state).toEqual({
      isEndReq: true,
      prev: "value",
      uploadLoading: false,
    });
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: "ADD_PHOTO_REQUEST_ERROR",
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      alertType: "error",
      message: "К сожалению, мы не смогли сохранить фото - hello.png",
      type: "SHOW_ALERT",
    });
  });
});

describe("onSuccess - we notify local state and send getAddedPhotoReq", () => {
  const getAddedPhotoReq = jest.fn();
  const batch = jest.fn(mockBatch);
  const setState = jest.fn(mockSetState);
  const dispatch = jest.fn();

  let photoName = "bye-123.png";
  let photoId = "photoId123";

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

  test("we notify local state and send getAddedPhotoReq", () => {
    setInitState({ prev: "value" });

    onSuccess_(getAddedPhotoReq)(dispatch, setState, photoName, photoId);

    expect(batch).toHaveBeenCalledTimes(0);
    expect(dispatch).toHaveBeenCalledTimes(0);
    expect(setState).toHaveBeenCalledTimes(1);

    expect(state).toEqual({
      //isEndReq: false,
      prev: "value",
      uploadLoading: false,
      formWasClosed: true,
      showForm: false,
    });
    //expect(dispatch).toHaveBeenNthCalledWith(1, "helo");
    //expect(dispatch).toHaveBeenNthCalledWith(2, "helo");

    expect(getAddedPhotoReq).toHaveBeenCalledTimes(1);
    expect(getAddedPhotoReq).toHaveBeenNthCalledWith(
      1,
      "photoId123",
      "bye-123.png",
      dispatch,
      setState
    );
  });
});
