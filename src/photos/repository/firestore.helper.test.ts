import { makeQueryConstraints_ } from "./firestore.helper";

describe("makeQueryConstraints_", () => {
  const where: any = jest.fn(
    (one, two, three) => `where | ${one} | ${two} | ${three}`
  );
  const limit: any = jest.fn(() => `limit`);
  const startAt: any = jest.fn(() => "startAt");
  const orderBy: any = jest.fn(() => "orderBy");

  let searchTerms = {
    tags: {
      helsdf23: true,
      hel3df23: true,
      helddf23: false,
    },
    age: 1,
    mine: true,
    favorites: true,
  };

  test("", () => {
    let makeQueryConstraints = makeQueryConstraints_(
      where,
      limit,
      startAt,
      orderBy
    );

    const res = makeQueryConstraints(
      "userUid",
      searchTerms,
      "nextPageDocRef",
      5
    );

    expect(res).toEqual([
      "where | yearsOld | == | 1",
      "where | tags.helsdf23 | == | true",
      "where | tags.hel3df23 | == | true",
      "where | addedByUserUID | == | userUid",
      "where | favoriteBy.userUid | == | true",
      "startAt",
      "limit",
    ]);
  });
});
