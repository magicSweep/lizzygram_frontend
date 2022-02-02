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
import Pukki from "../../component/Pukki";
import { useCarousel } from "./hook/useCarousel";
import { useSwipeCarousel } from "./hook/useSwipeCarousel";
//import { photos } from "./../../../mock/fake.data";
//import { useSwipeCarousel } from "./hook/useSwipeCarousel";
//import Puks from "./../../component/Puks";

export default {
  component: Fragment,
  title: "Carousel/Swipe",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const items = [0, 1, 2, 3, 4, 5];

const Swipe = () => {
  const [targetTouches, setTargetTouches] = useState(0);

  const { debugData, translateX, isTranslated, onMouseDown, onTouchStart } =
    useSwipeCarousel(
      5,
      3,
      () => console.log("Increase index"),
      () => console.log("Decrease index")
    );

  const ionTouchStart = (event: any) => {
    setTargetTouches((targetTouches) => targetTouches + 1);

    console.log(event.targetTouches);

    onTouchStart(event);
  };

  console.log("[RENDER SWIPE]");

  return (
    <Box
      width="700px"
      height="500px"
      bgcolor="violet"
      className="relative m-auto"
      onMouseDown={onMouseDown}
      onTouchStart={ionTouchStart}
      p="30px"
    >
      <Box typography="body2">eventType: {debugData.eventType}</Box>
      <Box typography="body2">
        isTranslated: {debugData.isTranslated === true ? "true" : "false"}
      </Box>
      <Box typography="body2">BOOOM targetTouches: {targetTouches}</Box>
      <Box typography="body2">targetTouches: {debugData.targetTouches}</Box>

      <Box typography="body2">------------------------------</Box>

      <Box typography="body2">translateX: {debugData.translateX}</Box>
      <Box typography="body2">activeIndex: {debugData.activeIndex}</Box>

      <Box typography="body2">------------------------------</Box>

      <Box typography="body2">startX: {debugData.startX}</Box>
      <Box typography="body2">startY: {debugData.startY}</Box>
      <Box typography="body2">prevPageX: {debugData.prevPageX}</Box>
      <Box typography="body2">distX: {debugData.distX}</Box>
      <Box typography="body2">distY: {debugData.distY}</Box>

      <Box typography="body2">------------------------------</Box>

      <Box typography="body2">
        lastFiveXTouchMove: {JSON.stringify(debugData.lastFiveXTouchMove)}
      </Box>
      <Box typography="body2">
        lastFiveXToucheMoveSum: {debugData.lastFiveXToucheMoveSum}
      </Box>

      <Box typography="body2">------------------------------</Box>

      <Box typography="body2">elapsedTime: {debugData.elapsedTime}</Box>
      <Box typography="body2">
        elapsedTimeAfterMove: {debugData.elapsedTimeAfterMove}
      </Box>
      <Box typography="body2">startTime: {debugData.startTime}</Box>
      <Box typography="body2">
        startTimeAfterMove: {debugData.startTimeAfterMove}
      </Box>
    </Box>
  );
};

export const Default = () => {
  return <Swipe />;
};
