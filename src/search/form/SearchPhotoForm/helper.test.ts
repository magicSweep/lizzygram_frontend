import { isDiffSearchState } from "./helper";

describe("isDiffSearchState", () => {
  test.each([
    {
      count: 0,
      prevSearchTerms: {
        age: 2,
        tags: undefined,
      },
      formData: {
        age: "1",
        tags: undefined,
      },
      expected: true,
    },
    {
      count: 1,
      prevSearchTerms: {
        age: 2,
        tags: undefined,
      },
      formData: {
        age: "2",
        tags: undefined,
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
      },
      formData: {
        age: "2",
        tags: {
          bca: false,
          abc: true,
        },
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
      },
      formData: {
        age: "2",
        tags: {
          bca: false,
          abc: false,
        },
      },
      expected: true,
    },
  ])("test number - $count", ({ prevSearchTerms, formData, expected }) => {
    expect(isDiffSearchState(prevSearchTerms, formData)).toEqual(expected);
  });
});
