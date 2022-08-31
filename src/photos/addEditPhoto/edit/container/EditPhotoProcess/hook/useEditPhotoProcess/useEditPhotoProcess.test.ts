import { main_ } from ".";

describe("useEditPhotoProcess", () => {
  const batch = jest.fn((callback) => callback());
  const stateAC = {
    editPhotoRequestSendAC: jest.fn(() => "editPhotoRequestSendAC"),
    editPhotoRequestErrorAC: jest.fn(() => "editPhotoRequestErrorAC"),
    editPhotoRequestSuccessAC: jest.fn(() => "editPhotoRequestSuccessAC"),
  };

  const editPhotoAC = jest.fn(() => "editPhotoAC");
  const showAlertAC = jest.fn(() => "showAlertAC");
  const dataAdapter = {
    makeFieldsToUpdate: jest.fn(() => "fields-to-update"),
    isNeedFirestoreReq: jest.fn(() => true),
    isNeedWorkerReq: jest.fn(() => true),
    makeWorkerReqData: jest.fn(() => "worker-req-data"),
    makeFirestoreReqData: jest.fn(() => ({
      fieldsToUpdate: {
        date: new Date(),
      },
    })),
  };
  const requests = {
    mainWorkerReq: jest.fn(() => Promise.resolve("MainWorkerReq")),
    firestoreReq: jest.fn(() => Promise.resolve()),
    cleanUpWorkerReq: jest.fn(() => Promise.resolve()),
  };
  const cleanUp = {
    isNeedReq: jest.fn(() => true),
    cleanUpReq: jest.fn(),
    saveNewCleanUpDate: jest.fn(),
  };
  const getToken = jest.fn(() => "super-puper-token");

  //const cleanUpOnError = jest.fn();

  //const cleanUpOnSuccessEdit = jest.fn();

  const dispatch = jest.fn();

  const main = main_(
    batch,
    stateAC as any,
    editPhotoAC as any,
    showAlertAC as any,
    dataAdapter as any,
    requests as any,
    //cleanUp,
    getToken as any
    //cleanUpOnError,
    //cleanUpOnSuccessEdit
  );

  const processLifeCycle = {
    onSendReq: jest.fn(),
    onReqError: jest.fn(),
    onReqSuccess: jest.fn(),
  };

  const props = {
    dispatch,
    photoId: "photoId",
    currPhoto: "currPhoto",
    formData: {
      photoFile: [{ name: "hello.jpg" }],
    },
    processLifeCycle,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("If all okey - we send req to worker, then to firestore - show success alert, add edited photo to state, send clean up req for old photo cloudinaries and google drive", async () => {
    await main(props as any);

    expect(stateAC.editPhotoRequestSendAC).toHaveBeenCalledTimes(1);

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
    expect(stateAC.editPhotoRequestSuccessAC).toHaveBeenCalledTimes(1);
    //addPhotoAC
    expect(editPhotoAC).toHaveBeenCalledTimes(1);
    //processLifeCycle.onReqSuccess
    expect(processLifeCycle.onReqSuccess).toHaveBeenCalledTimes(1);

    expect(requests.cleanUpWorkerReq).toHaveBeenCalledTimes(1);
  });

  test("If we get error on firestore req, we send cleanup req to worker", async () => {
    requests.firestoreReq.mockRejectedValueOnce("Bad fat firestore error");

    await main(props as any);

    expect(stateAC.editPhotoRequestSendAC).toHaveBeenCalledTimes(1);

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
    expect(stateAC.editPhotoRequestErrorAC).toHaveBeenCalledTimes(1);
    //addPhotoAC
    expect(editPhotoAC).toHaveBeenCalledTimes(0);
    //processLifeCycle.onReqSuccess
    expect(processLifeCycle.onReqError).toHaveBeenCalledTimes(1);

    expect(dataAdapter.makeWorkerReqData).toHaveBeenCalledTimes(1);

    expect(requests.cleanUpWorkerReq).toHaveBeenCalledTimes(1);

    expect(processLifeCycle.onReqError).toHaveBeenCalledTimes(1);
  });

  /*  test("If error in non-async function", async () => {
    dataAdapter.makeFieldsToUpdate.mockRejectedValueOnce(
      "Bad fat error" as never
    );

    await main(props as any);

    expect(stateAC.editPhotoRequestSendAC).toHaveBeenCalledTimes(1);

    expect(processLifeCycle.onReqSuccess).toHaveBeenCalledTimes(0);
  }); */
});
