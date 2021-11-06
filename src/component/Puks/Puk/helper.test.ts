import { calcPukWidth } from "./helper";

describe("calcPukWidth", () => {
  const possibilities = [
    {
      translateX: 100,
      wrapperWidth: 600, // 1.5
      isIndexChanged: false,
      expected: 100,
    },
    {
      translateX: 100,
      wrapperWidth: 0, // 1.5
      isIndexChanged: false,
      expected: 0,
    },
    {
      translateX: -800,
      wrapperWidth: 600, // 1.5
      isIndexChanged: false,
      expected: 500,
    },
    {
      translateX: -80,
      wrapperWidth: 600, // 1.5
      isIndexChanged: false,
      expected: 80,
    },
    {
      translateX: 100,
      wrapperWidth: 600, // 1.5
      isIndexChanged: true,
      expected: 600,
    },
  ];

  test.each(possibilities)(
    "",
    ({ translateX, wrapperWidth, isIndexChanged, expected }: any) => {
      expect(calcPukWidth(translateX, wrapperWidth, isIndexChanged)).toEqual(
        expected
      );
    }
  );
});
