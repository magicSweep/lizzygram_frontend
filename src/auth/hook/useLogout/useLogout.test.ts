import wait from "waait";
import { request, isRequested } from ".";
import { logout } from "../../service/AuthService";

jest.mock("../../service/AuthService", () => ({
  __esModule: true,
  logout: jest.fn(),
}));

global.console.error = jest.fn();

describe("useLogout", () => {
  const dispatch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("request", () => {
    test("If all ok", async () => {
      (logout as jest.Mock).mockResolvedValueOnce(true);

      const startNew = request(dispatch);

      // @ts-ignore
      startNew();

      expect(isRequested).toEqual(true);

      await wait(500);

      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, { type: "LOGOUT_REQUEST" });

      /*  expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: "LOGOUT_REQUEST_SUCCESS",
      }); */

      expect(logout).toHaveBeenCalledTimes(1);

      expect(isRequested).toEqual(false);
    });

    test("If error on request", async () => {
      (logout as jest.Mock).mockRejectedValueOnce("Bad fat error");

      const startNew = request(dispatch);

      // @ts-ignore
      startNew();

      expect(isRequested).toEqual(true);

      await wait(500);

      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, { type: "LOGOUT_REQUEST" });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: "LOGOUT_REQUEST_ERROR",
      });

      expect(logout).toHaveBeenCalledTimes(1);

      expect(isRequested).toEqual(false);
    });
  });
});
