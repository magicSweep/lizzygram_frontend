import Box from "@mui/system/Box";
import React, { MutableRefObject, useRef, useMemo, FC, useEffect } from "react";
import { batch } from "react-redux";
import { cond } from "fmagic";

export type PukkiProps = {
  translateX: number;
  isTranslated: boolean;
  localIndex: number;
  setLocalIndex: any;
  increaseGlobalIndex: any;
  decreaseGlobalIndex: any;
  //isLeftEnd: boolean;
  //isRightEnd: boolean;
  //globalIndex: number;
  onMouseDown: any;
};

/* isTranslated === true
              ? `translateX(${fTranslateX}px)`
              : `translateX(-${localIndex * 100}%)`, 
const calcTransform = (isTranslated: boolean, translateX: number, localIndex: number, isLeftEnd: boolean,
  isRightEnd: boolean) => cond(
  [
    [() => isTranslated === true, () => `translateX(${translateX}px)` ],
    [() => isTranslated === false && isLeftEnd === true, () => "helo"]
  ]
)();*/

const clamp = (val: number, max: number, min: number) =>
  val >= max ? max : val <= min ? min : val;

const Pukki: FC<PukkiProps> = ({
  translateX,
  isTranslated,
  //globalIndex,
  setLocalIndex,
  increaseGlobalIndex,
  decreaseGlobalIndex,
  localIndex,
  onMouseDown,
}) => {
  const wrapperRef: MutableRefObject<HTMLDivElement> = useRef(null);

  /*   const indexesRef: MutableRefObject<any> = useRef({
      prevLocalIndex: localIndex,
      isLocalIndexChanged: false,
      isLocalIndexIncrease: false
  }); */

  /*  useEffect(() => {
    indexesRef.current.prevLocalIndex = localIndex;
    //console.log("[USE EFFECT PUKS]", prevIndexRef.current, index);
  }, [localIndex]); */

  // prevIndexRef.current !== index && index - prevIndexRef.current > 0

  const wrapperWidth = useMemo(() => {
    return wrapperRef.current === null
      ? 0
      : wrapperRef.current.getBoundingClientRect().width;
  }, [isTranslated, localIndex]);

  const minTranslateX = -wrapperWidth * 2 + 100;
  const maxTranslateX = -100;

  const fTranslateX = clamp(
    -wrapperWidth + translateX,
    maxTranslateX,
    minTranslateX
  );

  //prevIndexRef.current = index;

  const onTransitionEnd = () => {
    //console.log("ON TRANSITION END", localIndex);
    if (localIndex === 1) return;

    batch(() => {
      setLocalIndex(1);
      const isIndexIncrease = localIndex > 1;
      isIndexIncrease === true ? increaseGlobalIndex() : decreaseGlobalIndex();
    });
    /* const { width } = wrapperRef.current.getBoundingClientRect();
  
      if (width !== 0) {
        setIndexChange(false);
      } */

    //console.log("[onTransitionEnd]", width);
  };

  /* console.group("[RENDER PUKKI]");

  console.log("translateX", translateX);
  console.log("wrapperWidth", wrapperWidth);
  console.log("fTranslateX", fTranslateX);

  console.groupEnd(); */

  return (
    <div
      ref={wrapperRef}
      onMouseDown={onMouseDown}
      className="absolute inset-0 overflow-hidden"
    >
      <Box
        className="w-full h-full flex flex-nowrap"
        onTransitionEnd={onTransitionEnd}
        sx={{
          transform:
            isTranslated === true
              ? `translateX(${fTranslateX}px)`
              : `translateX(-${localIndex * 100}%)`,
          transitionProperty: isTranslated === true ? "none" : "transform",
          transitionDuration: "150ms",
          transitionTimingFunction: "ease-in",
          //width,
        }}
      >
        <div className="w-full h-full flex-shrink-0 flex-grow-1 left-pukki-gradient"></div>
        <div className="w-full h-full bg-transparent  flex-shrink-0 flex-grow-1"></div>
        <div className="w-full h-full flex-shrink-0 flex-grow-1 right-pukki-gradient"></div>
      </Box>
    </div>
  );
};

export default Pukki;
