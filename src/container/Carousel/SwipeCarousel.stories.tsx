import Button from "@mui/material/Button";
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
import ArrowControls from "../../component/ArrowControls";
import SwipeControls from "../SwipeControls";
import { useCarousel } from "./hook/useCarousel";
//import { photos } from "./../../../mock/fake.data";
//import { useSwipeCarousel } from "./hook/useSwipeCarousel";
//import Puks from "./../../component/Puks";

export default {
  component: Fragment,
  title: "Carousel/SwipeCarousel",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const items = [0, 1, 2, 3, 4, 5];

const SwipeCarousel = () => {
  const { activeIndex, increaseIndex, decreaseIndex, setIndex } = useCarousel(
    items.length,
    0
  );

  console.log("[RENDER SWIPE CAROUSEL]", activeIndex);

  return (
    <>
      <Box width="700px" height="400px" className="relative m-auto bg-black">
        <Box className="w-full h-full bg-green-200 text-center pt-12">
          <p>Active index - {activeIndex}</p>
        </Box>

        <ArrowControls next={increaseIndex} prev={decreaseIndex} />

        <SwipeControls
          itemsLength={items.length}
          increaseIndex={increaseIndex}
          decreaseIndex={decreaseIndex}
          activeIndex={activeIndex}
        />
      </Box>
    </>
  );
};

export const Default = () => {
  return <SwipeCarousel />;
};
