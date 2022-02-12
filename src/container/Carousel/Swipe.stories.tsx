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
  const [state, setState] = useState({
    targetTouches: 0,
    moveTouches: 0,
  });

  const { getDebugData, translateX, isTranslated, onMouseDown, onTouchStart } =
    useSwipeCarousel(
      5,
      3,
      () => console.log("Increase index"),
      () => console.log("Decrease index")
    );

  const debugData = getDebugData();

  /* const ionTouchStart = (event: any) => {
    setState((state) => ({ ...state, targetTouches: state.targetTouches + 1 }));

    console.log(event.targetTouches);

    onTouchStart(event);
  }; */

  /* const ionTouchMove = (event: any) => {
    const touchesLength = event.changedTouches.length;

    const res: any = {};

    /* for (let i = 0; i < touchesLength; i++) {
      res[i] = {
        pageX: event.changedTouches[i].pageX,
        pageY: event.changedTouches[i].pagey,
      };
    } /

    setState((state) => ({
      ...state,
      moveTouches: touchesLength,
    }));

    console.log(event.targetTouches);

    //onTouchStart(event);
  }; */

  /* const ionTouchEnd = (event: any) => {
    setState((state) => ({ ...state, targetTouches: state.targetTouches - 1 }));

    console.log(event.targetTouches);

    //onTouchStart(event);
  }; */

  const onTouchCancel = (event: any) => {
    setState((state) => ({ ...state, targetTouches: state.targetTouches - 1 }));

    console.log(event.targetTouches);

    //onTouchStart(event);
  };

  console.log("[RENDER SWIPE]");

  return (
    <Box
      width="700px"
      height="500px"
      bgcolor="violet"
      className="relative m-auto select-none"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      //onTouchMove={onTouchMove}
      //onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
      p="30px"
    >
      <Box typography="body2">eventType: {debugData.eventType}</Box>
      <Box typography="body2">
        isTranslated: {debugData.isTranslated === true ? "true" : "false"}
      </Box>
      <Box typography="body2">BOOOM targetTouches: {state.targetTouches}</Box>
      <Box typography="body2">
        BOOOM MOVE targetTouches: {JSON.stringify(state.moveTouches)}
      </Box>
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

export const Simple = () => {
  const [state, setState] = useState({
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
  });

  const onTouchStart = (event: any) => {
    const targetTouches = event.targetTouches.length;
    const touches = event.touches.length;
    const changedTouches = event.changedTouches.length;

    setState((state) => ({ ...state, targetTouches, touches, changedTouches }));

    console.log();
  };

  const onTouchMove = (event: any) => {
    const targetTouches = event.targetTouches.length;
    const touches = event.touches.length;
    const changedTouches = event.changedTouches.length;

    setState((state) => ({ ...state, targetTouches, touches, changedTouches }));

    console.log(event.targetTouches);
  };

  const onTouchEnd = (event: any) => {
    const targetTouches = event.targetTouches.length;
    const touches = event.touches.length;
    const changedTouches = event.changedTouches.length;

    setState((state) => ({ ...state, targetTouches, touches, changedTouches }));

    console.log(event.targetTouches);
  };

  const onTouchCancel = (event: any) => {
    const targetTouches = event.targetTouches.length;
    const touches = event.touches.length;
    const changedTouches = event.changedTouches.length;

    setState((state) => ({ ...state, targetTouches, touches, changedTouches }));

    console.log(event.targetTouches);
  };

  return (
    <Box
      width="700px"
      height="500px"
      bgcolor="violet"
      className="relative m-auto select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
      p="30px"
    >
      <Box typography="body2">touches: {state.touches}</Box>
      <Box typography="body2">targetTouches: {state.targetTouches}</Box>
      <Box typography="body2">changedTouches: {state.changedTouches}</Box>
    </Box>
  );
};
