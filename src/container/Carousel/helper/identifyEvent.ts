export type EVENT_TYPE =
  //| "ABORT"
  | "UNKNOWN"
  | "CLICK"
  | "DOUBLE_CLICK"
  | "LONG_TAP"
  | "SWIPE"
  | "SWIPE_MOVE"
  | "MOVE"
  | "MULTI_TOUCH";

export const config = {
  clickAndLongtapDistThreshold: 15,

  clickTimeThreshold: 150,
  longtapTimeThreshold: 500,

  noMoveDistThreshold: 100,
  //timeDelayThreshold: 70,
};

//export type PointerEvent = "POINTER_DOWN" | "POINTER_MOVE" | "POINTER_UP";

export const isMultiTouch = (targetTouches: number) => targetTouches > 1;

export const identifyOnPointerDown = (targetTouches: number) =>
  targetTouches > 1 ? "MULTI_TOUCH" : "UNKNOWN";

export const identifyOnPointerUp_ = (
  clickAndLongtapDistThreshold: number,
  clickTimeThreshold: number
) => (distX: number, distY: number, elapsedTime: number): EVENT_TYPE => {
  if (
    Math.abs(distX) < clickAndLongtapDistThreshold &&
    Math.abs(distY) < clickAndLongtapDistThreshold
  ) {
    if (elapsedTime < clickTimeThreshold) {
      return "CLICK";
    } else {
      return "LONG_TAP";
    }
  }

  return "UNKNOWN";
};

export const identifyOnPointerUp = identifyOnPointerUp_(
  config.clickAndLongtapDistThreshold,
  config.clickTimeThreshold
);

/* export const identify_ = (
  clickAndLongtapDistThreshold: number,
  clickTimeThreshold: number
) => (
  pointerEvent: PointerEvent,
  targetTouches: number,
  distX?: number,
  distY?: number,
  elapsedTime?: number
): EVENT_TYPE => {
  if (targetTouches > 1) return "MULTI_TOUCH";

  if (pointerEvent === "POINTER_UP") {
    if (
      Math.abs(distX) < clickAndLongtapDistThreshold &&
      Math.abs(distY) < clickAndLongtapDistThreshold
    ) {
      if (elapsedTime < clickTimeThreshold) {
        return "CLICK";
      } else {
        return "LONG_TAP";
      }
    }
  }

  return "UNKNOWN";
}; */
