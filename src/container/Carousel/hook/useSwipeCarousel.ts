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
  touchCancel_,
} from "./../service/swipe";
import { Metricks, initMetricks } from "../service/metricks";

/* import {
  isEnoughDist,
  isIndexIncrease,
  isTimeDelayTresholdPass,
  isXDirection,
  calcOpacityByTranslateX,
} from "./helper";
import {
  EVENT_TYPE,
  isMultiTouch,
  identifyOnPointerUp,
} from "./../helper/identifyEvent";
import {
  initMetricks,
  Metricks,
  onTouchStart as collectMetricksOnStart,
  onTouchMove as collectMetricksOnMove,
  onTouchEnd as collectMetricksOnEnd,
} from "./../helper/metricks";
import { calcTranslateXOnMove } from "./../helper/translateX"; */
//import { calcDecreasedIndex, calcIncreasedIndex, clamp } from "./../utils";

/* export type UseSwipeData = Metricks & {
  //opacity: number;
  resultDebug: string;
  itemsLength: number;
  bodyWidth: number;
  translateX: number;
  isTranslated: boolean;
  activeIndex: number;
  eventType: EVENT_TYPE;
  //isTimeDelayTresholdPass: boolean;
  //isXDirection: boolean;
  // isMultiTouch: boolean;
}; */

/* const abort = (
  removeEventListeners: () => void,
  initMain: UseSwipeData,
  setTranslateState: any,
  setUseSwipeData: (data: UseSwipeData) => void
) =>
  compose<undefined, void>(() => {
    setUseSwipeData({ ...initMain });
    removeEventListeners();
    setTranslateState((state) => ({
      ...state,
      isTranslated: false,
      translateX: 0,
    }));
  })();
 */

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
/*  NI_Next.of(getUseSwipeData())
      // CHECK FOR ITEMSLENGTH
      .chain((data: UseSwipeData): NI_Next<any> | Done =>
        data.itemsLength === 0
          ? Done.of({ ...data, resultDebug: "NO_ITEMS" })
          : NI_Next.of(data)
      )
      .map(collectMetricksOnStart(pageX, pageY, targetTouches))
      .map(
        set("eventType", (data: UseSwipeData) =>
          isMultiTouch(data.targetTouches) === true ? "MULTI_TOUCH" : "UNKNOWN"
        )
      )
      // CHECK FOR MULTI TOUCH
      .chain((data: UseSwipeData): NI_Next<any> | Done =>
        data.eventType === "MULTI_TOUCH"
          ? Done.of({ ...data, resultDebug: "MULTI_TOUCH" })
          : NI_Next.of(data)
      )
      .map(set("bodyWidth", document.documentElement.clientWidth))
      .tap(() => {
        addEventListeners();
        setTranslateState((state) => ({
          ...state,
          isTranslated: true,
        }));
      })
      .fold((data: UseSwipeData) => {
        //console.log("POINTER DOWN DONE", data);
        return data.resultDebug === "MULTI_TOUCH"
          ? abort(
              removeEventListeners,
              initMain,
              setTranslateState,
              setUseSwipeData
            )
          : undefined;
      }, setUseSwipeData); */

/*  compose<undefined, UseSwipeData>(
      getUseSwipeData,
      collectMetricksOnStart(pageX, pageY, targetTouches),
      elif(
        (main: UseSwipeData) => isMultiTouch(main.targetTouches) === true,
        set("eventType", "MULTI_TOUCH"),
        set("eventType", "UNKNOWN")
      ),
      elif(
        ({ eventType }: UseSwipeData) => eventType === "MULTI_TOUCH",
        abort(removeEventListeners, initMain, setTranslateState),
        compose(
          set("bodyWidth", document.documentElement.clientWidth),
          tap(() => {
            addEventListeners();
            setTranslateState((state) => ({
              ...state,
              isTranslated: true,
            }));
          }),
          setUseSwipeData
        )
      )
    )(); */

//export const pointerDown = pointerDown_(abort);

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

/*  NI_Next.of(getUseSwipeData())
      .chain((data: UseSwipeData) =>
        data.eventType === "MULTI_TOUCH"
          ? Done.of({ ...data, resultDebug: "MULTI_TOUCH" })
          : NI_Next.of(data)
      )
      .map(collectMetricksOnMove(pageX))
      .chain((data: UseSwipeData) =>
        isTimeDelayTresholdPass(data.startTime) === true
          ? NI_Next.of(data)
          : Done.of({ ...data, resultDebug: "NOT_PASS_TIME_DELAY_TRESHOLD" })
      )
      .chain((data: UseSwipeData) =>
        isXDirection(pageX, pageY, data.startX, data.startY) === true
          ? NI_Next.of(data)
          : Done.of({ ...data, resultDebug: "NOT_X_DIRECTION" })
      )
      .tap((data: UseSwipeData) => {
        setTranslateState((state: any) => ({
          ...state,
          translateX: calcTranslateXOnMove(
            pageX,
            data.prevPageX,
            data.activeIndex,
            itemsLength,
            state.translateX
          ),
        }));
      })
      .fold(
        cond([
          [
            ({ resultDebug }: UseSwipeData) =>
              resultDebug === "NOT_PASS_TIME_DELAY_TRESHOLD",
            (data: UseSwipeData) => {
              data.prevPageX = pageX;
              setUseSwipeData(data);
            },
          ],
          [
            ({ resultDebug }: UseSwipeData) =>
              resultDebug === "NOT_X_DIRECTION",
            () =>
              abort(
                removeEventListeners,
                initMain,
                setTranslateState,
                setUseSwipeData
              ),
          ],
        ]),
        (data: UseSwipeData) => {
          data.prevPageX = pageX;
          setUseSwipeData(data);
        }
      ); */

