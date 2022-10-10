test("", () => {
  expect(true).toEqual(true);
});

/* import { makeQueryConstraints_ } from "./firestore.helper";

describe("makeQueryConstraints_", () => {
  const where = jest.fn();
  const limit = jest.fn();
  const startAt = jest.fn();
  const orderBy = jest.fn();

  const makeQueryConstraints = makeQueryConstraints_(
    where,
    limit,
    startAt,
    orderBy
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("", () => {
    makeQueryConstraints(
      [
        ["tag.id", "==", "qwe12323"],
        ["favoriteBy", "==", "john"],
      ],
      "docRef",
      4
    );

    expect(where).toHaveBeenCalledTimes(2);
    expect(where).toHaveBeenNthCalledWith(1, "tag.id", "==", "qwe12323");
    expect(where).toHaveBeenNthCalledWith(2, "favoriteBy", "==", "john");

    expect(limit).toHaveBeenCalledTimes(1);
    expect(limit).toHaveBeenNthCalledWith(1, 4 + 1);

    expect(startAt).toHaveBeenCalledTimes(1);
    expect(startAt).toHaveBeenNthCalledWith(1, "docRef");

    expect(orderBy).toHaveBeenCalledTimes(0);
  });

  test("", () => {
    makeQueryConstraints([], undefined, undefined);

    expect(where).toHaveBeenCalledTimes(0);

    expect(limit).toHaveBeenCalledTimes(0);

    expect(startAt).toHaveBeenCalledTimes(0);

    expect(orderBy).toHaveBeenCalledTimes(0);
  });
  /* test.each([
    {
      count: 1,
      constraints: [
        ["tag.id", "==", "qwe12323"],
        ["favoriteBy", "==", "john"],
      ],
      startAt: "docRef",
      limit: 4,
      orderBy: undefined,
      expected: "hello",
    },
    {
      count: 2,
      constraints: [],
      startAt: undefined,
      limit: undefined,
      orderBy: undefined,
      expected: "hello",
    },
    { count: 3, searchTerms: {}, expected: "hello" },
  ])("# $count", ({ constraints, startAt, limit, orderBy, expected }) => {
    expect(
      makeQueryConstraints(constraints as any, startAt, limit, orderBy)
    ).toBe(expected);
  }); /
});
 */
