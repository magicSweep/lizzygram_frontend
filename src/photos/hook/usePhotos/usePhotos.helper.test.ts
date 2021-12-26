import {
  isEqualTags,
  makeGetAllPhotosResData,
  isNeedNewRequest_,
} from "./usePhotos.helper";
import { SearchTerms } from "../../../search/types";

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

describe("isNeedNewRequest", () => {
  let prevSearchTerms: SearchTerms;

  const setPrevSearchTerms = (prevSearchTerms_: SearchTerms) =>
    (prevSearchTerms = prevSearchTerms_);
  const getPrevSearchTerms = () => prevSearchTerms;

  const isNeedNewRequest = isNeedNewRequest_(
    setPrevSearchTerms,
    getPrevSearchTerms
  );

  test("", () => {
    let res = isNeedNewRequest(
      {
        tags: undefined,
        age: -1,
      },
      false
    );

    expect(res).toEqual(true);

    res = isNeedNewRequest(
      {
        tags: undefined,
        age: -1,
      },
      false
    );

    expect(res).toEqual(false);

    res = isNeedNewRequest(
      {
        tags: undefined,
        age: 2,
      },
      false
    );

    expect(res).toEqual(true);

    res = isNeedNewRequest(
      {
        tags: undefined,
        age: 3,
      },
      true
    );

    expect(res).toEqual(false);

    res = isNeedNewRequest(
      {
        tags: {
          h: true,
          b: true,
        },
        age: 3,
      },
      false
    );

    expect(res).toEqual(true);

    res = isNeedNewRequest(
      {
        tags: {
          h: true,
          b: true,
          c: false,
        },
        age: 3,
      },
      false
    );

    expect(res).toEqual(false);
  });
});

describe("makeGetAllPhotosResData_", () => {
  const photos: any = ["photo1", "photo2", "photo3", "photo4"];

  test("We got next page", () => {
    const res = makeGetAllPhotosResData({ docs: photos, cursor: "cursor" });

    expect(res).toEqual({
      hasNextPage: true,
      nextPageDocRef: "cursor",
      photos: ["photo1", "photo2", "photo3", "photo4"],
    });
  });

  test("No next page", () => {
    const res = makeGetAllPhotosResData({ docs: photos, cursor: undefined });

    expect(res).toEqual({
      hasNextPage: false,
      nextPageDocRef: undefined,
      photos: ["photo1", "photo2", "photo3", "photo4"],
    });
  });
});