/* .chain(
        //compose(
        elif(
          ({ startTime }: UseSwipeData) =>
            isTimeDelayTresholdPass(startTime) === true,
          elif(
            ({ startX, startY }: UseSwipeData) =>
              isXDirection(pageX, pageY, startX, startY) === true,
            compose(
              tap((main: UseSwipeData) => {
                setTranslateState((state: any) => ({
                  ...state,
                  translateX: calcTranslateXOnMove(
                    pageX,
                    main.prevPageX,
                    main.activeIndex,
                    itemsLength,
                    state.translateX
                  ),
                }));
              }),
              NI_Next.of
            ),
            () => {
              abort(
                removeEventListeners,
                initMain,
                setTranslateState,
                setUseSwipeData
              );
              return Done.of("XDirection");
            }
          ),
          NI_Next.of //(main: UseSwipeData) => main
          //),
          //set("prevPageX", pageX),
          //setUseSwipeData
        )
      )
      .map(set("prevPageX", pageX))
      .map(setUseSwipeData); */

/* compose<undefined, UseSwipeData>(
  getUseSwipeData,
  collectMetricksOnMove(pageX),
  elif(
    ({ startTime }: UseSwipeData) =>
      isTimeDelayTresholdPass(startTime) === true,
    elif(
      ({ startX, startY }: UseSwipeData) =>
        isXDirection(pageX, pageY, startX, startY) === true,
      tap((main: UseSwipeData) => {
        setTranslateState((state: any) => ({
          ...state,
          translateX: calcTranslateXOnMove(
            pageX,
            main.prevPageX,
            main.activeIndex,
            itemsLength,
            state.translateX
          ),
        }));
      }),
      abort(removeEventListeners, initMain, setTranslateState)
    ),
    (main: UseSwipeData) => main
  ),
  set("prevPageX", pageX)
)(); */

//export const pointerMove = pointerMove_(abort);

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

/* export const pointerUp_ =
  (
    abort: (
      removeEventListeners: () => void,
      initMain: UseSwipeData,
      setTranslateState: any,
      setUseSwipeData: (data: UseSwipeData) => void
    ) => void
  ) =>
  (
    getUseSwipeData: () => UseSwipeData,
    setUseSwipeData: (data: UseSwipeData) => void,
    pageX: number,
    pageY: number,
    setTranslateState: any,
    increaseIndex: () => void,
    decreaseIndex: () => void,
    removeEventListeners: () => void,
    initData: UseSwipeData

    //setActiveIndex: (newActiveIndex: number) => void
    //fetchMore?: any,
    //resetZoom?: any
  ) =>
    NI_Next.of(getUseSwipeData())
      .chain((data: UseSwipeData) =>
        data.eventType === "MULTI_TOUCH"
          ? Done.of({ ...data, resultDebug: "MULTI_TOUCH" })
          : NI_Next.of(data)
      )
      .map(collectMetricksOnEnd(pageX, pageY))
      .map(
        set("eventType", (self: UseSwipeData) =>
          identifyOnPointerUp(self.distX, self.distY, self.elapsedTime)
        )
      )
      .chain((data: UseSwipeData) =>
        data.eventType === "UNKNOWN"
          ? NI_Next.of(data)
          : Done.of({ ...data, resultDebug: `EVENT_TYPE | ${data.eventType}` })
      )
      .chain((data: UseSwipeData) =>
        isEnoughDist(data.distX) === true
          ? NI_Next.of(data)
          : Done.of({ ...data, resultDebug: "NOT_ENOUGH_DIST" })
      )
      .map(
        elif(
          (data: UseSwipeData) => isIndexIncrease(data.distX),
          () => increaseIndex(),
          () => decreaseIndex()
        )
      )
      .fold(
        (data: UseSwipeData) => {
          console.log("POINTER_UP_RESULT DONE", data.resultDebug);
          if (data.resultDebug !== "MULTI_TOUCH") {
            abort(
              removeEventListeners,
              initData,
              setTranslateState,
              setUseSwipeData
            );
          }
        },
        (data: UseSwipeData) => {
          console.log("POINTER_UP_RESULT NEXT", data);
          abort(
            removeEventListeners,
            initData,
            setTranslateState,
            setUseSwipeData
          );
        }
      );
 */
/* .fold(
        () => {},
        compose(
          elif(
            (main: UseSwipeData) =>
              main.eventType === "UNKNOWN" && isEnoughDist(main.distX) === true,
            elif(
              (main: UseSwipeData) => isIndexIncrease(main.distX),
              () => increaseIndex(),
              () => decreaseIndex()
            ),
            () => {}
          ),
          () =>
            abort(
              removeEventListeners,
              initData,
              setTranslateState,
              setUseSwipeData
            )
        )
      ) */

//export const pointerUp = pointerUp_(abort);

/* compose<UseSwipeData, UseSwipeData>(
  collectMetricksOnEnd(pageX, pageY),
  set("eventType", (self: UseSwipeData) =>
    identifyOnPointerUp(self.distX, self.distY, self.elapsedTime)
  ),
  tap(
    compose(
      elif(
        (main: UseSwipeData) =>
          main.eventType === "UNKNOWN" && isEnoughDist(main.distX) === true,
        elif(
          (main: UseSwipeData) => isIndexIncrease(main.distX),
          () => increaseIndex(),
          () => decreaseIndex()
        ),
        () => {}
      ),
      removeEventListeners,
      () =>
        setTranslateState({
          translateX: 0,
          isTranslated: false,
        })
    )
  )
)(main); */

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
