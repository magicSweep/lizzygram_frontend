import { compose, set, tap } from "fmagic";
//import { ExtEventInfo, EventInfo } from "./../../../types";

export type Metricks = {
  isTranslated: boolean;

  targetTouches: number;

  startX: number;
  startY: number;

  prevPageX: number;
  lastFiveXTouchMove: number[];
  lastFiveXToucheMoveSum: number;

  distX: number;
  distY: number;

  elapsedTime: number;
  elapsedTimeAfterMove: number;
  startTime: number;
  startTimeAfterMove: number;
};

export const initMetricks: Metricks = {
  isTranslated: false,

  targetTouches: 0,

  startX: 0,
  startY: 0,

  prevPageX: 0,
  lastFiveXTouchMove: [],
  lastFiveXToucheMoveSum: 0,

  distX: 0,
  distY: 0,

  elapsedTime: 0,
  elapsedTimeAfterMove: 0,
  startTime: 0,
  startTimeAfterMove: 0,
};

export const getInitMetrics = () => ({ ...initMetricks });

export const onTouchStart = (
  pageX: number,
  pageY: number,
  targetTouches: number
) =>
  compose<Metricks, Metricks>(
    tap((metricks: Metricks) =>
      metricks.isTranslated === false
        ? (metricks.targetTouches = targetTouches)
        : (metricks.targetTouches += targetTouches)
    ),
    set("isTranslated", true),
    set("startX", pageX),
    set("startY", pageY),
    set("prevPageX", pageX),
    set("lastFiveXTouchMove", []),
    set("lastFiveXToucheMoveSum", 0),
    set("distX", 0),
    set("distY", 0),
    set("elapsedTime", 0),
    set("elapsedTimeAfterMove", 0),
    set("startTime", Date.now()),
    set("startTimeAfterMove", 0)
  );

export const onTouchMove = (pageX: number) =>
  compose<Metricks, Metricks>(
    set("lastFiveXTouchMove", (self: Metricks) => {
      const lastFiveXTouchMove = self.lastFiveXTouchMove;
      if (lastFiveXTouchMove.length === 5) {
        lastFiveXTouchMove.shift();
      }

      lastFiveXTouchMove.push(self.prevPageX - pageX);

      return lastFiveXTouchMove;
    }),
    set("startTimeAfterMove", Date.now())
  );

export const onTouchMoveAfterAll = (
  pageX: number
  //pageY: number
) => set("prevPageX", pageX);

export const onTouchEnd = (pageX: number, pageY: number) =>
  compose<Metricks, Metricks>(
    set("distX", (self: Metricks) => pageX - self.startX),
    set("distY", (self: Metricks) => pageY - self.startY),
    set("elapsedTime", (self: Metricks) => Date.now() - self.startTime),
    set("lastFiveXToucheMoveSum", (self: Metricks) =>
      self.lastFiveXTouchMove.reduce(
        (acc: number, curr: number) => acc + curr,
        0
      )
    ),
    set(
      "elapsedTimeAfterMove",
      (self: Metricks) => Date.now() - self.startTimeAfterMove
    ),
    set("isTranslated", false)
  );

/* {
  metricks.distX = pageX - metricks.startX; // get total dist traveled by finger while in contact with surface
  metricks.distY = pageY - metricks.startY;
  metricks.elapsedTime = Date.now() - metricks.startTime;

  metricks.lastFiveXToucheMoveSum = metricks.lastFiveXTouchMove.reduce(
    (a: number, b: number) => a + b,
    0
  );

  (metricks.elapsedTimeAfterMove = Date.now() - metricks.startTimeAfterMove),
    (metricks.isTranslated = false);
} */
