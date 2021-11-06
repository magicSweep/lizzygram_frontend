import React, { FC } from "react";
import Puks from "../../component/Puks";
import { useSwipeCarousel } from "../Carousel/hook/useSwipeCarousel";

export type SwipeControlsProps = {
  itemsLength: number;
  activeIndex: number;
  increaseIndex: () => void;
  decreaseIndex: () => void;
};

const SwipeControls: FC<SwipeControlsProps> = ({
  itemsLength,
  activeIndex,
  increaseIndex,
  decreaseIndex,
}: any) => {
  const { translateX, isTranslated, onMouseDown } = useSwipeCarousel(
    itemsLength,
    activeIndex,
    increaseIndex,
    decreaseIndex
  );

  return (
    <Puks
      translateX={translateX}
      isTranslated={isTranslated}
      index={activeIndex}
      onMouseDown={onMouseDown}
    />
  );
};

export default SwipeControls;
