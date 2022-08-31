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
    mainWorkerReq: jest.fn(() => Promise.resolve("MainWorkerRequestData")),
    firestoreReq: jest.fn(() => Promise.resolve()),
    cleanUpWorkerReq: jest.fn(() => Promise.resolve()),
  };
  /*  const cleanUp = {
    isNeedReq: jest.fn(() => true),
    cleanUpReq: jest.fn(),
    saveNewCleanUpDate: jest.fn(),
  }; */
  const getToken = jest.fn(() => "super-puper-token");

  // const cleanUpOnError = jest.fn();

  const dispatch = jest.fn();

  const useAddPhotoProcess = main_(
    batch,
    stateAC as any,
    addPhotoAC as any,
    showAlertAC as any,
    dataAdapter as any,
    requests as any,
    //cleanUp,
    getToken as any
    //cleanUpOnError
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("If all okey - we send req to worker, then to firestore - show success alert, add new photo to state", async () => {
    await useAddPhotoProcess(props as any);

    expect(stateAC.addPhotoRequestSendAC).toHaveBeenCalledTimes(1);

    //processLifeCycle.onSendReq
    expect(processLifeCycle.onSendReq).toHaveBeenCalledTimes(1);

    //dataAdapter.makeWorkerReqData
    expect(dataAdapter.makeWorkerReqData).toHaveBeenCalledTimes(1);

    expect(getToken).toHaveBeenCalledTimes(1);

    //requests.mainWorkerReq
    expect(requests.mainWorkerReq).toHaveBeenCalledTimes(1);
    //dataAdapter.makeFirestoreReqData
    expect(dataAdapter.makeFirestoreReqData).toHaveBeenCalledTimes(1);
    //requests.firestoreReq
    expect(requests.firestoreReq).toHaveBeenCalledTimes(1);

    //showAlertAC
    expect(showAlertAC).toHaveBeenCalledTimes(1);
    //stateAC.addPhotoRequestSuccessAC
    expect(stateAC.addPhotoRequestSuccessAC).toHaveBeenCalledTimes(1);
    //addPhotoAC
    expect(addPhotoAC).toHaveBeenCalledTimes(1);
    //processLifeCycle.onReqSuccess
    expect(processLifeCycle.onReqSuccess).toHaveBeenCalledTimes(1);
  });

  test("If we get error on firestore req, we send cleanup req to worker", async () => {
    requests.firestoreReq.mockRejectedValueOnce("Bad fat firestore error");

    await useAddPhotoProcess(props as any);

    expect(stateAC.addPhotoRequestSendAC).toHaveBeenCalledTimes(1);

    //processLifeCycle.onSendReq
    expect(processLifeCycle.onSendReq).toHaveBeenCalledTimes(1);

    //dataAdapter.makeWorkerReqData
    expect(dataAdapter.makeWorkerReqData).toHaveBeenCalledTimes(1);

    expect(getToken).toHaveBeenCalledTimes(1);

    //requests.mainWorkerReq
    expect(requests.mainWorkerReq).toHaveBeenCalledTimes(1);
    //dataAdapter.makeFirestoreReqData
    expect(dataAdapter.makeFirestoreReqData).toHaveBeenCalledTimes(1);
    //requests.firestoreReq
    expect(requests.firestoreReq).toHaveBeenCalledTimes(1);

    //showAlertAC
    expect(showAlertAC).toHaveBeenCalledTimes(1);
    //stateAC.addPhotoRequestSuccessAC
    expect(stateAC.addPhotoRequestErrorAC).toHaveBeenCalledTimes(1);
    //addPhotoAC
    expect(addPhotoAC).toHaveBeenCalledTimes(0);
    //processLifeCycle.onReqSuccess
    expect(processLifeCycle.onReqError).toHaveBeenCalledTimes(1);

    expect(dataAdapter.makeWorkerReqData).toHaveBeenCalledTimes(1);

    expect(requests.cleanUpWorkerReq).toHaveBeenCalledTimes(1);

    expect(processLifeCycle.onReqError).toHaveBeenCalledTimes(1);
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
