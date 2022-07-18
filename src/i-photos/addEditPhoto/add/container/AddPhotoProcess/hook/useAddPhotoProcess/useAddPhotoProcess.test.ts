import { main_ } from ".";

describe("useAddPhotoProcess", () => {
  const batch = jest.fn((callback) => callback());
  const stateAC = {
    addPhotoRequestSendAC: jest.fn(() => "addPhotoRequestSendAC"),
    //addPhotoRequestEndAC: typeof addPhotoRequestEndAC;
    addPhotoRequestErrorAC: jest.fn(() => "addPhotoRequestErrorAC"),
    addPhotoRequestSuccessAC: jest.fn(() => "addPhotoRequestSuccessAC"),
    //addPhotoRequestStartAC: typeof addPhotoRequestStartAC;
  };

  const addPhotoAC = jest.fn(() => "addPhotoAC");
  const showAlertAC = jest.fn(() => "showAlertAC");
  const dataAdapter = {
    makeWorkerReqData: jest.fn(() => "worker-req-data"),
    makeFirestoreReqData: jest.fn(() => "firestore-req-data"),
  };
  const requests = {
    workerReq: jest.fn(() => Promise.resolve()),
    firestoreReq: jest.fn(() => Promise.resolve()),
    cleanUpReq: jest.fn(() => Promise.resolve()),
  };
  const cleanUp = {
    isNeedReq: jest.fn(() => true),
    cleanUpReq: jest.fn(),
    saveNewCleanUpDate: jest.fn(),
  };
  const getToken = jest.fn(() => "super-puper-token");

  const cleanUpOnError = jest.fn();

  const dispatch = jest.fn();

  const useAddPhotoProcess = main_(
    batch,
    stateAC as any,
    addPhotoAC as any,
    showAlertAC as any,
    dataAdapter as any,
    requests as any,
    cleanUp,
    getToken as any,
    cleanUpOnError
  );

  const processLifeCycle = {
    onSendReq: jest.fn(),
    onReqError: jest.fn(),
    onReqSuccess: jest.fn(),
  };

  const props = {
    dispatch,
    photoId: "photoId",
    userUid: "userUid",
    formData: {
      photoFile: [{ name: "hello.jpg" }],
    },
    processLifeCycle,
  };

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("", async () => {
    await useAddPhotoProcess(props as any);

    expect(stateAC.addPhotoRequestSendAC).toHaveBeenCalledTimes(1);

    expect(processLifeCycle.onReqSuccess).toHaveBeenCalledTimes(1);
  });

  /*  test("If error in non-async function", async () => {
    dataAdapter.makeWorkerReqData.mockRejectedValueOnce(
      "Bad fat error" as never
    );

    await useAddPhotoProcess(props as any);

    expect(stateAC.addPhotoRequestSendAC).toHaveBeenCalledTimes(1);

    expect(processLifeCycle.onReqSuccess).toHaveBeenCalledTimes(0);
  }); */
});
