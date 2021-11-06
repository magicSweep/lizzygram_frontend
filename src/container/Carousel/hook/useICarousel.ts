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
import { calcDecreasedIndex, calcIncreasedIndex, clamp } from "./../utils";

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
  itemsLength: number,
  setTranslateState: any,
  onIndexChange?: (newActiveIndex: number, activeIndex: number) => void
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
            elif(
              (main: Main) =>
                main.eventType === "UNKNOWN" &&
                isEnoughDist(main.distX) === true,
              compose(
                elif(
                  (main: Main) => isIndexIncrease(main.distX),
                  (main: Main) => {
                    const newActiveIndex = calcIncreasedIndex(
                      main.activeIndex,
                      itemsLength
                    );

                    /// if (main.activeIndex === newActiveIndex && fetchMore)
                    // fetchMore();

                    return newActiveIndex;
                  },
                  (main: Main) => calcDecreasedIndex(main.activeIndex)
                ),
                (newActiveIndex: number) => {
                  //batch(() => {
                  setTranslateState((state: any) => {
                    if (onIndexChange !== undefined)
                      onIndexChange(newActiveIndex, state.activeIndex);

                    return {
                      ...state,
                      activeIndex: newActiveIndex,
                      translateX: 0,
                      isTranslated: false,
                    };
                  });

                  //if (resetZoom) resetZoom();
                  // });
                }
              ),
              () => {
                setTranslateState((state: any) => ({
                  ...state,
                  translateX: 0,
                  isTranslated: false,
                }));
              }
            )
          )
        );

export const useCarousel = (
  itemsLength: number,
  initActiveIndex: number,
  onIndexChange?: (newActiveIndex: number, activeIndex: number) => void
) => {
  const mainRef: MutableRefObject<Main> = useRef({
    ...initMain,
  });

  const [state, setState] = useState({
    //opacity: 1,
    translateX: 0,
    isTranslated: false,
    activeIndex: initActiveIndex,
  });

  mainRef.current.translateX = state.translateX;
  mainRef.current.activeIndex = state.activeIndex;

  const increaseIndex = useCallback(
    () =>
      setState((state) => {
        const newActiveIndex = calcIncreasedIndex(
          state.activeIndex,
          itemsLength
        );

        console.log("INCREASE INDEX", newActiveIndex);

        if (onIndexChange !== undefined)
          onIndexChange(newActiveIndex, state.activeIndex);

        // TODO: Do not start fetch if already fetching photos
        //if (state.activeIndex === newActiveIndex && fetchMore) fetchMore();

        return {
          ...state,
          activeIndex: newActiveIndex,
        };
      }),
    [itemsLength]
  );

  const decreaseIndex = useCallback(
    () =>
      setState((state) => {
        const newActiveIndex = calcDecreasedIndex(state.activeIndex);

        if (onIndexChange !== undefined)
          onIndexChange(newActiveIndex, state.activeIndex);

        return {
          ...state,
          activeIndex: newActiveIndex,
        };
      }),
    []
  );

  const setIndex = useCallback(
    () =>
      setState((state) => {
        const newActiveIndex = clamp(state.activeIndex, 0, itemsLength - 1);

        if (onIndexChange !== undefined)
          onIndexChange(newActiveIndex, state.activeIndex);

        return {
          ...state,
          activeIndex: newActiveIndex,
        };
      }),
    [itemsLength]
  );

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

      setMain((main) =>
        pointerUp(
          main,
          event.pageX,
          event.pageY,
          itemsLength,
          setState,
          onIndexChange
        )
      );
    },
    [itemsLength]
  );

  const onMouseMove = useCallback(
    (event: any) => {
      event.preventDefault();
      event.stopPropagation();

      console.log("onMouseMove");

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
    setIndex,
    increaseIndex,
    decreaseIndex,
    translateX: Math.round(state.translateX),
    isTranslated: state.isTranslated,
    activeIndex: state.activeIndex,
    //onMouseUp,
    //onMouseMove,
    onMouseDown,
    opacity:
      state.translateX === 0
        ? 1
        : calcOpacityByTranslateX(state.translateX, mainRef.current.bodyWidth),
  };
};
