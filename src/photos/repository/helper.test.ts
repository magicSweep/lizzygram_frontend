import { isEqualTags } from "./helper";

describe("isEqualTags", () => {
  const conditions = [
    { tags1: undefined, tags2: { hello: true }, expected: false },
    { tags1: { hello: true }, tags2: undefined, expected: false },
    { tags1: undefined, tags2: undefined, expected: true },
    {
      tags1: { hello: true, b: false },
      tags2: { hello: true, b: false },
      expected: true,
    },
    {
      tags1: { hello: true, b: false },
      tags2: { hello: true, b: true },
      expected: false,
    },
  ];

  test.each(conditions)("", ({ tags1, tags2, expected }) => {
    expect(isEqualTags(tags1 as any, tags2 as any)).toEqual(expected);
  });
});
