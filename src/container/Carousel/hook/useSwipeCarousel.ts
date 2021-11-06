import { MutableRefObject, useCallback, useRef, useState } from "react";
import { batch } from "react-redux";
import { compose, elif, NI_Box, set, tap } from "fmagic";
import {
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
import { calcTranslateXOnMove } from "./../helper/translateX";
//import { calcDecreasedIndex, calcIncreasedIndex, clamp } from "./../utils";

export type Main = Metricks & {
  //opacity: number;
  bodyWidth: number;
  translateX: number;
  isTranslated: boolean;
  activeIndex: number;
  eventType: EVENT_TYPE;
  //isTimeDelayTresholdPass: boolean;
  //isXDirection: boolean;
  // isMultiTouch: boolean;
};

export const initMain: Main = {
  ...initMetricks,
  //opacity: 1,
  bodyWidth: 0,
  translateX: 0,
  activeIndex: 0,
  eventType: "UNKNOWN",
  //isTimeDelayTresholdPass: false,
  //isXDirection: false,
  //isMultiTouch: false,
};

const abort = (
  removeEventListeners: () => void,
  initMain: Main,
  setTranslateState: any
) =>
  compose<any, Main>(
    () => {
      removeEventListeners();
      setTranslateState((state) => ({
        ...state,
        isTranslated: false,
        translateX: 0,
      }));
    },
    () => ({ ...initMain })
  );

export const pointerDown_ =
  (
    abort: (
      removeEventListeners: () => void,
      initMain: Main,
      setTranslateState: any
    ) => () => Main
  ) =>
  (
    main: Main,
    initMain: Main,
    setTranslateState: any,
    pageX: number,
    pageY: number,
    targetTouches: number,
    addEventListeners: () => void,
    removeEventListeners: () => void
  ) =>
    compose<Main, Main>(
      collectMetricksOnStart(pageX, pageY, targetTouches),
      elif(
        (main: Main) => isMultiTouch(main.targetTouches) === true,
        set("eventType", "MULTI_TOUCH"),
        set("eventType", "UNKNOWN")
      ),
      elif(
        ({ eventType }: Main) => eventType === "MULTI_TOUCH",
        abort(removeEventListeners, initMain, setTranslateState),
        /* compose(
        tap(() => {
          removeEventListeners();
          setTranslateState((state) => ({
            ...state,
            isTranslated: false,
            translateX: 0,
          }));
        }),
        () => ({ ...initMain })
      ), */
        compose(
          set("bodyWidth", document.documentElement.clientWidth),
          tap(() => {
            addEventListeners();
            setTranslateState((state) => ({
              ...state,
              isTranslated: true,
            }));
          })
        )
      )
    )(main);

export const pointerDown = pointerDown_(abort);

/*  NI_Box.of(main)
    .map(collectMetricksOnStart(pageX, pageY, targetTouches))
    .map(
      elif(
        (main: Main) => isMultiTouch(main.targetTouches) === true,
        set("eventType", "MULTI_TOUCH"),
        set("eventType", "UNKNOWN")
      )
    )
    //.map(set("bodyWidth", document.documentElement.clientWidth))
    .flat(
      elif(
        ({ eventType }: Main) => eventType === "MULTI_TOUCH",
        compose(
          set("isPointerChecked", true),
          set("isPointerValid", false),
          tap(() =>
            setTranslateState((state) => ({
              ...state,
              isTranslated: false,
              translateX: 0,
            }))
          ),
          () => ({ ...initMain })
        ),
        compose(
          set("bodyWidth", document.documentElement.clientWidth),
          tap(() =>
            setTranslateState((state) => ({
              ...state,
              isTranslated: true,
            }))
          )
        )
      )
    ); */

export const pointerMove_ =
  (
    abort: (
      removeEventListeners: () => void,
      initMain: Main,
      setTranslateState: any
    ) => () => Main
  ) =>
  (
    main: Main,
    itemsLength: number,
    pageY: number,
    pageX: number,
    setTranslateState: any,
    removeEventListeners: () => void,
    initMain: Main
  ) =>
    compose<Main, Main>(
      collectMetricksOnMove(pageX),
      elif(
        ({ startTime }: Main) => isTimeDelayTresholdPass(startTime) === true,
        elif(
          ({ startX, startY }: Main) =>
            isXDirection(pageX, pageY, startX, startY) === true,
          tap((main: Main) => {
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
        (main: Main) => main
      ),
      set("prevPageX", pageX)
    )(main);

export const pointerMove = pointerMove_(abort);

/* export const pointerMove = (
  main: Main,
  itemsLength: number,
  pageY: number,
  pageX: number,
  setTranslateState: any
) =>
  main.isPointerChecked === true && main.isPointerValid === false
    ? main
    : NI_Box.of(main)
        .map(collectMetricksOnMove(pageX))
        .map(
          elif(
            (main: Main) =>
              main.isPointerChecked === false &&
              isTimeDelayTresholdPass(main.startTime),
            compose(
              set("isPointerChecked", true),
              set("isPointerValid", (self: Main) =>
                isXDirection(pageX, pageY, self.startX, self.startY)
              )
            ),
            (main: Main) => main
          )
        )
        .map(
          elif(
            (main: Main) =>
              main.isPointerChecked === true && main.isPointerValid === true,
            tap((main: Main) => {
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
            (main: Main) => main
          )
        )
        .flat(set("prevPageX", pageX));*/

export const pointerUp = (
  main: Main,
  pageX: number,
  pageY: number,
  setTranslateState: any,
  increaseIndex: () => void,
  decreaseIndex: () => void,
  removeEventListeners: () => void
  //setActiveIndex: (newActiveIndex: number) => void
  //fetchMore?: any,
  //resetZoom?: any
) =>
  compose<Main, Main>(
    collectMetricksOnEnd(pageX, pageY),
    set("eventType", (self: Main) =>
      identifyOnPointerUp(self.distX, self.distY, self.elapsedTime)
    ),
    tap(
      compose(
        elif(
          (main: Main) =>
            main.eventType === "UNKNOWN" && isEnoughDist(main.distX) === true,
          elif(
            (main: Main) => isIndexIncrease(main.distX),
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
  )(main);

/*   main.isPointerChecked === true && main.isPointerValid === false
            ? main
            : NI_Box.of(main)
                .map(collectMetricksOnEnd(pageX, pageY))
                .map(
                  set("eventType", (self: Main) =>
                    identifyOnPointerUp(self.distX, self.distY, self.elapsedTime)
                  )
                )
                .flat(
                  tap(
                    compose(
                      elif(
                        (main: Main) =>
                          main.eventType === "UNKNOWN" &&
                          isEnoughDist(main.distX) === true,
                        elif(
                          (main: Main) => isIndexIncrease(main.distX),
                          () => increaseIndex(),
                          () => decreaseIndex()
                        ),
                        () => {}
                      ),
                      () =>
                        setTranslateState({
                          translateX: 0,
                          isTranslated: false,
                        })
                    )
                  )
                ); */

/*export const pointerUp = (
  main: Main,
  pageX: number,
  pageY: number,
  setTranslateState: any,
  increaseIndex: () => void,
  decreaseIndex: () => void
  //setActiveIndex: (newActiveIndex: number) => void
  //fetchMore?: any,
  //resetZoom?: any
) =>
  main.isPointerChecked === true && main.isPointerValid === false
    ? main
    : NI_Box.of(main)
        .map(collectMetricksOnEnd(pageX, pageY))
        .map(
          set("eventType", (self: Main) =>
            identifyOnPointerUp(self.distX, self.distY, self.elapsedTime)
          )
        )
        .flat(
          tap(
            compose(
              elif(
                (main: Main) =>
                  main.eventType === "UNKNOWN" &&
                  isEnoughDist(main.distX) === true,
                elif(
                  (main: Main) => isIndexIncrease(main.distX),
                  () => increaseIndex(),
                  () => decreaseIndex()
                ),
                () => {}
              ),
              () =>
                setTranslateState({
                  translateX: 0,
                  isTranslated: false,
                })
            )
          )
        ); */

export const useSwipeCarousel = (
  itemsLength: number,
  activeIndex: number,
  increaseIndex: () => void,
  decreaseIndex: () => void
  //onIndexChange?: (newActiveIndex: number, activeIndex: number) => void
) => {
  const mainRef: MutableRefObject<Main> = useRef({
    ...initMain,
  });

  const [state, setState] = useState({
    //opacity: 1,
    translateX: 0,
    isTranslated: false,
    //activeIndex: initActiveIndex,
  });

  mainRef.current.translateX = state.translateX;
  mainRef.current.activeIndex = activeIndex;

  const setMain = useCallback((value: Main | ((main: Main) => Main)) => {
    if (typeof value === "function") {
      mainRef.current = value(mainRef.current);
    } else {
      mainRef.current = value;
    }
  }, []);

  const onMouseUp = useCallback(
    (event: any) => {
      //console.log("RCatrousel mouse up");
      event.preventDefault();
      event.stopPropagation();

      //console.log("onMouseUp");

      // removeEventListeners();
      /* window.removeEventListener("mousemove", onMouseMove, false);
      window.removeEventListener("mouseup", onMouseUp, false); */

      batch(() => {
        setMain((main) =>
          pointerUp(
            main,
            event.pageX,
            event.pageY,
            setState,
            increaseIndex,
            decreaseIndex,
            removeEventListeners
          )
        );
      });
    },
    [itemsLength]
  );

  const onMouseMove = useCallback(
    (event: any) => {
      event.preventDefault();
      event.stopPropagation();

      //console.log("onMouseMove", mainRef.current.translateX);

      setMain((main) =>
        pointerMove(
          main,
          itemsLength,
          event.pageY,
          event.pageX,
          setState,
          removeEventListeners,
          initMain
        )
      );
    },
    [itemsLength]
  );

  const onMouseDown = useCallback(
    (event: any) => {
      event.preventDefault();
      event.stopPropagation();

      //console.log("onMouseDown");

      setMain((main) => {
        if (itemsLength === 0) return main;

        //addEventListeners();

        return pointerDown(
          main,
          initMain,
          setState,
          event.pageX,
          event.pageY,
          0,
          addEventListeners,
          removeEventListeners
        );
      });
    },
    [itemsLength]
  );

  const removeEventListeners = () => {
    window.removeEventListener("mousemove", onMouseMove, false);
    window.removeEventListener("mouseup", onMouseUp, false);
  };

  const addEventListeners = () => {
    window.addEventListener("mousemove", onMouseMove, false);
    window.addEventListener("mouseup", onMouseUp, false);
  };

  return {
    translateX: Math.round(state.translateX),
    isTranslated: state.isTranslated,
    onMouseDown,
    opacity:
      state.translateX === 0
        ? 1
        : calcOpacityByTranslateX(state.translateX, mainRef.current.bodyWidth),
  };
};

/* import { MutableRefObject, useCallback, useRef, useState } from "react";
import { batch } from "react-redux";
import { compose, elif, NI_Box, set, tap } from "fmagic";
import {
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
import { calcTranslateXOnMove } from "./../helper/translateX";
//import { calcDecreasedIndex, calcIncreasedIndex, clamp } from "./../utils";

export type Main = Metricks & {
  //opacity: number;
  bodyWidth: number;
  translateX: number;
  isTranslated: boolean;
  activeIndex: number;
  eventType: EVENT_TYPE;
  isPointerChecked: boolean;
  isPointerValid: boolean;
};

export const initMain: Main = {
  ...initMetricks,
  //opacity: 1,
  bodyWidth: 0,
  translateX: 0,
  activeIndex: 0,
  eventType: "UNKNOWN",
  isPointerChecked: false,
  isPointerValid: false,
};

export const pointerDown = (
  main: Main,
  initMain: Main,
  setTranslateState: any,
  pageX: number,
  pageY: number,
  targetTouches: number
) =>
  NI_Box.of(main)
    .map(collectMetricksOnStart(pageX, pageY, targetTouches))
    .map(
      elif(
        (main: Main) => isMultiTouch(main.targetTouches) === true,
        set("eventType", "MULTI_TOUCH"),
        set("eventType", "UNKNOWN")
      )
    )
    //.map(set("bodyWidth", document.documentElement.clientWidth))
    .flat(
      elif(
        ({ eventType }: Main) => eventType === "MULTI_TOUCH",
        compose(
          set("isPointerChecked", true),
          set("isPointerValid", false),
          tap(() =>
            setTranslateState((state) => ({
              ...state,
              isTranslated: false,
              translateX: 0,
            }))
          ),
          () => ({ ...initMain })
        ),
        compose(
          set("bodyWidth", document.documentElement.clientWidth),
          tap(() =>
            setTranslateState((state) => ({
              ...state,
              isTranslated: true,
            }))
          )
        )
      )
    );

export const pointerMove = (
  main: Main,
  itemsLength: number,
  pageY: number,
  pageX: number,
  setTranslateState: any
) =>
  main.isPointerChecked === true && main.isPointerValid === false
    ? main
    : NI_Box.of(main)
        .map(collectMetricksOnMove(pageX))
        .map(
          elif(
            (main: Main) =>
              main.isPointerChecked === false &&
              isTimeDelayTresholdPass(main.startTime),
            compose(
              set("isPointerChecked", true),
              set("isPointerValid", (self: Main) =>
                isXDirection(pageX, pageY, self.startX, self.startY)
              )
            ),
            (main: Main) => main
          )
        )
        .map(
          elif(
            (main: Main) =>
              main.isPointerChecked === true && main.isPointerValid === true,
            tap((main: Main) => {
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
            (main: Main) => main
          )
        )
        .flat(set("prevPageX", pageX));

export const pointerUp = (
  main: Main,
  pageX: number,
  pageY: number,
  setTranslateState: any,
  increaseIndex: () => void,
  decreaseIndex: () => void
  //setActiveIndex: (newActiveIndex: number) => void
  //fetchMore?: any,
  //resetZoom?: any
) =>
  main.isPointerChecked === true && main.isPointerValid === false
    ? main
    : NI_Box.of(main)
        .map(collectMetricksOnEnd(pageX, pageY))
        .map(
          set("eventType", (self: Main) =>
            identifyOnPointerUp(self.distX, self.distY, self.elapsedTime)
          )
        )
        .flat(
          tap(
            compose(
              elif(
                (main: Main) =>
                  main.eventType === "UNKNOWN" &&
                  isEnoughDist(main.distX) === true,
                elif(
                  (main: Main) => isIndexIncrease(main.distX),
                  () => increaseIndex(),
                  () => decreaseIndex()
                ),
                () => {}
              ),
              () =>
                setTranslateState({
                  translateX: 0,
                  isTranslated: false,
                })
            )
          )
        );

export const useSwipeCarousel = (
  itemsLength: number,
  activeIndex: number,
  increaseIndex: () => void,
  decreaseIndex: () => void
  //onIndexChange?: (newActiveIndex: number, activeIndex: number) => void
) => {
  const mainRef: MutableRefObject<Main> = useRef({
    ...initMain,
  });

  const [state, setState] = useState({
    //opacity: 1,
    translateX: 0,
    isTranslated: false,
    //activeIndex: initActiveIndex,
  });

  mainRef.current.translateX = state.translateX;
  mainRef.current.activeIndex = activeIndex;

  const setMain = useCallback((value: Main | ((main: Main) => Main)) => {
    if (typeof value === "function") {
      mainRef.current = value(mainRef.current);
    } else {
      mainRef.current = value;
    }
  }, []);

  const onMouseUp = useCallback(
    (event: any) => {
      //console.log("RCatrousel mouse up");
      event.preventDefault();
      event.stopPropagation();

      console.log("onMouseUp");

      window.removeEventListener("mousemove", onMouseMove, false);
      window.removeEventListener("mouseup", onMouseUp, false);

      batch(() => {
        setMain((main) =>
          pointerUp(
            main,
            event.pageX,
            event.pageY,
            setState,
            increaseIndex,
            decreaseIndex
          )
        );
      });
    },
    [itemsLength]
  );

  const onMouseMove = useCallback(
    (event: any) => {
      event.preventDefault();
      event.stopPropagation();

      console.log("onMouseMove", mainRef.current.translateX);

      setMain((main) =>
        pointerMove(main, itemsLength, event.pageY, event.pageX, setState)
      );
    },
    [itemsLength]
  );

  const onMouseDown = useCallback(
    (event: any) => {
      event.preventDefault();
      event.stopPropagation();

      console.log("onMouseDown");

      setMain((main) => {
        if (itemsLength === 0) return main;

        window.addEventListener("mousemove", onMouseMove, false);
        window.addEventListener("mouseup", onMouseUp, false);

        return pointerDown(
          main,
          initMain,
          setState,
          event.pageX,
          event.pageY,
          0
        );
      });
    },
    [itemsLength]
  );

  return {
    translateX: Math.round(state.translateX),
    isTranslated: state.isTranslated,
    onMouseDown,
    opacity:
      state.translateX === 0
        ? 1
        : calcOpacityByTranslateX(state.translateX, mainRef.current.bodyWidth),
  };
};
 */
