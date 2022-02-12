import { MutableRefObject, useCallback, useRef, useState } from "react";
import { batch } from "react-redux";
import {
  chain,
  compose,
  cond,
  Done,
  elif,
  justReturn,
  NI_Next,
  set,
  tap,
} from "fmagic";
import {
  isEnoughDist as isEnoughDist_,
  isIndexIncrease as isIndexIncrease_,
  isTimeDelayTresholdPass as isTimeDelayTresholdPass_,
  isXDirection as isXDirection_,
  //calcOpacityByTranslateX as calcOpacityByTranslateX_,
} from "./helper";
import {
  EVENT_TYPE,
  isMultiTouch as isMultiTouch_,
  identifyOnPointerUp as identifyOnPointerUp_,
} from "./../identifyEvent";
import {
  initMetricks,
  Metricks,
  onTouchStart as collectMetricksOnStart_,
  onTouchMove as collectMetricksOnMove_,
  onTouchEnd as collectMetricksOnEnd_,
  onTouchCancel as collectMetricksOnTouchCancel_,
} from "./../metricks";
import { calcTranslateXOnMove as calcTranslateXOnMove_ } from "./../translateX";

export type EventInfo = {
  pageX: number;
  pageY: number;
  targetTouches?: number;
  type: "POINTER_DONW" | "POINTER_MOVE" | "POINTER_UP";
};

export type SwipeData = Metricks & {
  //opacity: number;
  state: "IDLE" | "ABORT";
  isMoveInit: boolean;
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
};

export type PointerProps = {
  getSwipeData: () => SwipeData;
  pageX: number;
  pageY: number;
};

export type PointerDownProps = PointerProps & {
  targetTouches: number;
  addEventListeners: () => void;
};

export type PointerMoveProps = PointerProps;

export type PointerUpProps = PointerProps & {
  targetTouches: number;
  increaseIndex: () => void;
  decreaseIndex: () => void;
  removeEventListeners: () => void;
  initData: SwipeData;
};

export type TouchCancelProps = {
  getSwipeData: () => SwipeData;
  removeEventListeners: () => void;
  initData: SwipeData;
  targetTouches: number;
};

export const pointerDown_ =
  (
    collectMetricksOnStart: typeof collectMetricksOnStart_,
    isMultiTouch: typeof isMultiTouch_
  ) =>
  ({
    getSwipeData,
    pageX,
    pageY,
    targetTouches,
    addEventListeners,
  }: PointerDownProps): SwipeData =>
    NI_Next.of(getSwipeData())
      // ON ABORT WE DO NOTHING
      .chain((data: SwipeData): NI_Next<SwipeData> | Done =>
        data.state === "ABORT"
          ? Done.of({ ...data, resultDebug: "ABORT" })
          : NI_Next.of(data)
      )
      // CHECK FOR ITEMS LENGTH
      //.tap((data: any) => console.log("BOOM", data))
      .chain((data: SwipeData): NI_Next<SwipeData> | Done =>
        data.itemsLength === 0
          ? Done.of({ ...data, resultDebug: "NO_ITEMS" })
          : NI_Next.of(data)
      )
      // collect metricks
      //.tap((data: any) => console.log("BOOM 1", data))
      .map(
        compose<SwipeData, SwipeData>(
          collectMetricksOnStart(pageX, pageY, targetTouches),
          set("eventType", (data: SwipeData) =>
            isMultiTouch(data.targetTouches) === true
              ? "MULTI_TOUCH"
              : "UNKNOWN"
          ),
          set("bodyWidth", document.documentElement.clientWidth)
        )
      )
      // CHECK FOR MULTI TOUCH
      .chain((data: SwipeData): NI_Next<SwipeData> | Done =>
        data.eventType === "MULTI_TOUCH"
          ? Done.of({ ...data, resultDebug: "MULTI_TOUCH", state: "ABORT" })
          : NI_Next.of(data)
      )
      .tap(() => {
        addEventListeners();
        /* setTranslateState((state) => ({
          ...state,
          isTranslated: true,
        })); */
      })
      .fold(justReturn, justReturn);

export const pointerDown = pointerDown_(collectMetricksOnStart_, isMultiTouch_);

