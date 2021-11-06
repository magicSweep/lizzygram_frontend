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
import SwipeControls, { SwipeControlsProps } from ".";
import { useCarousel } from "../Carousel/hook/useCarousel";

export default {
  component: SwipeControls,
  title: "Container/SwipeControls",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const { activeIndex, increaseIndex, decreaseIndex, setIndex } = useCarousel(
    5,
    0
  );
  /* 
  const { translateX, isTranslated, onMouseDown } = useSwipeCarousel(
    5,
    activeIndex,
    increaseIndex,
    decreaseIndex
  ); */

  console.log("[RENDER SWIPE CAROUSEL]", activeIndex);

  return (
    <>
      <Box width="700px" height="400px" className="relative m-auto bg-black">
        <SwipeControls
          increaseIndex={increaseIndex}
          decreaseIndex={decreaseIndex}
          activeIndex={activeIndex}
          itemsLength={5}
        />
      </Box>
    </>
  );
};
