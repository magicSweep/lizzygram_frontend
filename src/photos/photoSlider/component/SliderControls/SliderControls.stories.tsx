//import { Button } from "@mui/material";
import Box from "@mui/system/Box";
import React, {
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
import SliderControls from ".";
import { useCarousel } from "../../../../container/Carousel/hook/useCarousel";

export default {
  component: SliderControls,
  title: "Component/SliderControls",
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

  console.log("[RENDER SLIDER CONTROLS]", activeIndex);

  return (
    <>
      <Box width="700px" height="400px" className="relative m-auto bg-black">
        <SliderControls
          increaseIndex={increaseIndex}
          decreaseIndex={decreaseIndex}
          activeIndex={activeIndex}
          itemsLength={5}
          fetchMore={() => console.log("fetchMore")}
          hasNextPage={true}
        />
      </Box>
      <Box
        component="p"
        typography="h4"
        width="700px"
        className="relative m-auto py-3 text-center"
      >
        {activeIndex}
      </Box>
    </>
  );
};
