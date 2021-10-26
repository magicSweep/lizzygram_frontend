import { makeReq } from "./useTags";
import wait from "waait";

describe("useTags", () => {
  describe("makeReq", () => {
    const dispatch = jest.fn();

    const request = jest.fn();

    request.mockResolvedValueOnce("tagsData");

    beforeEach(() => {
      request.mockClear();
      dispatch.mockClear();
    });

    test("success", async () => {
      makeReq(dispatch, request)();

      await wait(500);

      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: "TAGS_REQUEST_START",
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        tags: "tagsData",
        type: "TAGS_REQUEST_SUCCESS",
      });
    });

    test("error", async () => {
      request.mockRejectedValueOnce("error");

      makeReq(dispatch, request)();

      await wait(500);

      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: "TAGS_REQUEST_START",
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: "TAGS_REQUEST_ERROR",
      });
    });
  });
});
