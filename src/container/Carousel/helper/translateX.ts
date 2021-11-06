import { compose, cond, elif } from "fmagic";

const offset = 45;

export const isRightEnd = (
  activeIndex: number,
  itemsLength: number,
  translateX: number
) => activeIndex === itemsLength - 1 && translateX < 0;

export const isLeftEnd = (activeIndex: number, translateX: number) =>
  activeIndex === 0 && translateX > 0;

export const doesWeGoRight = (pageX: number, prevPageX: number) =>
  pageX < prevPageX;

export const doesWeGoLeft = (pageX: number, prevPageX: number) =>
  pageX > prevPageX;

export const isFatherOffset_ = (offset: number) => (translateX: number) =>
  Math.abs(translateX) > offset;

export const isFartherOffset = isFatherOffset_(offset);

export const calcTranslateX = (
  pageX: number,
  prevPageX: number,
  translateX: number
) => translateX + pageX - prevPageX;

export const calcTranslateXOnMove_ =
  (offset: number) =>
  (
    pageX: number,
    prevPageX: number,
    activeIndex: number,
    itemsLength: number,
    translateX: number
  ) =>
    cond([
      [
        () => isLeftEnd(activeIndex, translateX),
        elif(
          () => doesWeGoLeft(pageX, prevPageX),
          () => (isFartherOffset(translateX) ? offset : translateX + 0.3),
          () => calcTranslateX(pageX, prevPageX, translateX)
        ),
      ],
      [
        () => isRightEnd(activeIndex, itemsLength, translateX),
        elif(
          () => doesWeGoRight(pageX, prevPageX),
          () => (isFartherOffset(translateX) ? -offset : translateX - 0.3),
          () => calcTranslateX(pageX, prevPageX, translateX)
        ),
      ],
      [() => true, () => calcTranslateX(pageX, prevPageX, translateX)],
    ])();

export const calcTranslateXOnMove = calcTranslateXOnMove_(offset);

/* export const calcTranslateXOnMove_ = (
  pageX: number,
  prevPageX: number,
  activeIndex: number,
  itemsLength: number,
  translateX: number
) => {
  //console.log("calcTranslateXOnMove-1", pageX, prevPageX);

  // how change translateX
  let marga = 0;

  if (activeIndex === 0 && translateX > 0) {
    if (pageX > prevPageX) {
      if (translateX > offset) return translateX;

      return translateX + 0.3;
    }
  } else if (activeIndex === itemsLength - 1 && translateX < 0) {
    if (pageX < prevPageX) {
      if (translateX < -offset) return translateX;

      return translateX - 0.3;
    }
  }
  //console.log("calcTranslateXOnMove-2");
  //marga = pageX - prevPageX;

  return translateX + pageX - prevPageX;
}; */
