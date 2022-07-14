import { startNew } from ".";
import { initSearchState } from "./../../../../search";
import { getAllPhotos } from "../../service/PhotosDb";

jest.mock("../../service/PhotosDb", () => ({
  __esModule: true,
  getAllPhotos: jest.fn(),
}));

describe("usePhotos", () => {
  describe("startNew", () => {
    test("", async () => {
      (getAllPhotos as jest.Mock).mockResolvedValueOnce("resData");

      const dispatch = jest.fn();

      await startNew("userUid", dispatch, false, initSearchState)();

      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: "ALL_PHOTOS_REQUEST_NEW_START",
      });

      /*  expect(dispatch).toHaveBeenNthCalledWith(2, {
        hasNextPage: false,
        nextPageDocRef: undefined,
        photos: undefined,
        type: "ALL_PHOTOS_REQUEST_SUCCESS",
      }); */
    });
  });
});
