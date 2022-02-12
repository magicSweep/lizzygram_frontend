import { pointerDown_, pointerMove_, pointerUp_, touchCancel_ } from ".";

describe("swipe", () => {
  const getSwipeData: any = jest.fn();
  global.alert = jest.fn();

  describe("pointerDown_", () => {
    /* (
    collectMetricksOnStart: typeof collectMetricksOnStart_,
    isMultiTouch: typeof isMultiTouch_
  ) =>
  (
    getSwipeData: () => SwipeData,
    pageX: number,
    pageY: number,
    targetTouches: number,
    addEventListeners: () => void
  ) */

    const collectOnStart = jest.fn((data: any) => data);
    const collectMetricksOnStart = jest.fn(
      () => (data: any) => collectOnStart(data)
    );

    const isMultiTouch = jest.fn();

    const addEventListeners = jest.fn();

    const pointerDown = pointerDown_(
      collectMetricksOnStart as any,
      isMultiTouch
    );

    afterEach(() => {
      jest.clearAllMocks();
    });

    const pointerDownProps = {
      getSwipeData,
      pageX: 0,
      pageY: 0,
      targetTouches: 1,
      addEventListeners,
    };

    test("If we have no carousel items - we do nothing", () => {
      getSwipeData.mockReturnValueOnce({
        itemsLength: 0,
      });

      const swipeData = pointerDown(pointerDownProps);

      expect(swipeData).toEqual({ itemsLength: 0, resultDebug: "NO_ITEMS" });
      expect(addEventListeners).toHaveBeenCalledTimes(0);
      expect(collectOnStart).toHaveBeenCalledTimes(0);
    });

    test("If we have abort state - we do nothing", () => {
      getSwipeData.mockReturnValueOnce({
        itemsLength: 5,
        state: "ABORT",
      });

      const swipeData = pointerDown(pointerDownProps);

      expect(swipeData).toEqual({
        itemsLength: 5,
        resultDebug: "ABORT",
        state: "ABORT",
      });
      expect(addEventListeners).toHaveBeenCalledTimes(0);
      expect(collectOnStart).toHaveBeenCalledTimes(0);
    });

    test("If we have multi touch - we set abort state and do nothing", () => {
      getSwipeData.mockReturnValueOnce({
        itemsLength: 5,
      });

      isMultiTouch.mockReturnValueOnce(true);

      const swipeData = pointerDown(pointerDownProps);

      expect(swipeData).toEqual({
        bodyWidth: 0,
        eventType: "MULTI_TOUCH",
        itemsLength: 5,
        resultDebug: "MULTI_TOUCH",
        state: "ABORT",
      });
      expect(addEventListeners).toHaveBeenCalledTimes(0);
      expect(collectOnStart).toHaveBeenCalledTimes(1);
    });

    test(`If all ok:
            - get swipe data
            - we collect metricks, set event type, set bodyWidth
            - check for multi touch
            - add event listeners(move, up)
            - return swipe data
        `, () => {
      getSwipeData.mockReturnValueOnce({
        itemsLength: 5,
      });

      isMultiTouch.mockReturnValueOnce(false);

      const swipeData = pointerDown(pointerDownProps);

      expect(swipeData).toEqual({
        bodyWidth: 0,
        eventType: "UNKNOWN",
        itemsLength: 5,
      });
      expect(addEventListeners).toHaveBeenCalledTimes(1);
      expect(collectOnStart).toHaveBeenCalledTimes(1);
    });
  });

  describe("pointerMove_", () => {
    const collectOnMove = jest.fn((data: any) => data);
    const collectMetricksOnMove = jest.fn(
      () => (data: any) => collectOnMove(data)
    );

    const isTimeDelayTresholdPass = jest.fn();
    const isXDirection = jest.fn();
    const calcTranslateXOnMove = jest.fn();

    const pointerMove = pointerMove_(
      collectMetricksOnMove,
      isTimeDelayTresholdPass,
      isXDirection,
      calcTranslateXOnMove
    );

    const pointerMoveProps = {
      getSwipeData,
      pageX: 0,
      pageY: 0,
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("If we have abort state - we only set prevPageX", () => {
      getSwipeData.mockReturnValueOnce({
        state: "ABORT",
      });

      const swipeData = pointerMove(pointerMoveProps);

      expect(swipeData).toEqual({ prevPageX: 0, state: "ABORT" });
    });

    test("If move not init - we check for time delay treshold pass - if not we only set prevPageX", () => {
      getSwipeData.mockReturnValueOnce({
        isMoveInit: false,
      });

      isTimeDelayTresholdPass.mockReturnValueOnce(false);

      const swipeData = pointerMove(pointerMoveProps);

      expect(swipeData).toEqual({
        prevPageX: 0,
        isMoveInit: false,
        resultDebug: "NOT_PASS_TIME_DELAY_TRESHOLD",
      });
    });

    test(`If move not init:
       - we check for time delay treshold pass;
           - if pass we check for none-x-axis movement`, () => {
      getSwipeData.mockReturnValueOnce({
        isMoveInit: false,
      });

      isTimeDelayTresholdPass.mockReturnValueOnce(true);

      isXDirection.mockReturnValueOnce(false);

      const swipeData = pointerMove(pointerMoveProps);

      expect(swipeData).toEqual({
        prevPageX: 0,
        isMoveInit: true,
        resultDebug: "NOT_X_DIRECTION",
        state: "ABORT",
      });

      expect(calcTranslateXOnMove).toHaveBeenCalledTimes(0);
    });

    /* test("If time delay treshold not pass - we only set prevPageX", () => {
      getSwipeData.mockReturnValueOnce({});

      isTimeDelayTresholdPass.mockReturnValueOnce(false);

      const swipeData = pointerMove(pointerMoveProps);

      expect(swipeData).toEqual({
        prevPageX: 0,
        resultDebug: "NOT_PASS_TIME_DELAY_TRESHOLD",
      });
    }); */

    /* test("If none-x-axis movement - we set abort state", () => {
      getSwipeData.mockReturnValueOnce({});

      isTimeDelayTresholdPass.mockReturnValueOnce(true);

      isXDirection.mockReturnValueOnce(false);

      const swipeData = pointerMove(pointerMoveProps);

      expect(swipeData).toEqual({
        prevPageX: 0,
        resultDebug: "NOT_X_DIRECTION",
        state: "ABORT",
      });

      expect(calcTranslateXOnMove).toHaveBeenCalledTimes(0);
    }); */

    test(`If all ok:
            - get swipe data
            - we collect metricks
            - check for time delay treshold pass
            - check for x-axis movement
            - calc and set translateX
            - set prevPageX
            - return swipe data
        `, () => {
      getSwipeData.mockReturnValueOnce({
        isMoveInit: false,
      });

      isTimeDelayTresholdPass.mockReturnValueOnce(true);

      isXDirection.mockReturnValueOnce(true);

      calcTranslateXOnMove.mockReturnValueOnce(213);

      const swipeData = pointerMove(pointerMoveProps);

      expect(swipeData).toEqual({
        isMoveInit: true,
        prevPageX: 0,
        translateX: 213,
      });
    });
  });

  describe("pointerUp_", () => {
    const collectOnEnd = jest.fn((data: any) => data);
    const collectMetricksOnEnd = jest.fn(
      () => (data: any) => collectOnEnd(data)
    );

    const identifyOnPointerUp = jest.fn();
    const isEnoughDist = jest.fn();
    const isIndexIncrease = jest.fn();

    const increaseIndex = jest.fn();
    const decreaseIndex = jest.fn();
    const removeEventListeners = jest.fn();
    const initData: any = { data: "initData" };

    const pointerUp = pointerUp_(
      collectMetricksOnEnd,
      identifyOnPointerUp,
      isEnoughDist,
      isIndexIncrease
    );

    const pointerUpProps = {
      getSwipeData,
      pageX: 300,
      pageY: 200,
      targetTouches: 1,
      increaseIndex,
      decreaseIndex,
      removeEventListeners,
      initData,
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    test(`If we have abort state: 
        - we collect metricks 
        - if targetTouches equals 0 we remove event listeners and return init swipe data
        `, () => {
      getSwipeData.mockReturnValueOnce({
        state: "ABORT",
        targetTouches: 0,
      });

      let swipeData = pointerUp(pointerUpProps);

      expect(swipeData).toEqual({ data: "initData" });
      expect(removeEventListeners).toHaveBeenCalledTimes(1);
      expect(collectOnEnd).toHaveBeenCalledTimes(1);
    });

    test(`If we have abort state: 
        - we collect metricks 
        - if targetTouches more then 0 - we do nothing
        `, () => {
      getSwipeData.mockReturnValueOnce({
        state: "ABORT",
        targetTouches: 2,
      });

      const swipeData = pointerUp(pointerUpProps);

      expect(swipeData).toEqual({ state: "ABORT", targetTouches: 2 });
      expect(removeEventListeners).toHaveBeenCalledTimes(0);
    });

    test("If event type not equals UNKNOWN - we abort", () => {
      getSwipeData.mockReturnValueOnce({
        targetTouches: 0,
      });
      identifyOnPointerUp.mockReturnValueOnce("CLICK");

      const swipeData = pointerUp(pointerUpProps);

      expect(swipeData).toEqual({ data: "initData" });
      expect(removeEventListeners).toHaveBeenCalledTimes(1);
    });

    test("If not enough dist - we abort", () => {
      getSwipeData.mockReturnValueOnce({
        targetTouches: 0,
      });
      identifyOnPointerUp.mockReturnValueOnce("UNKNOWN");
      isEnoughDist.mockReturnValueOnce(false);

      const swipeData = pointerUp(pointerUpProps);

      expect(swipeData).toEqual({ data: "initData" });
      expect(removeEventListeners).toHaveBeenCalledTimes(1);
    });

    test(`If all ok:
            - get swipe data
            - we collect metricks
            - we edintify event type (click, long tap, unknown)
            - check for enough dist
            - increase or decrease index
            - remove event listeners
            - return init swipe data
        `, () => {
      getSwipeData.mockReturnValueOnce({
        targetTouches: 0,
      });
      identifyOnPointerUp.mockReturnValueOnce("UNKNOWN");
      isEnoughDist.mockReturnValueOnce(true);
      isIndexIncrease.mockReturnValueOnce(false);

      const swipeData = pointerUp(pointerUpProps);

      expect(swipeData).toEqual({ data: "initData" });
      expect(removeEventListeners).toHaveBeenCalledTimes(1);
      expect(collectOnEnd).toHaveBeenCalledTimes(1);
      expect(increaseIndex).toHaveBeenCalledTimes(0);
      expect(decreaseIndex).toHaveBeenCalledTimes(1);
    });
  });

  describe("touchCancel_", () => {
    const collectOnCancel = jest.fn((data: any) => data);
    const collectMetricksOnTouchCancel = jest.fn(
      () => (data: any) => collectOnCancel(data)
    );
    const removeEventListeners = jest.fn();
    const initData: any = { data: "initData" };

    const touchCancel = touchCancel_(collectMetricksOnTouchCancel);

    afterEach(() => {
      jest.clearAllMocks();
    });

    test(`If it's last touch: 
      - remove event listeners
      - return init swipe data
    `, () => {
      getSwipeData.mockReturnValueOnce({
        targetTouches: 0,
      });

      const data = touchCancel({
        getSwipeData,
        removeEventListeners,
        initData,
        targetTouches: 0,
      });

      expect(data).toEqual({ data: "initData" });

      expect(removeEventListeners).toHaveBeenCalledTimes(1);
    });

    test("If we get another active touch - we decrease number of target touches", () => {
      getSwipeData.mockReturnValueOnce({
        targetTouches: 1,
      });

      const data = touchCancel({
        getSwipeData,
        removeEventListeners,
        initData,
        targetTouches: 1,
      });

      expect(data).toEqual({ targetTouches: 1 });

      expect(removeEventListeners).toHaveBeenCalledTimes(0);
    });
  });
});
