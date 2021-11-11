import { calcIsWrapperHigher, calcIsWrapperWider } from "./helper";

describe("calcIsWrapperWider", () => {
  test("If our photo width = 100% - if we get any zoom - we get false", () => {
    let res = calcIsWrapperWider(10, true, 1.9, 1.6);

    expect(res).toEqual(false);

    res = calcIsWrapperWider(100, true, 1.9, 1.6);

    expect(res).toEqual(false);
  });

  test("", () => {
    let res = calcIsWrapperWider(10, false, 1.9, 1.6);

    expect(res).toEqual(true);

    res = calcIsWrapperWider(100, false, 1.9, 1.6);

    expect(res).toEqual(false);
  });
});

describe("calcIsWrapperHigher", () => {
  test("If our photo height = 100% - if we get any zoom - we get false", () => {
    let res = calcIsWrapperHigher(10, false, 1.9, 1.6);

    expect(res).toEqual(false);

    res = calcIsWrapperHigher(100, false, 1.9, 1.6);

    expect(res).toEqual(false);
  });

  test("", () => {
    let res = calcIsWrapperHigher(10, true, 1.9, 2.21);

    expect(res).toEqual(true);

    res = calcIsWrapperHigher(100, true, 1.9, 2.21);

    expect(res).toEqual(false);
  });
});
