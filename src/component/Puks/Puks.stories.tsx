import { Button } from "@mui/material";
import Box from "@mui/system/Box";
import {
  Fragment,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
  Children,
  isValidElement,
  FC,
} from "react";
import Puks, { PuksProps } from ".";
import { useCarousel as useICarousel } from "../../container/Carousel/hook/useICarousel";
import { useCarousel } from "../../container/Carousel/hook/useCarousel";
import { useSwipeCarousel } from "../../container/Carousel/hook/useSwipeCarousel";

export default {
  component: Puks,
  title: "Components/Puks",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  //PuksProps
  const [state, setState] = useState<any>({
    translateX: 0,
    index: 0,
    isTranslated: false,
  });

  const onTranslateXPlus = () =>
    setState((state) => ({
      ...state,
      isTranslated: true,
      translateX: state.translateX + 5,
    }));

  const onTranslateXMinus = () =>
    setState((state) => ({
      ...state,
      isTranslated: true,
      translateX: state.translateX - 5,
    }));

  const onIndexIncrease = () =>
    setState((state) => ({
      ...state,
      isTranslated: false,
      translateX: 0,
      index: state.index + 1,
    }));

  const onIndexDecrease = () =>
    setState((state) => ({
      ...state,
      isTranslated: false,
      translateX: 0,
      index: state.index > 0 ? state.index - 1 : state.index,
    }));

  const onTouchEnd = () =>
    setState((state) => ({
      ...state,
      isTranslated: false,
      translateX: 0,
    }));

  return (
    <>
      <Box
        className="relative"
        width="700px"
        height="400px"
        m="auto"
        bgcolor="black"
      >
        <Puks {...state} />
      </Box>

      <Box>
        <Button onClick={onTranslateXPlus}>Translate +</Button>
        <span> | </span>
        <Button onClick={onTranslateXMinus}>Translate -</Button>
        <span> | </span>
        <Button onClick={onIndexIncrease}>Index increase</Button>
        <span> | </span>
        <Button onClick={onIndexDecrease}>Index decrease</Button>
        <span> | </span>
        <Button onClick={onTouchEnd}>Touch end</Button>
      </Box>
    </>
  );
};

/* export const Swipe = () => {
  const {
    activeIndex,
    increaseIndex,
    decreaseIndex,
    setIndex,
    translateX,
    isTranslated,
    onMouseDown,
  } = useCarousel(5, 0);
  /* 
  const { translateX, isTranslated, onMouseDown } = useSwipeCarousel(
    5,
    activeIndex,
    increaseIndex,
    decreaseIndex
  ); /

  console.log("[RENDER SWIPE CAROUSEL]", activeIndex, translateX);

  return (
    <>
      <Box
        onMouseDown={onMouseDown}
        width="700px"
        height="400px"
        className="relative m-auto bg-black"
      >
        <Puks
          translateX={translateX}
          isTranslated={isTranslated}
          index={activeIndex}
        />
      </Box>
    </>
  );
};
 */
