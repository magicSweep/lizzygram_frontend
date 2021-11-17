import { flow, sortBy } from "lodash-es";
import { Next, Done, then, map, chain, _catch } from "fmagic";
import wait from "waait";
import {
  editPhoto as editPhotoFirestoreReq,
  getPhotoById,
} from "../../../service/DbService";
import { editPhoto as editPhotoWorkerReq } from "../../../service/WorkerService";
import { request } from "./hook";
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
  editPhoto: jest.fn(),
  getPhotoById: jest.fn(),
}));

jest.mock("../../../service/WorkerService", () => ({
  __esModule: true,
  editPhoto: jest.fn(),
}));

export const formData = {
  desc: "Go to hell...",
  date: "2019-05-06",
  tags: {
    hello: true,
    bye: false,
  },
  photoFile: undefined,
  //photoFile: new FileList(),
};

export const photo: any = {
  id: "12334324243558",
  description: "Go to hell...",
  date: {
    toDate: () => new Date("2019-05-06"),
  },
  tags: {
    hello: true,
    bye: false,
  },
};

const userUid = "userUid";
let isNeedWorkerReq = false;

const searchState: any = {
  age: -1,
  tags: undefined,
  //tags: { by: true, three: true, your: true },
};
const mainRef: any = {
  current: {
    formData: undefined,
    isSubmited: false,
  },
};

let state: any = {};

const dispatch = jest.fn();
const setState = jest.fn((callback: any) => (state = callback(state)));

