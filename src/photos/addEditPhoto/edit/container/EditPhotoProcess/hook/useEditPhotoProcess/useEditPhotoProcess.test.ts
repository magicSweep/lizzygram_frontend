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

  const cleanUpOnSuccessEdit = jest.fn();

  const dispatch = jest.fn();

  const main = main_(
    batch,
    stateAC as any,
    editPhotoAC as any,
    showAlertAC as any,
    dataAdapter as any,
    requests as any,
    cleanUp,
    getToken as any,
    cleanUpOnError,
    cleanUpOnSuccessEdit
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

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("", async () => {
    await main(props as any);

    expect(stateAC.editPhotoRequestSendAC).toHaveBeenCalledTimes(1);

    expect(processLifeCycle.onReqSuccess).toHaveBeenCalledTimes(1);
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
