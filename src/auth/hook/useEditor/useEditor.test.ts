//import { getUser as getSavedUser, saveUser } from "../../service/UserService";
import {
  main_,
  isReqLoading,
  setIsReqLoading,
  getIsReqLoading,
  isValidSavedUser,
} from ".";
//import { isEditor } from "../../service/DbService";
import wait from "waait";
import { authAC } from "../../store/action";

/* jest.mock("../../service/UserService", () => ({
  __esModule: true,
  saveUser: jest.fn(),
  getUser: jest.fn(),
}));

jest.mock("../../service/DbService", () => ({
  __esModule: true,
  isEditor: jest.fn(),
})); */

const saveUser = jest.fn();
const getUser = jest.fn();

const isEditor = jest.fn();

const batch = jest.fn((callback) => callback());

const getSavedUser = jest.fn();

describe("useEditor", () => {
  const dispatch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const user = {
    name: "Mammy",
    email: "m@main.blue",
    uid: "uid",
    isEditor: false,
  };

  /* test("isGoodPrevUser", () => {
    isGoodPrevUser();
  }) */

  const main = main_(
    batch,
    isValidSavedUser,
    setIsReqLoading,
    getIsReqLoading,
    isEditor,
    getSavedUser,
    saveUser
  );

  describe("useEditor - main function", () => {
    test("If user undefined we do nothing", () => {
      const startNew = main(dispatch);

      startNew(null);

      expect(dispatch).toHaveBeenCalledTimes(0);
      expect(getSavedUser).toHaveBeenCalledTimes(0);
      expect(isEditor).toHaveBeenCalledTimes(0);
      expect(isReqLoading).toEqual(false);
    });

    test("If user's field isEditor has value true or false - we do nothing", () => {
      const startNew = main(dispatch);

      startNew(user);

      expect(dispatch).toHaveBeenCalledTimes(0);
      expect(getSavedUser).toHaveBeenCalledTimes(0);
      expect(isEditor).toHaveBeenCalledTimes(0);
      expect(isReqLoading).toEqual(false);
    });

    test("If we get saved user we use info from it", () => {
      const newUser = {
        ...user,
        isEditor: undefined,
      };

      (getSavedUser as jest.Mock).mockReturnValueOnce({
        ...user,
        isEditor: true,
      });

      const startNew = main(dispatch);

      startNew(newUser);

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(getSavedUser).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: "AUTH",
        user: {
          ...user,
          isEditor: true,
        },
      });

      expect(isEditor).toHaveBeenCalledTimes(0);
      expect(isReqLoading).toEqual(false);
    });

    test("If we do not have saved user(or it's user with diff uid) we send isEditor request", async () => {
      const newUser = {
        ...user,
        isEditor: undefined,
      };

      (getSavedUser as jest.Mock).mockReturnValueOnce({
        ...user,
        uid: "diff_uid",
        isEditor: true,
      });

      (isEditor as jest.Mock).mockResolvedValueOnce(false);

      const startNew = main(dispatch);

      startNew(newUser);

      expect(isReqLoading).toEqual(true);

      await wait(500);

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(getSavedUser).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: "AUTH",
        user: {
          ...user,
          isEditor: false,
        },
      });

      expect(isEditor).toHaveBeenCalledTimes(1);
      expect(isEditor).toHaveBeenNthCalledWith(1, newUser.uid);

      expect(saveUser).toHaveBeenNthCalledWith(1, {
        ...user,
        isEditor: false,
      });

      expect(isReqLoading).toEqual(false);
    });

    test("If we send isEditor request and get error", async () => {
      const newUser = {
        ...user,
        isEditor: undefined,
      };

      (getSavedUser as jest.Mock).mockReturnValueOnce({
        ...user,
        uid: "diff_uid",
        isEditor: true,
      });

      (isEditor as jest.Mock).mockRejectedValueOnce("Bad error");

      const startNew = main(dispatch);

      startNew(newUser);

      expect(isReqLoading).toEqual(true);

      await wait(500);

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(getSavedUser).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        alertType: "error",
        message:
          "Произошла ошибка при идентификации вашего аккаунта, некоторый функции могут быть недоступны.",
        type: "SHOW_ALERT",
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: "AUTH_EDITOR_ERROR",
      });

      expect(isEditor).toHaveBeenCalledTimes(1);
      expect(isEditor).toHaveBeenNthCalledWith(1, newUser.uid);

      expect(saveUser).toHaveBeenCalledTimes(0);

      expect(isReqLoading).toEqual(false);
    });
  });
});
