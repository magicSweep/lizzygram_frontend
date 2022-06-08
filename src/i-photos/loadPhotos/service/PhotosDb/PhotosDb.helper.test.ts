import { makeConstraints } from "./PhotosDb.helper";

describe("makeConstraints", () => {
  const userUid = "user-uid";

  test.each([
    {
      count: 1,
      searchTerms: {
        tags: undefined,
        age: -1,
        mine: false,
        favorites: false,
      },
      expected: [],
    },
    {
      count: 2,
      searchTerms: {
        tags: { hsldfjs: true, sfsd: false, htrtl: true },
        age: 2,
        mine: true,
        favorites: true,
      },
      expected: [
        ["yearsOld", "==", 2],
        ["tags.hsldfjs", "==", true],
        ["tags.htrtl", "==", true],
        ["addedByUserUID", "==", "user-uid"],
        ["favoriteBy.user-uid", "==", true],
      ],
    },
    { count: 3, searchTerms: {}, expected: [] },
  ])("# $count", ({ searchTerms, expected }) => {
    expect(makeConstraints(userUid, searchTerms as any)).toEqual(expected);
  });
});
