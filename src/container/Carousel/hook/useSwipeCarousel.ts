import { MutableRefObject, useCallback, useRef, useState } from "react";
import { batch } from "react-redux";
import {
  SwipeData,
  PointerDownProps,
  PointerMoveProps,
  PointerUpProps,
  TouchCancelProps,
  pointerDown as pointerDown_,
  pointerMove as pointerMove_,
  pointerUp as pointerUp_,
  touchCancel as touchCancel_,
} from "./../service/swipe";
import { Metricks, initMetricks } from "../service/metricks";

export const initData: SwipeData = {
  ...initMetricks,
  state: "IDLE",
  isMoveInit: false,
  resultDebug: "",
  itemsLength: 0,
  bodyWidth: 0,
  translateX: 0,
  isTranslated: false,
  activeIndex: 0,
  eventType: "UNKNOWN",
};

export const touchCancel = ({
  setSwipeData,
  setTranslateState,
  ...props
}: TouchCancelProps & {
  setSwipeData: (data: SwipeData) => void;
  setTranslateState: any;
}) => {
  const swipeData = touchCancel_(props);

  setTranslateState((state) => ({
    ...state,
    translateX: 0,
    isTranslated: false,
  }));

  setSwipeData(swipeData);
};

export const pointerDown = ({
  setSwipeData,
  setTranslateState,
  ...props
}: PointerDownProps & {
  setSwipeData: (data: SwipeData) => void;
  setTranslateState: any;
}) => {
  const swipeData = pointerDown_(props);

  setTranslateState((state) => ({
    ...state,
    isTranslated: true,
  }));

  setSwipeData(swipeData);
};

export const pointerMove = ({
  setSwipeData,
  setTranslateState,
  ...props
}: PointerMoveProps & {
  setSwipeData: (data: SwipeData) => void;
  setTranslateState: any;
}) => {
  const swipeData = pointerMove_(props);

  if (swipeData.state !== "ABORT") {
    setTranslateState((state: any) => ({
      ...state,
      translateX: swipeData.translateX,
    }));
  }

  setSwipeData(swipeData);
};

export const pointerUp = ({
  setSwipeData,
  setTranslateState,
  ...props
}: PointerUpProps & {
  setSwipeData: (data: SwipeData) => void;
  setTranslateState: any;
}) => {
  const swipeData = pointerUp_(props);

  setTranslateState((state: any) => ({
    ...state,
    isTranslated: false,
    translateX: 0,
  }));

  setSwipeData(swipeData);
};

export const useSwipeCarousel = (
  itemsLength: number,
  activeIndex: number,
  increaseIndex: () => void,
  decreaseIndex: () => void
  //onIndexChange?: (newActiveIndex: number, activeIndex: number) => void
) => {
  const swipeDataRef: MutableRefObject<SwipeData> = useRef({
    ...initData,
  });

  const [state, setState] = useState({
    //opacity: 1,
    translateX: 0,
    isTranslated: false,
    //activeIndex: initActiveIndex,
  });

  swipeDataRef.current.itemsLength = itemsLength;
  swipeDataRef.current.translateX = state.translateX;
  swipeDataRef.current.activeIndex = activeIndex;

  const setSwipeData = useCallback((value: SwipeData) => {
    swipeDataRef.current = value;
  }, []);

  const getSwipeData = useCallback(() => {
    return swipeDataRef.current;
  }, []);

  const onMouseUp = useCallback((event: any) => {
    //console.log("RCatrousel mouse up");
    event.preventDefault();
    event.stopPropagation();

    //console.log("onMouseUp");

    // removeEventListeners();
    /* window.removeEventListener("mousemove", onMouseMove, false);
      window.removeEventListener("mouseup", onMouseUp, false); */

    batch(() => {
      pointerUp({
        getSwipeData,
        setSwipeData,
        pageX: event.pageX,
        pageY: event.pageY,
        targetTouches: 0,
        setTranslateState: setState,
        increaseIndex,
        decreaseIndex,
        removeEventListeners: removeMouseEventListeners,
        initData,
      });
    });
  }, []);

  const onMouseMove = useCallback((event: any) => {
    event.preventDefault();
    event.stopPropagation();

    //console.log("onMouseMove", mainRef.current.translateX);

    pointerMove({
      getSwipeData,
      setSwipeData,
      pageX: event.pageX,
      pageY: event.pageY,
      setTranslateState: setState,
    });
  }, []);

  const onMouseDown = useCallback((event: any) => {
    event.preventDefault();
    event.stopPropagation();

    //console.log("onMouseDown");

    pointerDown({
      getSwipeData,
      setSwipeData,
      setTranslateState: setState,
      pageX: event.pageX,
      pageY: event.pageY,
      targetTouches: 0,
      addEventListeners: addMouseEventListeners,
    });
  }, []);

  const removeMouseEventListeners = () => {
    window.removeEventListener("mousemove", onMouseMove, false);
    window.removeEventListener("mouseup", onMouseUp, false);
  };

  const addMouseEventListeners = () => {
    window.addEventListener("mousemove", onMouseMove, false);
    window.addEventListener("mouseup", onMouseUp, false);
  };

  const onTouchStart = useCallback((event: any) => {
    const touches = event.changedTouches[0];

    pointerDown({
      getSwipeData,
      setSwipeData,
      setTranslateState: setState,
      pageX: touches.pageX,
      pageY: touches.pageY,
      targetTouches: event.targetTouches.length,
      addEventListeners: addTouchEventListeners,
    });
  }, []);

  const onTouchMove = useCallback((event: any) => {
    const touches = event.changedTouches[0];

    //console.log("onMouseMove", mainRef.current.translateX);

    pointerMove({
      getSwipeData,
      setSwipeData,
      pageX: touches.pageX,
      pageY: touches.pageY,
      setTranslateState: setState,
    });
  }, []);

  const onTouchEnd = useCallback((event: any) => {
    const touches = event.changedTouches[0];

    //console.log("onMouseDown");

    batch(() => {
      pointerUp({
        getSwipeData,
        setSwipeData,
        pageX: touches.pageX,
        pageY: touches.pageY,
        targetTouches: event.targetTouches.length,
        setTranslateState: setState,
        increaseIndex,
        decreaseIndex,
        removeEventListeners: removeTouchEventListeners,
        initData,
      });
    });
  }, []);

  const onTouchCancel = useCallback((event: any) => {
    //const touches = event.changedTouches[0];

    //console.log("onMouseDown");

    touchCancel({
      getSwipeData,
      setSwipeData,
      targetTouches: event.targetTouches.length,
      setTranslateState: setState,
      removeEventListeners: removeTouchEventListeners,
      initData,
    });
  }, []);

  const removeTouchEventListeners = () => {
    window.removeEventListener("touchmove", onTouchMove, false);
    window.removeEventListener("touchend", onTouchEnd, false);
    window.removeEventListener("touchcancel", onTouchCancel, false);
  };

  const addTouchEventListeners = () => {
    window.addEventListener("touchmove", onTouchMove, false);
    window.addEventListener("touchend", onTouchEnd, false);
    window.addEventListener("touchcancel", onTouchCancel, false);
  };

  return {
    getDebugData: getSwipeData,
    translateX: Math.round(state.translateX),
    isTranslated: state.isTranslated,
    onMouseDown,
    onTouchStart,
    /* opacity:
      state.translateX === 0
        ? 1
        : calcOpacityByTranslateX(
            state.translateX,
            getUseSwipeData().bodyWidth
          ), */
  };
};
