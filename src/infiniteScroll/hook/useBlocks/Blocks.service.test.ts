/* import { getArraysOfItemsByBlocks } from "./helper";

describe("getArraysOfItemsByBlocks", () => {
  const possibilities = [
    {
      // @ts-ignore
      items: [...Array(10).keys()],
      pages: 2,
      numberOfItemsByFlex: 4,
      numberOfAddedPhotos: 0,
      expected: [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
      ],
    },

    {
      // @ts-ignore
      items: [...Array(10).keys()],
      pages: 3,
      numberOfItemsByFlex: 4,
      numberOfAddedPhotos: 0,
      expected: [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9],
      ],
    },

    {
      // @ts-ignore
      items: [...Array(10).keys()],
      pages: 3,
      numberOfItemsByFlex: 4,
      numberOfAddedPhotos: 2,
      expected: [
        [null, null, 0, 1],
        [2, 3, 4, 5],
        [6, 7, 8, 9],
      ],
    },

    {
      // @ts-ignore
      items: [...Array(12).keys()],
      pages: 3,
      numberOfItemsByFlex: 4,
      numberOfAddedPhotos: 2,
      expected: [
        [null, null, 0, 1],
        [2, 3, 4, 5],
        [6, 7, 8, 9],
      ],
    },

    {
      // @ts-ignore
      items: [...Array(20).keys()],
      pages: 11,
      numberOfItemsByFlex: 2,
      numberOfAddedPhotos: 1,
      expected: [
        [null, 0],
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
        [9, 10],
        [11, 12],
        [13, 14],
        [15, 16],
        [17, 18],
        [19],
      ],
    },
  ];

  test.each(possibilities)(
    "",
    ({ items, pages, numberOfItemsByFlex, numberOfAddedPhotos, expected }) => {
      expect(
        getArraysOfItemsByBlocks(
          items,
          pages,
          numberOfItemsByFlex,
          numberOfAddedPhotos
        )
      ).toEqual(expected);
    }
  );
}); */
