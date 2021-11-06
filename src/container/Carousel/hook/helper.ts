const config = {
  maxDistToChangeIndex: 25,
  timeDelayThreshold: 70,
};

export const calcOpacityByTranslateX = (
  translateX: number,
  bodyWidth: number
) => {
  //console.log("calcOpacityByTranslateX", translateX, translateX / bodyWidth);
  const newOpacity =
    Math.round((1 - Math.abs(translateX / bodyWidth)) * 100) / 100;

  return newOpacity < 0.7 ? 0.7 : newOpacity;
};

export const isIndexIncrease = (dist: number) => {
  return dist < 0;
};

export const isEnoughDist_ =
  (maxDistToChangeIndex: number) => (dist: number) => {
    return Math.abs(dist) > maxDistToChangeIndex;
  };

export const isEnoughDist = isEnoughDist_(config.maxDistToChangeIndex);

export const isXDirection = (
  pageX: number,
  pageY: number,
  startX: number,
  startY: number
) => {
  const distX = Math.abs(pageX - startX);
  const distY = Math.abs(pageY - startY);

  return distY < distX;
};

export const isTimeDelayTresholdPass_ =
  (timeDelayThreshold: number) => (startTime: number) =>
    Date.now() - startTime > timeDelayThreshold;

export const isTimeDelayTresholdPass = isTimeDelayTresholdPass_(
  config.timeDelayThreshold
);