describe("useEditPhotoReq", () => {
  afterEach(() => {
    state = {};

    jest.clearAllMocks();
  });

  describe("request", () => {
    test("If we don't make changes with form - we show nothing changed message and do nothing", () => {
      isNeedWorkerReq = false;

      const start = request(
        dispatch,
        setState,
        formData,
        userUid,
        isNeedWorkerReq,
        photo.id,
        searchState,
        mainRef,
        photo
      );

      start();

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        alertType: "error",
        message: "Вы ничего не изменили.",
        type: "SHOW_ALERT",
      });

      //editPhotoFirestoreReq
      expect(editPhotoFirestoreReq).toHaveBeenCalledTimes(0);
      expect(editPhotoWorkerReq).toHaveBeenCalledTimes(0);
    });

    test(`If we don't add photo file we only send request to firestore - 
        - if photo after changes still in search terms, we send additional request to firestore,
        to get new photo.
    `, async () => {
      let iphoto: any = {
        ...photo,
        description: "Go to magazine...",
        date: {
          toDate: () => new Date("2020-05-06"),
        },
        tags: {
          hello: false,
          bye: true,
        },
      };

      isNeedWorkerReq = false;

      (editPhotoFirestoreReq as jest.Mock).mockResolvedValueOnce(true);
      (getPhotoById as jest.Mock).mockResolvedValueOnce("edited photo");

      const start = request(
        dispatch,
        setState,
        formData,
        userUid,
        isNeedWorkerReq,
        iphoto.id,
        searchState,
        mainRef,
        iphoto
      );

      start();

      await wait(1000);

      expect(mainRef.current).toEqual({
        isSubmited: true,
        formData,
      });

      expect(editPhotoFirestoreReq).toHaveBeenCalledTimes(1);
      /*  expect(editPhotoFirestoreReq).toHaveBeenNthCalledWith(1, {
        fieldsToUpdate: {
          date: "2019-05-06T00:00:00.000Z",
          description: "Go to hell...",
          tags: { hello: true },
        },
        photoId: "12334324243558",
      }); */

      expect(getPhotoById).toHaveBeenCalledTimes(1);
      expect(getPhotoById).toHaveBeenNthCalledWith(1, iphoto.id);

      expect(setState).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenCalledTimes(3);

      /*  expect(dispatch).toHaveBeenNthCalledWith(1, "h");

      expect(dispatch).toHaveBeenNthCalledWith(2, "hhh");

      expect(dispatch).toHaveBeenNthCalledWith(3, "h12"); */

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        photoId: "12334324243558",
        type: "EDIT_PHOTO_REQUEST_SEND",
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        photoOrId: "edited photo",
        type: "EDIT_PHOTO_REQUEST_SUCCESS",
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, {
        alertType: "success",
        message: "Фото успешно изменено.",
        type: "SHOW_ALERT",
      });

      expect(editPhotoWorkerReq).toHaveBeenCalledTimes(0);

      expect(state).toEqual({
        end: true,
        uploadLoading: false,
        formWasClosed: true,
        showForm: false,
      });

      // GET ADDED PHOTO REQUEST
      expect(getPhotoById).toHaveBeenCalledTimes(1);
      expect(getPhotoById).toHaveBeenNthCalledWith(1, "12334324243558");
    });

    test(`If we don't add photo file we only send request to firestore - 
        - if photo after changes not in search terms, we remove it from photos state
    `, async () => {
      let iphoto: any = {
        ...photo,
        description: "Go to magazine...",
        date: {
          toDate: () => new Date("2020-05-06"),
        },
        tags: {
          hello: false,
          bye: true,
        },
      };

      let iSearchState: any = {
        ...searchState,
        age: 2,
      };

      isNeedWorkerReq = false;

      (editPhotoFirestoreReq as jest.Mock).mockResolvedValueOnce(true);
      (getPhotoById as jest.Mock).mockResolvedValueOnce("edited photo");

      const start = request(
        dispatch,
        setState,
        formData,
        userUid,
        isNeedWorkerReq,
        iphoto.id,
        iSearchState,
        mainRef,
        iphoto
      );

      start();

      await wait(1000);

      expect(getPhotoById).toHaveBeenCalledTimes(0);

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        photoOrId: iphoto.id,
        type: "EDIT_PHOTO_REQUEST_SUCCESS",
      });

      expect(editPhotoWorkerReq).toHaveBeenCalledTimes(0);
    });

    test(`If we add photo file we send request to worker`, async () => {
      let iphoto: any = {
        ...photo,
        description: "Go to magazine...",
        date: {
          toDate: () => new Date("2020-05-06"),
        },
        tags: {
          hello: false,
          bye: true,
        },
      };

      let iFormData = {
        ...formData,
        photoFile: new FileList(),
      };

      isNeedWorkerReq = true;

      (editPhotoWorkerReq as jest.Mock).mockResolvedValueOnce(true);
      (getPhotoById as jest.Mock).mockResolvedValueOnce("edited photo");

      const start = request(
        dispatch,
        setState,
        iFormData,
        userUid,
        isNeedWorkerReq,
        iphoto.id,
        searchState,
        mainRef,
        iphoto
      );

      start();

      await wait(1000);

      expect(mainRef.current).toEqual({
        isSubmited: true,
        formData: iFormData,
      });

      expect(editPhotoWorkerReq).toHaveBeenCalledTimes(1);
      /*  expect(editPhotoWorkerReq).toHaveBeenNthCalledWith(1, {
        date: "2019-05-06T00:00:00.000Z",
        description: "Go to hell...",
        file: { name: "hello.jpg", size: 120034, type: "image/jpeg" },
        photoId: "12334324243558",
        tags: { hello: true },
        userUid: "userUid",
      });  */

      expect(getPhotoById).toHaveBeenCalledTimes(1);
      expect(getPhotoById).toHaveBeenNthCalledWith(1, iphoto.id);

      expect(setState).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        photoId: "12334324243558",
        type: "EDIT_PHOTO_REQUEST_SEND",
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        photoOrId: "edited photo",
        type: "EDIT_PHOTO_REQUEST_SUCCESS",
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, {
        alertType: "success",
        message: "Фото успешно изменено.",
        type: "SHOW_ALERT",
      });

      expect(editPhotoFirestoreReq).toHaveBeenCalledTimes(0);

      expect(state).toEqual({
        end: true,
        uploadLoading: false,
        formWasClosed: true,
        showForm: false,
      });

      // GET ADDED PHOTO REQUEST
      expect(getPhotoById).toHaveBeenCalledTimes(1);
      expect(getPhotoById).toHaveBeenNthCalledWith(1, "12334324243558");
    });

    describe("Possibel errors", () => {
      let iphoto: any = {
        ...photo,
        description: "Go to magazine...",
        date: {
          toDate: () => new Date("2020-05-06"),
        },
        tags: {
          hello: false,
          bye: true,
        },
      };

      let iFormData = {
        ...formData,
        photoFile: new FileList(),
      };

      isNeedWorkerReq = true;

      test(`If we got error on request - we dispatch error`, async () => {
        (editPhotoWorkerReq as jest.Mock).mockRejectedValueOnce("fat errror");
        //(getPhotoById as jest.Mock).mockResolvedValueOnce("edited photo");

        const start = request(
          dispatch,
          setState,
          iFormData,
          userUid,
          isNeedWorkerReq,
          iphoto.id,
          searchState,
          mainRef,
          iphoto
        );

        start();

        await wait(1000);

        expect(editPhotoWorkerReq).toHaveBeenCalledTimes(1);

        expect(getPhotoById).toHaveBeenCalledTimes(0);

        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          photoId: "12334324243558",
          type: "EDIT_PHOTO_REQUEST_SEND",
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          photoId: "12334324243558",
          type: "EDIT_PHOTO_REQUEST_ERROR",
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          alertType: "error",
          message: "К сожалению, мы не смогли сохранить изменения",
          type: "SHOW_ALERT",
        });

        expect(editPhotoFirestoreReq).toHaveBeenCalledTimes(0);

        expect(state).toEqual({
          end: true,
          uploadLoading: false,
          //formWasClosed: true,
          //showForm: false,
        });

        expect(getPhotoById).toHaveBeenCalledTimes(0);
      });

      test(`If we got error in request message - we dispatch error`, async () => {
        (editPhotoWorkerReq as jest.Mock).mockResolvedValueOnce({
          status: "error",
        });
        //(getPhotoById as jest.Mock).mockResolvedValueOnce("edited photo");

        const start = request(
          dispatch,
          setState,
          iFormData,
          userUid,
          isNeedWorkerReq,
          iphoto.id,
          searchState,
          mainRef,
          iphoto
        );

        start();

        await wait(1000);

        expect(editPhotoWorkerReq).toHaveBeenCalledTimes(1);

        expect(getPhotoById).toHaveBeenCalledTimes(0);

        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          photoId: "12334324243558",
          type: "EDIT_PHOTO_REQUEST_SEND",
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          photoId: "12334324243558",
          type: "EDIT_PHOTO_REQUEST_ERROR",
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          alertType: "error",
          message: "К сожалению, мы не смогли сохранить изменения",
          type: "SHOW_ALERT",
        });

        expect(editPhotoFirestoreReq).toHaveBeenCalledTimes(0);

        expect(editPhotoFirestoreReq).toHaveBeenCalledTimes(0);

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
});
