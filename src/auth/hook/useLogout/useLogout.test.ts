import wait from "waait";
import { request_, isRequested, setIsRequested, getIsRequested } from ".";
//import { logout } from "../../service/AuthService/AuthService.fake";

/* jest.mock("../../service/AuthService/AuthService.fake", () => ({
  __esModule: true,
  logout: jest.fn(),
})); */

//global.console.error = jest.fn();

describe("useLogout", () => {
  const dispatch = jest.fn();

  const logoutRequestAC = jest.fn(() => "logoutRequestAC");
  const logoutRequestErrorAC = jest.fn(() => "logoutRequestErrorAC");
  /*   const setIsRequested = jest.fn();
  const getIsRequested = jest.fn(() => false);
 */ const logout = jest.fn();

  const request = request_(
    logoutRequestAC,
    logoutRequestErrorAC,
    setIsRequested,
    getIsRequested,
    logout
  );

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

      expect(dispatch).toHaveBeenNthCalledWith(1, "logoutRequestAC");

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

      expect(dispatch).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenNthCalledWith(1, "logoutRequestAC");

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        alertType: "error",
        message: "Упс... Какая-то ошибочка...",
        type: "SHOW_ALERT",
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, "logoutRequestErrorAC");

      expect(logout).toHaveBeenCalledTimes(1);

      expect(isRequested).toEqual(false);
    });
  });
});
