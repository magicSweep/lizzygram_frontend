import { startNew } from ".";
import { initSearchState } from "./../../../search";
import { getAllPhotos } from "../../service/DbService";

jest.mock("../../service/DbService", () => ({
  __esModule: true,
  getAllPhotos: jest.fn(),
}));

describe("usePhotos", () => {
  describe("startNew", () => {
    test("", async () => {
      (getAllPhotos as jest.Mock).mockResolvedValueOnce("resData");

      const dispatch = jest.fn();

      await startNew(dispatch, false, initSearchState)();

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: "ALL_PHOTOS_REQUEST_NEW_START",
      });

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
