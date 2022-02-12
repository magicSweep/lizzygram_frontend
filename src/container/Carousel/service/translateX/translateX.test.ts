import { calcTranslateXOnMove } from ".";

describe("calcTranslateXOnMove", () => {
  test("", () => {
    const pageX = 125;
    const prevPageX = 122;
    const activeIndex = 3;
    const itemsLength = 5;
    const translateX = 20;

    const res1 = calcTranslateXOnMove(
      pageX,
      prevPageX,
      activeIndex,
      itemsLength,
      translateX
    );

    /*  const res2 = calcTranslateXOnMove_(
      pageX,
      prevPageX,
      activeIndex,
      itemsLength,
      translateX
    ); */

    expect(res1).toEqual(23);
  });

  test("", () => {
    const pageX = 122;
    const prevPageX = 125;
    const activeIndex = 4;
    const itemsLength = 5;
    const translateX = -45;

    const res1 = calcTranslateXOnMove(
      pageX,
      prevPageX,
      activeIndex,
      itemsLength,
      translateX
    );

    expect(res1).toEqual(-45.3);
  });
});
