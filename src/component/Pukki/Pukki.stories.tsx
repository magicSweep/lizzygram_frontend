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
import Pukki from ".";

export default {
  component: Pukki,
  title: "Components/Pukki",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const [state, setState] = useState<any>({
    translateX: 0,
    localIndex: 1,
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

  const setIndex = (index: number) =>
    setState((state) => ({
      ...state,
      localIndex: index,
    }));

  const onIndexIncrease = () =>
    setState((state) => ({
      ...state,
      isTranslated: false,
      translateX: 0,
      localIndex: 2,
    }));

  const onIndexDecrease = () =>
    setState((state) => ({
      ...state,
      isTranslated: false,
      translateX: 0,
      localIndex: 0,
    }));
  /* setState((state) => ({
      ...state,
      isTranslated: false,
      translateX: 0,
      localIndex: state.localIndex > 0 ? state.localIndex - 1 : state.localIndex,
    })); */

  const onTouchEnd = () =>
    setState((state) => ({
      ...state,
      isTranslated: false,
      translateX: 0,
    }));

  return (
    <>
      <Box className="relative m-auto bg-black" width="800px" height="500px">
        <Pukki
          translateX={state.translateX}
          isTranslated={state.isTranslated}
          localIndex={state.localIndex}
          setLocalIndex={setIndex}
          increaseGlobalIndex={() => {}}
          decreaseGlobalIndex={() => {}}
          onMouseDown={() => console.log("onMouseDown")}
        />
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

export const TestColor = () => {
  return (
    <Box
      sx={{
        width: "700px",
        height: "400px",
        m: "auto",
        background: "linear-gradient(-90deg, black, 10%, #3e0017)",
        borderLeft: "2px solid red",
      }}
    ></Box>
  );
};
