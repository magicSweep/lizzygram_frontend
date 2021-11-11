import { getAllBySearchTerms } from "./FakeRepository";

describe("getAllBySearchTerms", () => {
  test("Load photos", async () => {
    const res = await getAllBySearchTerms({} as any, 5, {} as any);

    expect(res.hasNextPage).toEqual(true);
    expect(res.nextPageDocRef).toEqual("332399");

    expect(res.photos.length).toEqual(5);
  });

  test("Load more photos", async () => {
    const res = await getAllBySearchTerms({} as any, 5, {} as any, "332399");

    expect(res.hasNextPage).toEqual(false);
    expect(res.nextPageDocRef).toEqual("");

    expect(res.photos.length).toEqual(3);
  });
});
