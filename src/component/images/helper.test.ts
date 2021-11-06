import { getImageSizeStyle } from "./helper";

describe("getImageSizeStyle", () => {
  const possibilities = [
    {
      photoAspectRation: 1.6,
      wrapperSize: { width: 600, height: 400 }, // 1.5
      expected: { height: "auto", width: "100%" },
    },

    {
      photoAspectRation: 1.6,
      wrapperSize: { width: 800, height: 400 }, // 2.0
      expected: { height: "100%", width: "auto" },
    },
  ];

  test.each(possibilities)(
    "",
    ({ photoAspectRation, wrapperSize, expected }: any) => {
      expect(getImageSizeStyle(photoAspectRation, wrapperSize)).toEqual(
        expected
      );
    }
  );
});
