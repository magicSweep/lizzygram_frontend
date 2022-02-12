/* import { batch } from "react-redux";
import {
  pointerDown_,
  pointerMove_,
  pointerUp_,
  initMain as initMain_,
  UseSwipeData,
} from "./useSwipeCarousel";

jest.mock("react-redux", () => ({
  __esModule: true,
  batch: jest.fn((calllback) => calllback()),
}));

Object.defineProperty(global.document.documentElement, "clientWidth", {
  value: 1200,
});

const initMain: UseSwipeData = {
  ...initMain_,
  itemsLength: 6,
};

let useSwipeData: UseSwipeData;

const getUseSwipeData = jest.fn(() => useSwipeData);

const setUseSwipeData = jest.fn((data: UseSwipeData) => (useSwipeData = data));

const abort = jest.fn();

const pointerDown = pointerDown_(abort);
const pointerMove = pointerMove_(abort);
const pointerUp = pointerUp_(abort);

describe("useSwipeCarousel", () => {
  const setState = jest.fn();
  const addEventListeners = jest.fn();
  const removeEventListeners = jest.fn();

  const increaseIndex = jest.fn();
  const decreaseIndex = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("pointerDown_", () => {
    test("If itemsLength === 0 - it means we have some error or not loading yet - we do nothing ", () => {
      setUseSwipeData({ ...initMain_ });

      pointerDown(
        getUseSwipeData,
        setUseSwipeData,
        initMain,
        setState,
        101,
        222,
        1,
        addEventListeners,
        removeEventListeners
      );

      expect(useSwipeData).toEqual(initMain_);
    });

    test("", () => {
      setUseSwipeData({ ...initMain });

      pointerDown(
        getUseSwipeData,
        setUseSwipeData,
        initMain,
        setState,
        101,
        222,
        1,
        addEventListeners,
        removeEventListeners
      );

      expect(useSwipeData.eventType).toEqual("UNKNOWN");

      expect(useSwipeData.bodyWidth).toEqual(1200);
      expect(useSwipeData.distX).toEqual(0);
      expect(useSwipeData.distY).toEqual(0);
      expect(useSwipeData.elapsedTime).toEqual(0);
      expect(useSwipeData.elapsedTimeAfterMove).toEqual(0);
      expect(useSwipeData.isTranslated).toEqual(true);
      expect(useSwipeData.lastFiveXTouchMove).toEqual([]);
      expect(useSwipeData.lastFiveXToucheMoveSum).toEqual(0);
      expect(useSwipeData.prevPageX).toEqual(101);
      expect(useSwipeData.startTimeAfterMove).toEqual(0);
      expect(useSwipeData.startX).toEqual(101);
      expect(useSwipeData.startY).toEqual(222);
      expect(useSwipeData.targetTouches).toEqual(1);
      expect(useSwipeData.translateX).toEqual(0);

      expect(setState).toHaveBeenCalledTimes(1);

      expect(addEventListeners).toHaveBeenCalledTimes(1);
      expect(removeEventListeners).toHaveBeenCalledTimes(0);

      expect(abort).toHaveBeenCalledTimes(0);
    });

    // and translated is true
    test("If we already have targetTouch - it means we get multi touch event - we reset and end all actions", () => {
      setUseSwipeData({ ...initMain, targetTouches: 1, isTranslated: true });

      pointerDown(
        getUseSwipeData,
        setUseSwipeData,
        initMain,
        setState,
        101,
        222,
        1,
        addEventListeners,
        removeEventListeners
      );

      expect(useSwipeData.eventType).toEqual("MULTI_TOUCH");

      expect(useSwipeData.bodyWidth).toEqual(0);
      expect(useSwipeData.distX).toEqual(0);
      expect(useSwipeData.distY).toEqual(0);
      expect(useSwipeData.elapsedTime).toEqual(0);
      expect(useSwipeData.elapsedTimeAfterMove).toEqual(0);
      expect(useSwipeData.isTranslated).toEqual(true);
      expect(useSwipeData.lastFiveXTouchMove).toEqual([]);
      expect(useSwipeData.lastFiveXToucheMoveSum).toEqual(0);
      expect(useSwipeData.prevPageX).toEqual(101);
      expect(useSwipeData.startTimeAfterMove).toEqual(0);
      expect(useSwipeData.startX).toEqual(101);
      expect(useSwipeData.startY).toEqual(222);
      expect(useSwipeData.targetTouches).toEqual(2);
      expect(useSwipeData.translateX).toEqual(0);

      //expect(useSwipeData.isTimeDelayTresholdPass).toEqual(false);
      // expect(useSwipeData.isXDirection).toEqual(false);

      // that methods calls in abort
      expect(setState).toHaveBeenCalledTimes(0);
      expect(removeEventListeners).toHaveBeenCalledTimes(0);

      expect(addEventListeners).toHaveBeenCalledTimes(0);

      expect(abort).toHaveBeenCalledTimes(1);
    });
  });

  describe("pointerMove", () => {
    test("Valid move...", () => {
      const data: UseSwipeData = {
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

      setUseSwipeData(data);

      pointerMove(
        getUseSwipeData,
        setUseSwipeData,
        6,
        224,
        123,
        setState,
        removeEventListeners,
        initMain
      );

      //expect(useSwipeData).toEqual("UNKNOWN");
      expect(useSwipeData.eventType).toEqual("UNKNOWN");

      expect(useSwipeData.bodyWidth).toEqual(1300);
      expect(useSwipeData.distX).toEqual(0);
      expect(useSwipeData.distY).toEqual(0);
      expect(useSwipeData.elapsedTime).toEqual(0);
      expect(useSwipeData.elapsedTimeAfterMove).toEqual(0);
      expect(useSwipeData.isTranslated).toEqual(true);
      expect(useSwipeData.lastFiveXTouchMove).toEqual([-22]);
      expect(useSwipeData.lastFiveXToucheMoveSum).toEqual(0);
      expect(useSwipeData.prevPageX).toEqual(123);
      //expect(useSwipeData.startTimeAfterMove).toEqual(0);
      expect(useSwipeData.startTime).toEqual(1321232);
      expect(useSwipeData.startX).toEqual(101);
      expect(useSwipeData.startY).toEqual(222);
      expect(useSwipeData.targetTouches).toEqual(1);
      expect(useSwipeData.translateX).toEqual(23);

      //expect(useSwipeData.isPointerChecked).toEqual(true);
      //expect(useSwipeData.isPointerValid).toEqual(true);

      expect(setState).toHaveBeenCalledTimes(1);
      //removeEventListeners
      expect(removeEventListeners).toHaveBeenCalledTimes(0);
      expect(abort).toHaveBeenCalledTimes(0);
    });

    //isPointerChecked === true && main.isPointerValid === false
    test("If not isTimeDelayTresholdPass - we only collect metricks", () => {
      setUseSwipeData({
        ...initMain,
        startTime: Date.now(),
      });

      pointerMove(
        getUseSwipeData,
        setUseSwipeData,
        6,
        224,
        123,
        setState,
        removeEventListeners,
        initMain
      );

      expect(useSwipeData.prevPageX).toEqual(123);
      expect(setState).toHaveBeenCalledTimes(0);
      expect(removeEventListeners).toHaveBeenCalledTimes(0);
      expect(abort).toHaveBeenCalledTimes(0);
    });

    test("If not isXDirection - we set state to init and remove move and mouseUp listeners", () => {
      setUseSwipeData({
        ...initMain,
        startTime: 123456564,
      });

      pointerMove(
        getUseSwipeData,
        setUseSwipeData,
        6,
        224,
        10,
        setState,
        removeEventListeners,
        initMain
      );

      expect(useSwipeData.prevPageX).toEqual(0);

      expect(setState).toHaveBeenCalledTimes(0);
      expect(removeEventListeners).toHaveBeenCalledTimes(0);
      expect(abort).toHaveBeenCalledTimes(1);
    });
  });

  describe("pointerUp", () => {
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
    }); /

    test("If event type is equals MULTI_TOUCH - it means we already abort all - we do nothing", () => {
      setUseSwipeData({ ...initMain, eventType: "MULTI_TOUCH" });

      pointerUp(
        getUseSwipeData,
        setUseSwipeData,
        135,
        226,
        setState,
        increaseIndex,
        decreaseIndex,
        removeEventListeners,
        initMain
      );

      expect(setState).toHaveBeenCalledTimes(0);
      expect(removeEventListeners).toHaveBeenCalledTimes(0);
      expect(increaseIndex).toHaveBeenCalledTimes(0);
      expect(decreaseIndex).toHaveBeenCalledTimes(0);
    });

    test("If event type is not specialized and pointer past enough dist - we increase/decrease index and set state to initial values", () => {
      const data: UseSwipeData = {
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

      setUseSwipeData(data);

      pointerUp(
        getUseSwipeData,
        setUseSwipeData,
        135,
        226,
        setState,
        increaseIndex,
        decreaseIndex,
        removeEventListeners,
        initMain
      );

      //expect(useSwipeData).toEqual("hell");

      //expect(useSwipeData.metricks).toEqual("hello");

      //expect(onFetchMore).toHaveBeenCalledTimes(0);
      expect(setState).toHaveBeenCalledTimes(0);
      expect(removeEventListeners).toHaveBeenCalledTimes(0);
      expect(increaseIndex).toHaveBeenCalledTimes(0);
      expect(decreaseIndex).toHaveBeenCalledTimes(1);

      expect(abort).toHaveBeenCalledTimes(1);

      expect(useSwipeData.distX).toEqual(34);
      expect(useSwipeData.eventType).toEqual("UNKNOWN");

      expect(useSwipeData.distX).toEqual(34);
      expect(useSwipeData.distY).toEqual(4);
      //expect(useSwipeData.metricks.elapsedTime).toEqual(0);
      //expect(useSwipeData.metricks.elapsedTimeAfterMove).toEqual(0);
      expect(useSwipeData.isTranslated).toEqual(false);
      expect(useSwipeData.lastFiveXTouchMove).toEqual([-22, -14]);
      expect(useSwipeData.lastFiveXToucheMoveSum).toEqual(-36);
      expect(useSwipeData.prevPageX).toEqual(101);
      expect(useSwipeData.startTime).toEqual(1321232);
      //expect(useSwipeData.metricks.startTimeAfterMove).toEqual(0);
      expect(useSwipeData.startX).toEqual(101);
      expect(useSwipeData.startY).toEqual(222);
      expect(useSwipeData.targetTouches).toEqual(1);
      expect(useSwipeData.translateX).toEqual(23);

      //expect(useSwipeData.isPointerChecked).toEqual(false);
      // expect(useSwipeData.isPointerValid).toEqual(false);
    });
  });
});
 */
