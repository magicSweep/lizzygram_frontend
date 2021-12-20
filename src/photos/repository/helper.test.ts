import { isEqualTags, makeQueryConstraints_ } from "./helper";

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

describe("makeQueryConstraints_", () => {
  const where: any = jest.fn(
    (one, two, three) => `where | ${one} | ${two} | ${three}`
  );
  const limit: any = jest.fn(() => `limit`);
  const startAt: any = jest.fn(() => "startAt");

  let searchTerms = {
    tags: {
      helsdf23: true,
      hel3df23: true,
      helddf23: false,
    },
    age: 1,
  };

  test("", () => {
    let makeQueryConstraints = makeQueryConstraints_(5, where, limit, startAt);

    const res = makeQueryConstraints(searchTerms, "nextPageDocRef")();

    expect(res).toEqual([
      "where | yearsOld | == | 1",
      "where | tags.helsdf23 | == | true",
      "where | tags.hel3df23 | == | true",
      "startAt",
      "limit",
    ]);
  });
});
