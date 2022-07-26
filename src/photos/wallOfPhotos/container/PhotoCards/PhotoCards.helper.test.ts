import { getSlicedArrayOfPhotos } from "./PhotoCards.helper";

describe("Make arrays of photos", () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const numberOfAdded = 6;
  //const numberOfBlocks = 3;
  const index = 4;
  const numberOfItemsInBlock = 4;

  // We must get
  /* const res = [
    [null, null, 1, 2],
    [3, 4, 5, 6],
  ]; */

  test("", () => {
    const result = getSlicedArrayOfPhotos(
      items,
      numberOfAdded,
      index,
      numberOfItemsInBlock
    );

    expect(result).toEqual([11, 12]);
  });
});
