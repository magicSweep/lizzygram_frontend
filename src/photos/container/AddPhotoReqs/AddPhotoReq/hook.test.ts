//import { sortBy } from "lodash-es";
import { Next, Done, then, map, chain, _catch } from "fmagic";
import wait from "waait";
import {
  addPhoto as addPhotoFirestoreReq,
  getPhotoById,
} from "../../../service/DbService";
import { addPhoto as addPhotoWorkerReq } from "../../../service/WorkerService";
import { firestoreReq, request } from "./hook";
import { batch } from "react-redux";

//@ts-ignore
global.FileList = class {
  length = 1;

  0 = {
    size: 120034,
    type: "image/jpeg",
    name: "hello.jpg",
  };
};

jest.mock("react-redux", () => ({
  __esModule: true,
  batch: (callback: any) => callback(),
}));

jest.mock("../../../service/DbService", () => ({
  __esModule: true,
  addPhoto: jest.fn(),
  getPhotoById: jest.fn(),
}));

jest.mock("../../../service/WorkerService", () => ({
  __esModule: true,
  addPhoto: jest.fn(),
}));

export const formData = {
  desc: "Go to hell...",
  date: "2019-05-06",
  tags: {
    hello: true,
    bye: false,
  },
  photoFile: new FileList(),
};

let state: any = {};

const dispatch = jest.fn();
const setState = jest.fn((callback: any) => (state = callback(state)));

describe("useAddPhotoReq", () => {
  afterEach(() => {
    state = {};

    dispatch.mockClear();
    setState.mockClear();
  });

  describe("request", () => {
    test("We successfully add photo", async () => {
      (addPhotoFirestoreReq as jest.Mock).mockResolvedValue("hello");
      (addPhotoWorkerReq as jest.Mock).mockResolvedValue({
        status: "success",
      });

      (getPhotoById as jest.Mock).mockResolvedValueOnce("added_photo");

      request(dispatch, setState, "userUid", "photoId", formData)();

      await wait(2000);

      // ADD PHOTO FIRESTORE REQUEST
      expect(addPhotoFirestoreReq).toHaveBeenCalledTimes(1);
      /* expect(addPhotoFirestoreReq).toHaveBeenNthCalledWith(1, {
        _timestamp: "2021-08-28T00:49:24.097Z",
        addedByUserUID: "userUid",
        date: "2019-05-06T00:00:00.000Z",
        description: "Go to hell...",
        id: "photoId",
        isActive: false,
        tags: { hello: true },
        yearsOld: 0,
      }); */

      // ADD PHOTO WORKER REQUEST
      expect(addPhotoWorkerReq).toHaveBeenCalledTimes(1);
      expect(addPhotoWorkerReq).toHaveBeenNthCalledWith(1, {
        file: { name: "hello.jpg", size: 120034, type: "image/jpeg" },
        id: "photoId",
        userUid: "userUid",
      });

      // DISPATCH
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: "ADD_PHOTO_REQUEST_SEND",
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: "GET_ADDED_PHOTO_REQUEST_SUCCESS",
        photo: "added_photo",
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, {
        alertType: "success",
        message: "Фото успешно добавлено - hello.jpg",
        type: "SHOW_ALERT",
      });

      // SET STATE
      expect(setState).toHaveBeenCalledTimes(3);

      expect(state).toEqual({
        end: true,
        uploadLoading: false,
        formWasClosed: true,
        showForm: false,
      });

      // GET ADDED PHOTO REQUEST
      expect(getPhotoById).toHaveBeenCalledTimes(1);
      expect(getPhotoById).toHaveBeenNthCalledWith(1, "photoId");
    });

    describe("Possibel errors", () => {
      test(`If we got error on request - we dispatch error`, async () => {
        (addPhotoFirestoreReq as jest.Mock).mockRejectedValueOnce("fat error");
        (addPhotoWorkerReq as jest.Mock).mockResolvedValue({
          status: "success",
        });

        (getPhotoById as jest.Mock).mockResolvedValueOnce("added_photo");

        const start = request(
          dispatch,
          setState,
          "userUid",
          "photoId",
          formData
        );

        start();

        await wait(1000);

        expect(addPhotoFirestoreReq).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: "ADD_PHOTO_REQUEST_SEND",
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: "ADD_PHOTO_REQUEST_ERROR",
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          alertType: "error",
          message: "К сожалению, мы не смогли сохранить фото - hello.jpg",
          type: "SHOW_ALERT",
        });

        /* expect(dispatch).toHaveBeenNthCalledWith(2, {
          photoId: "12334324243558",
          type: "EDIT_PHOTO_REQUEST_ERROR",
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          alertType: "error",
          message: "К сожалению, мы не смогли сохранить изменения",
          type: "SHOW_ALERT",
        }); */

        expect(addPhotoWorkerReq).toHaveBeenCalledTimes(0);

        expect(state).toEqual({
          end: true,
          uploadLoading: false,
          //formWasClosed: true,
          //showForm: false,
        });

        expect(getPhotoById).toHaveBeenCalledTimes(0);
      });

      test.only(`If we got error in request message - we dispatch error`, async () => {
        (addPhotoFirestoreReq as jest.Mock).mockResolvedValue("boom");
        (addPhotoWorkerReq as jest.Mock).mockResolvedValue({
          status: "error",
        });

        (getPhotoById as jest.Mock).mockResolvedValueOnce("added_photo");

        const start = request(
          dispatch,
          setState,
          "userUid",
          "photoId",
          formData
        );

        start();

        await wait(1000);

        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: "ADD_PHOTO_REQUEST_SEND",
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: "ADD_PHOTO_REQUEST_ERROR",
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          alertType: "error",
          message: "К сожалению, мы не смогли сохранить фото - hello.jpg",
          type: "SHOW_ALERT",
        });

        expect(addPhotoFirestoreReq).toHaveBeenCalledTimes(1);

        expect(addPhotoWorkerReq).toHaveBeenCalledTimes(1);

        expect(state).toEqual({
          end: true,
          uploadLoading: false,
          //formWasClosed: true,
          //showForm: false,
        });

        expect(getPhotoById).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe("firestoreReq", () => {
    test("It must return request value", async () => {
      (addPhotoFirestoreReq as jest.Mock).mockResolvedValue("hello");

      const sendFirestoreReq = firestoreReq(
        dispatch,
        setState,
        formData,
        "user-uid",
        "photoId"
      );

      const res = await sendFirestoreReq();

      //expect(res instanceof Promise).toEqual(true);

      //expect(addPhotoFirestoreReq).toHaveBeenLastCalledWith("h");

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(setState).toHaveBeenCalledTimes(1);

      expect(res).toEqual("hello");
    });

    test("On request error it's not catch error", async () => {
      (addPhotoFirestoreReq as jest.Mock).mockRejectedValue("hell");

      try {
        const sendFirestoreReq = firestoreReq(
          dispatch,
          setState,
          formData,
          "user-uid",
          "photoId"
        );

        const res = await sendFirestoreReq();

        expect(false).toEqual(true);
      } catch (e) {
        expect(e).toEqual("hell");
      }
    });
  });
});
