import React, {
  FC,
  MutableRefObject,
  useCallback,
  useRef,
  useState,
} from "react";
import Pukki from "../../../component/Pukki";
import { useSwipeCarousel } from "../../../container/Carousel/hook/useSwipeCarousel";
import ArrowControls from "../../../component/ArrowControls";

export type SliderControlsProps = {
  itemsLength: number;
  activeIndex: number;
  increaseIndex: () => void;
  decreaseIndex: () => void;
  fetchMore: () => void;
  hasNextPage: boolean;
};

const SliderControls: FC<SliderControlsProps> = ({
  itemsLength,
  activeIndex,
  increaseIndex,
  decreaseIndex,
  fetchMore,
  hasNextPage,
}: any) => {
  const [localIndex, setLocalIndex] = useState(1);

  const mainRef: MutableRefObject<any> = useRef({
    itemsLength,
    activeIndex,
  });

  mainRef.current.itemsLength = itemsLength;
  mainRef.current.activeIndex = activeIndex;

  const increaseLocalIndex = useCallback(
    () =>
      mainRef.current.activeIndex < mainRef.current.itemsLength - 1
        ? setLocalIndex(2)
        : fetchMore(),
    []
  );

  const decreaseLocalIndex = useCallback(
    () => (mainRef.current.activeIndex > 0 ? setLocalIndex(0) : null),
    []
  );

  const { translateX, isTranslated, onMouseDown } = useSwipeCarousel(
    itemsLength,
    activeIndex,
    increaseLocalIndex,
    decreaseLocalIndex
  );

  return (
    <>
      <ArrowControls
        hasNextPage={hasNextPage}
        next={increaseLocalIndex}
        prev={decreaseLocalIndex}
        itemsLength={itemsLength}
        activeIndex={activeIndex}
      />

      <Pukki
        setLocalIndex={setLocalIndex}
        increaseGlobalIndex={increaseIndex}
        decreaseGlobalIndex={decreaseIndex}
        translateX={translateX}
        isTranslated={isTranslated}
        localIndex={localIndex}
        onMouseDown={onMouseDown}
      />
    </>
  );
};

export default SliderControls;
