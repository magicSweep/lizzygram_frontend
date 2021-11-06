import { batch } from "react-redux";
import {
  pointerDown,
  pointerMove,
  pointerUp,
  initMain,
  Main,
} from "./useSwipeCarousel";

jest.mock("react-redux", () => ({
  __esModule: true,
  batch: jest.fn((calllback) => calllback()),
}));

Object.defineProperty(global.document.documentElement, "clientWidth", {
  value: 1200,
});

describe("useSwipeCarousel", () => {
  const setState = jest.fn();
  const addEventListeners = jest.fn();
  const removeEventListeners = jest.fn();

  const increaseIndex = jest.fn();
  const decreaseIndex = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("pointerDown", () => {
    test("", () => {
      const result = pointerDown(
        { ...initMain },
        initMain,
        setState,
        101,
        222,
        1,
        addEventListeners,
        removeEventListeners
      );

      expect(result.eventType).toEqual("UNKNOWN");

      expect(result.bodyWidth).toEqual(1200);
      expect(result.distX).toEqual(0);
      expect(result.distY).toEqual(0);
      expect(result.elapsedTime).toEqual(0);
      expect(result.elapsedTimeAfterMove).toEqual(0);
      expect(result.isTranslated).toEqual(true);
      expect(result.lastFiveXTouchMove).toEqual([]);
      expect(result.lastFiveXToucheMoveSum).toEqual(0);
      expect(result.prevPageX).toEqual(101);
      expect(result.startTimeAfterMove).toEqual(0);
      expect(result.startX).toEqual(101);
      expect(result.startY).toEqual(222);
      expect(result.targetTouches).toEqual(1);
      expect(result.translateX).toEqual(0);

      expect(setState).toHaveBeenCalledTimes(1);

      expect(addEventListeners).toHaveBeenCalledTimes(1);
      expect(removeEventListeners).toHaveBeenCalledTimes(0);
    });

    test("If we already have targetTouch and translated is true - it means we get multi touch event - we reset and end all actions", () => {
      const result = pointerDown(
        { ...initMain, targetTouches: 1, isTranslated: true },
        initMain,
        setState,
        101,
        222,
        1,
        addEventListeners,
        removeEventListeners
      );

      expect(result.eventType).toEqual("UNKNOWN");

      expect(result.bodyWidth).toEqual(0);
      expect(result.distX).toEqual(0);
      expect(result.distY).toEqual(0);
      expect(result.elapsedTime).toEqual(0);
      expect(result.elapsedTimeAfterMove).toEqual(0);
      expect(result.isTranslated).toEqual(false);
      expect(result.lastFiveXTouchMove).toEqual([]);
      expect(result.lastFiveXToucheMoveSum).toEqual(0);
      expect(result.prevPageX).toEqual(0);
      expect(result.startTimeAfterMove).toEqual(0);
      expect(result.startX).toEqual(0);
      expect(result.startY).toEqual(0);
      expect(result.targetTouches).toEqual(0);
      expect(result.translateX).toEqual(0);

      //expect(result.isTimeDelayTresholdPass).toEqual(false);
      // expect(result.isXDirection).toEqual(false);

      expect(setState).toHaveBeenCalledTimes(1);

      expect(addEventListeners).toHaveBeenCalledTimes(0);
      expect(removeEventListeners).toHaveBeenCalledTimes(1);
    });
  });

  describe("pointerMove", () => {
    test("", () => {
      const main: Main = {
        ...initMain,
        eventType: "UNKNOWN",
        translateX: 23,
        bodyWidth: 1300,
        isTranslated: true,
        prevPageX: 101,
        startX: 101,
        startY: 222,
        targetTouches: 1,
        startTime: 1321232,
        activeIndex: 3,
      };

      const result = pointerMove(
        main,
        6,
        224,
        123,
        setState,
        removeEventListeners,
        initMain
      );

      //expect(result).toEqual("UNKNOWN");
      expect(result.eventType).toEqual("UNKNOWN");

      expect(result.bodyWidth).toEqual(1300);
      expect(result.distX).toEqual(0);
      expect(result.distY).toEqual(0);
      expect(result.elapsedTime).toEqual(0);
      expect(result.elapsedTimeAfterMove).toEqual(0);
      expect(result.isTranslated).toEqual(true);
      expect(result.lastFiveXTouchMove).toEqual([-22]);
      expect(result.lastFiveXToucheMoveSum).toEqual(0);
      expect(result.prevPageX).toEqual(123);
      //expect(result.startTimeAfterMove).toEqual(0);
      expect(result.startTime).toEqual(1321232);
      expect(result.startX).toEqual(101);
      expect(result.startY).toEqual(222);
      expect(result.targetTouches).toEqual(1);
      expect(result.translateX).toEqual(23);

      //expect(result.isPointerChecked).toEqual(true);
      //expect(result.isPointerValid).toEqual(true);

      expect(setState).toHaveBeenCalledTimes(1);
      //removeEventListeners
      expect(removeEventListeners).toHaveBeenCalledTimes(0);
    });

    //isPointerChecked === true && main.isPointerValid === false
    test("If not isTimeDelayTresholdPass - we only collect metricks", () => {
      const main: Main = {
        ...initMain,
        startTime: Date.now(),
        //isPointerChecked: true,
        //isPointerValid: false,
      };

      const result = pointerMove(
        main,
        6,
        224,
        123,
        setState,
        removeEventListeners,
        initMain
      );

      expect(result.prevPageX).toEqual(123);

      expect(setState).toHaveBeenCalledTimes(0);
      expect(removeEventListeners).toHaveBeenCalledTimes(0);
    });

    test("If not isXDirection - we set state to init and remove move and mouseUp listeners", () => {
      const main: Main = {
        ...initMain,
        startTime: 123456564,
        //isPointerChecked: true,
        //isPointerValid: false,
      };

      const result = pointerMove(
        main,
        6,
        224,
        10,
        setState,
        removeEventListeners,
        initMain
      );

      expect(result.prevPageX).toEqual(10);

      expect(setState).toHaveBeenCalledTimes(1);
      expect(removeEventListeners).toHaveBeenCalledTimes(1);
    });
  });

  describe.only("pointerUp_", () => {
    /* test("If we do not complite conditions - we do nothing", () => {

      const main: Main = {
        ...initMain,
        //isPointerChecked: true,
        //isPointerValid: false,
      };

      const res = pointerUp(
        main,
        135,
        226,
        setState,
        increaseIndex,
        decreaseIndex
      );

      expect(setState).toHaveBeenCalledTimes(0);
      expect(increaseIndex).toHaveBeenCalledTimes(0);
      expect(decreaseIndex).toHaveBeenCalledTimes(0);
    }); */

    test("If event type is not specialized and pointer past enough dist - we increase/decrease index and set state to initial values", () => {
      const main: Main = {
        ...initMain,
        eventType: "MOVE",
        translateX: 23,
        bodyWidth: 1300,
        isTranslated: true,
        prevPageX: 101,
        startX: 101,
        startY: 222,
        targetTouches: 1,
        startTime: 1321232,
        lastFiveXTouchMove: [-22, -14],
        activeIndex: 3,
      };

      const result = pointerUp(
        main,
        135,
        226,
        setState,
        increaseIndex,
        decreaseIndex,
        removeEventListeners
      );

      //expect(result).toEqual("hell");

      //expect(result.metricks).toEqual("hello");

      //expect(onFetchMore).toHaveBeenCalledTimes(0);
      expect(setState).toHaveBeenCalledTimes(1);
      expect(removeEventListeners).toHaveBeenCalledTimes(1);
      expect(increaseIndex).toHaveBeenCalledTimes(0);
      expect(decreaseIndex).toHaveBeenCalledTimes(1);

      //expect(onIndexChange).toHaveBeenCalledTimes(1);

      expect(result.distX).toEqual(34);
      expect(result.eventType).toEqual("UNKNOWN");

      expect(result.distX).toEqual(34);
      expect(result.distY).toEqual(4);
      //expect(result.metricks.elapsedTime).toEqual(0);
      //expect(result.metricks.elapsedTimeAfterMove).toEqual(0);
      expect(result.isTranslated).toEqual(false);
      expect(result.lastFiveXTouchMove).toEqual([-22, -14]);
      expect(result.lastFiveXToucheMoveSum).toEqual(-36);
      expect(result.prevPageX).toEqual(101);
      expect(result.startTime).toEqual(1321232);
      //expect(result.metricks.startTimeAfterMove).toEqual(0);
      expect(result.startX).toEqual(101);
      expect(result.startY).toEqual(222);
      expect(result.targetTouches).toEqual(1);
      expect(result.translateX).toEqual(23);

      //expect(result.isPointerChecked).toEqual(false);
      // expect(result.isPointerValid).toEqual(false);
    });
  });
});
