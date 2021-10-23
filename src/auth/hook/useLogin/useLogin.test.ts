import wait from "waait";
import { request, getIsRequested } from ".";
import { login } from "../../service/AuthService";

jest.mock("../../service/AuthService", () => ({
  __esModule: true,
  login: jest.fn(),
}));

global.console.error = jest.fn();

describe("useLogin", () => {
  const dispatch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("request", () => {
    test("If all ok", async () => {
      (login as jest.Mock).mockResolvedValueOnce(true);

      const startNew = request(dispatch);

      // @ts-ignore
      startNew();

      expect(getIsRequested()).toEqual(true);

      await wait(500);

      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, { type: "LOGIN_REQUEST" });

      /*  expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: "LOGIN_REQUEST_SUCCESS",
      }); */

      expect(login).toHaveBeenCalledTimes(1);

      expect(getIsRequested()).toEqual(false);
    });

    test("If error on request", async () => {
      (login as jest.Mock).mockRejectedValueOnce("Bad fat error");

      const startNew = request(dispatch);

      // @ts-ignore
      startNew();

      expect(getIsRequested()).toEqual(true);

      await wait(500);

      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, { type: "LOGIN_REQUEST" });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: "LOGIN_REQUEST_ERROR",
      });

      expect(login).toHaveBeenCalledTimes(1);

      expect(getIsRequested()).toEqual(false);
    });
  });
});
