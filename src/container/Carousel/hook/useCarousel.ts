import { useCallback, useState } from "react";
import { calcDecreasedIndex, calcIncreasedIndex, clamp } from "./../utils";

export const useCarousel = (
  itemsLength: number,
  initActiveIndex: number,
  onIndexChange?: (newActiveIndex: number, activeIndex: number) => void
) => {
  const [activeIndex, setActiveIndex] = useState(initActiveIndex);

  const increaseIndex = useCallback(
    () =>
      setActiveIndex((activeIndex) => {
        const newActiveIndex = calcIncreasedIndex(activeIndex, itemsLength);

        //console.log("INCREASE INDEX", newActiveIndex);

        if (onIndexChange !== undefined)
          onIndexChange(newActiveIndex, activeIndex);

        // TODO: Do not start fetch if already fetching photos
        //if (state.activeIndex === newActiveIndex && fetchMore) fetchMore();

        return newActiveIndex;
      }),
    [itemsLength]
  );

  const decreaseIndex = useCallback(
    () =>
      setActiveIndex((activeIndex) => {
        const newActiveIndex = calcDecreasedIndex(activeIndex);

        if (onIndexChange !== undefined)
          onIndexChange(newActiveIndex, activeIndex);

        return newActiveIndex;
      }),
    []
  );

  const setIndex = useCallback(
    () =>
      setActiveIndex((activeIndex) => {
        const newActiveIndex = clamp(activeIndex, 0, itemsLength - 1);

        if (onIndexChange !== undefined)
          onIndexChange(newActiveIndex, activeIndex);

        return newActiveIndex;
      }),
    [itemsLength]
  );

  return {
    activeIndex,
    increaseIndex,
    decreaseIndex,
    setIndex,
  };
};