export const pointerMove_ =
  (
    collectMetricksOnMove: typeof collectMetricksOnMove_,
    isTimeDelayTresholdPass: typeof isTimeDelayTresholdPass_,
    isXDirection: typeof isXDirection_,
    calcTranslateXOnMove: typeof calcTranslateXOnMove_
  ) =>
  ({ getSwipeData, pageY, pageX }: PointerMoveProps): SwipeData =>
    NI_Next.of(getSwipeData())
      .chain((data: SwipeData) =>
        data.state === "ABORT" ? Done.of(data) : NI_Next.of(data)
      )
      .map(collectMetricksOnMove(pageX))
      /* .chain((data: SwipeData) =>
        isTimeDelayTresholdPass(data.startTime) === true
          ? NI_Next.of(data)
          : Done.of({ ...data, resultDebug: "NOT_PASS_TIME_DELAY_TRESHOLD" })
      ) 
      .chain((data: SwipeData) =>
        isXDirection(pageX, pageY, data.startX, data.startY) === true
          ? NI_Next.of(data)
          : Done.of({ ...data, resultDebug: "NOT_X_DIRECTION", state: "ABORT" })
      )*/
      .chain(
        elif(
          ({ isMoveInit }: SwipeData) => isMoveInit === false,
          compose(
            (data: SwipeData) =>
              isTimeDelayTresholdPass(data.startTime) === true
                ? NI_Next.of(data)
                : Done.of({
                    ...data,
                    resultDebug: "NOT_PASS_TIME_DELAY_TRESHOLD",
                  }),
            chain((data: SwipeData) =>
              isXDirection(pageX, pageY, data.startX, data.startY) === true
                ? NI_Next.of({ ...data, isMoveInit: true })
                : Done.of({
                    ...data,
                    isMoveInit: true,
                    resultDebug: "NOT_X_DIRECTION",
                    state: "ABORT",
                  })
            )
          ),
          NI_Next.of
        )
      )
      .map(set("resultDebug", "TRANSLATE X"))
      .map(
        set("translateX", (self: SwipeData) =>
          calcTranslateXOnMove(
            pageX,
            self.prevPageX,
            self.activeIndex,
            self.itemsLength,
            self.translateX
          )
        )
      )
      .fold(set("prevPageX", pageX), set("prevPageX", pageX));

export const pointerMove = pointerMove_(
  collectMetricksOnMove_,
  isTimeDelayTresholdPass_,
  isXDirection_,
  calcTranslateXOnMove_
);

export const pointerUp_ =
  (
    collectMetricksOnEnd: typeof collectMetricksOnEnd_,
    identifyOnPointerUp: typeof identifyOnPointerUp_,
    isEnoughDist: typeof isEnoughDist_,
    isIndexIncrease: typeof isIndexIncrease_
  ) =>
  ({
    getSwipeData,
    pageX,
    pageY,
    targetTouches,
    increaseIndex,
    decreaseIndex,
    removeEventListeners,
    initData,
  }: PointerUpProps): //setActiveIndex: (newActiveIndex: number) => void
  //fetchMore?: any,
  //resetZoom?: any
  SwipeData =>
    NI_Next.of(getSwipeData())
      /* .chain((data: SwipeData) =>
          data.eventType === "MULTI_TOUCH"
            ? Done.of({ ...data, resultDebug: "MULTI_TOUCH" })
            : NI_Next.of(data)
        ) */
      .map(collectMetricksOnEnd(pageX, pageY, targetTouches))
      // WE SET ABORT STATE ON POINTER DOWN OR ON POINTER MOVE
      .chain((data: SwipeData) =>
        data.state === "ABORT" ? Done.of(data) : NI_Next.of(data)
      )
      .map(
        set("eventType", (self: SwipeData) =>
          identifyOnPointerUp(self.distX, self.distY, self.elapsedTime)
        )
      )
      .chain((data: SwipeData) =>
        data.eventType === "UNKNOWN"
          ? NI_Next.of(data)
          : Done.of({ ...data, resultDebug: `EVENT_TYPE | ${data.eventType}` })
      )
      .chain((data: SwipeData) =>
        isEnoughDist(data.distX) === true
          ? NI_Next.of(data)
          : Done.of({ ...data, resultDebug: "NOT_ENOUGH_DIST" })
      )
      .map(
        tap(
          elif(
            (data: SwipeData) => isIndexIncrease(data.distX),
            () => increaseIndex(),
            () => decreaseIndex()
          )
        )
      )
      .fold(
        (data: SwipeData) => {
          /*  alert(
            `POINTER_UP_RESULT DONE | ${targetTouches} | ${data.resultDebug} | ${data.targetTouches} | ${data.state}`
          ); */

          if (data.state === "ABORT" && data.targetTouches > 0) {
            return data;
          }

          removeEventListeners();

          return { ...initData };
        },
        (data: SwipeData) => {
          //alert(`POINTER_UP_RESULT NEXT | ${JSON.stringify(data.resultDebug)}`);

          removeEventListeners();

          return { ...initData };
        }
      );

export const pointerUp = pointerUp_(
  collectMetricksOnEnd_,
  identifyOnPointerUp_,
  isEnoughDist_,
  isIndexIncrease_
);

export const touchCancel_ =
  (collectMetricksOnTouchCancel: typeof collectMetricksOnTouchCancel_) =>
  ({
    getSwipeData,
    removeEventListeners,
    initData,
    targetTouches,
  }: TouchCancelProps): SwipeData =>
    compose<SwipeData, SwipeData>(
      getSwipeData,
      collectMetricksOnTouchCancel(targetTouches),
      elif(
        (data: SwipeData) => data.targetTouches > 0,
        (data: SwipeData) => {
          //alert(`TOUCH_CANCEL_RESULT 1 | ${JSON.stringify(data)}`);

          data.state === "ABORT";

          return data;
        },
        (data: SwipeData) => {
          // alert(`TOUCH_CANCEL_RESULT 2 | ${JSON.stringify(data)}`);

          removeEventListeners();

          return { ...initData };
        }
      )
    )();

export const touchCancel = touchCancel_(collectMetricksOnTouchCancel_);
