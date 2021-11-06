import Box from "@mui/system/Box";
import { FC, MutableRefObject, useRef } from "react";
import { calcPukWidth } from "./helper";

export type PukProps = {
  position: "left" | "right";
  wrapperWidth: number;
  isIndexChanged: boolean;
  setIndexChange: (v: boolean) => void;
  translateX: number;
  isTranslated: boolean;
};

const Puk: FC<PukProps> = ({
  position,
  translateX,
  isTranslated,
  isIndexChanged,
  wrapperWidth,
  setIndexChange,
}) => {
  const selfRef: MutableRefObject<HTMLElement> = useRef(null);

  const width = `${calcPukWidth(
    translateX,
    wrapperWidth,
    isIndexChanged
    //index === prevIndexRef.current
  )}px`;

  //prevIndexRef.current = index;

  const onTransitionEnd = () => {
    const { width } = selfRef.current.getBoundingClientRect();

    if (width !== 0) {
      setIndexChange(false);
    }

    //console.log("[onTransitionEnd]", width);
  };

  /*  console.log(
    "[RENDER PUK]",
    position,
    width,
    translateX,
    isTranslated,
    isIndexChanged
  ); */

  return (
    <Box
      ref={selfRef}
      className={`h-full bg-green-300 ${position === "left" ? "" : "ml-auto"}`}
      onTransitionEnd={onTransitionEnd}
      style={{
        width,
      }}
      sx={{
        transitionProperty: isTranslated === true ? "none" : "width",
        transitionDuration: "150ms",
        transitionTimingFunction: "ease-in",
        //width,
      }}
    ></Box>
  );
};

export default Puk;
