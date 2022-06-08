import {
  makeIconSrc_,
  makeSrc_,
  makeSrcSet,
  makeTagsData,
} from "./dataAdapter.helper";

describe("", () => {
  const photoSizes = [
    { width: 320, height: 180 },
    { width: 800, height: 600 },
    { width: 1280, height: 720 },
    { width: 1920, height: 1080 },
  ];

  const urls = new Map([
    [320, "https://v.ru/320"],
    [800, "https://v.ru/800"],
    [1280, "https://v.ru/1200"],
    [1920, "https://v.ru/1920"],
  ]);

  test("makeSrcSet", () => {
    const res = makeSrcSet(urls);

    expect(res).toEqual(
      "https://v.ru/800 600w, https://v.ru/1200 1000w, https://v.ru/1920 1500w, "
    );
  });

  test("makeIconSrc_", () => {
    const res = makeIconSrc_(photoSizes)(urls);

    expect(res).toEqual("https://v.ru/320");
  });

  test("makeSrc_", () => {
    const res = makeSrc_(photoSizes)(urls);

    expect(res).toEqual("https://v.ru/800");
  });

  test("makeTagsData", () => {
    const tagsFormState = {
      sfdsdf: false,
      sfadsf: true,
      asdfad: false,
      asfdas: true,
    };

    const tags = makeTagsData(tagsFormState);

    expect(tags).toEqual({ asfdas: true, sfadsf: true });
  });
});
