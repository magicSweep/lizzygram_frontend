import { getUser as getSavedUser, saveUser } from "../../service/UserService";
import { request, isRequested, isGoodPrevUser } from ".";
import { isEditor } from "../../service/DbService";
import wait from "waait";

jest.mock("../../service/UserService", () => ({
  __esModule: true,
  saveUser: jest.fn(),
  getUser: jest.fn(),
}));

jest.mock("../../service/DbService", () => ({
  __esModule: true,
  isEditor: jest.fn(),
}));

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

  describe("request", () => {
    test("If user undefined we do nothing", () => {
      const startNew = request(dispatch);

      startNew(null);

      expect(dispatch).toHaveBeenCalledTimes(0);
      expect(getSavedUser).toHaveBeenCalledTimes(0);
      expect(isEditor).toHaveBeenCalledTimes(0);
      expect(isRequested).toEqual(false);
    });

    test("If user's field isEditor has value true or false - we do nothing", () => {
      const startNew = request(dispatch);

      startNew(user);

      expect(dispatch).toHaveBeenCalledTimes(0);
      expect(getSavedUser).toHaveBeenCalledTimes(0);
      expect(isEditor).toHaveBeenCalledTimes(0);
      expect(isRequested).toEqual(false);
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

      const startNew = request(dispatch);

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
      expect(isRequested).toEqual(false);
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

      (isEditor as jest.Mock).mockResolvedValueOnce({
        ...user,
        isEditor: false,
      });

      const startNew = request(dispatch);

      startNew(newUser);

      expect(isRequested).toEqual(true);

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
      expect(isEditor).toHaveBeenNthCalledWith(1, newUser);

      expect(saveUser).toHaveBeenNthCalledWith(1, {
        ...user,
        isEditor: false,
      });

      expect(isRequested).toEqual(false);
    });
  });
});
