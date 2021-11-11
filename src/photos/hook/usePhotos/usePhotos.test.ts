import { startNew } from ".";
import { initSearchState } from "./../../../search";

describe("usePhotos", () => {
  describe("startNew", () => {
    test("", async () => {
      const dispatch = jest.fn();

      await startNew(dispatch, false, initSearchState)();

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: "ALL_PHOTOS_REQUEST_NEW_START",
      });

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
