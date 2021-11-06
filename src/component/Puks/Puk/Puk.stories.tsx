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
import Puk, { PukProps } from ".";
import { keyframes } from "@mui/system";

export default {
  component: Puk,
  title: "Components/Puk",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  const [state, setState] = useState<Omit<PukProps, "setIndexChange">>({
    position: "left",
    translateX: 0,
    isTranslated: false,
    isIndexChanged: false,
    wrapperWidth: 700,
  });

  const onTranslateXPlus = () =>
    setState((state) => ({
      ...state,
      isTranslated: true,
      isIndexChanged: false,
      translateX: state.translateX + 5,
    }));

  const onTranslateXMinus = () =>
    setState((state) => ({
      ...state,
      isTranslated: true,
      isIndexChanged: false,
      translateX: state.translateX - 5,
    }));

  const onIndexChange = () =>
    setState((state) => ({
      ...state,
      isTranslated: false,
      isIndexChanged: true,
      translateX: 0,
    }));

  const onPositionChange = () =>
    setState((state) => ({
      ...state,
      isTranslated: false,
      isIndexChanged: false,
      translateX: 0,
      position: state.position === "left" ? "right" : "left",
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
        <Puk
          {...state}
          setIndexChange={(v: boolean) =>
            setState((state) => ({ ...state, isIndexChanged: v }))
          }
        />
      </Box>

      <Box>
        <Button onClick={onTranslateXPlus}>Translate +</Button>
        <span> | </span>
        <Button onClick={onTranslateXMinus}>Translate -</Button>
        <span> | </span>
        <Button onClick={onIndexChange}>Index change</Button>
        <span> | </span>
        <Button onClick={onPositionChange}>Position change</Button>
        <span> | </span>
      </Box>
    </>
  );
};

export const Test = () => {
  const [count, setCount] = useState(0);
  const scale = keyframes`
    0% {
      width: 0px;
    }
    50% {
      width: 50px;
    }
    100% {
      width: 0;
    }
  `;

  const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(${360}deg);
  }
`;

  return (
    <>
      <Box
        className="bg-green-300"
        width="0px"
        height="50px"
        sx={{
          animation: `${scale} 1s 1 ease`,
          animationPlayState: count > 0 ? "running" : undefined,
        }}
      ></Box>
      <Button onClick={() => setCount((count) => count + 1)}>Boom</Button>
    </>
  );
};
