import { isDiffSearchState } from "./helper";

describe("isDiffSearchState", () => {
  test.each([
    {
      count: 0,
      prevSearchTerms: {
        age: 2,
        tags: undefined,
        mine: false,
        favorites: false,
      },
      formData: {
        age: "1",
        tags: undefined,
        mine: false,
        favorites: false,
      },
      expected: true,
    },
    {
      count: 1,
      prevSearchTerms: {
        age: 2,
        tags: undefined,
        mine: false,
        favorites: false,
      },
      formData: {
        age: "2",
        tags: undefined,
        mine: false,
        favorites: false,
      },
      expected: true,
    },
    {
      count: 2,
      prevSearchTerms: {
        age: 2,
        tags: {
          abc: true,
          bca: false,
        },
        mine: false,
        favorites: false,
      },
      formData: {
        age: "2",
        tags: {
          bca: false,
          abc: true,
        },
        mine: false,
        favorites: false,
      },
      expected: false,
    },
    {
      count: 3,
      prevSearchTerms: {
        age: 2,
        tags: {
          abc: true,
          bca: false,
        },
        mine: false,
        favorites: false,
      },
      formData: {
        age: "2",
        tags: {
          bca: false,
          abc: false,
        },
        mine: false,
        favorites: false,
      },
      expected: true,
    },
    {
      count: 4,
      prevSearchTerms: {
        age: 2,
        tags: {
          abc: true,
          bca: false,
        },
        mine: true,
        favorites: false,
      },
      formData: {
        age: "2",
        tags: {
          bca: false,
          abc: true,
        },
        mine: false,
        favorites: false,
      },
      expected: true,
    },
  ])("test number - $count", ({ prevSearchTerms, formData, expected }) => {
    expect(isDiffSearchState(prevSearchTerms, formData)).toEqual(expected);
  });
});
