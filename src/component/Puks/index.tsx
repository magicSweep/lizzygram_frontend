import React, {
  FC,
  useMemo,
  useRef,
  MutableRefObject,
  useEffect,
  useState,
  useCallback,
} from "react";
import Puk from "./Puk";

export type PuksProps = {
  translateX: number;
  isTranslated: boolean;
  index: number;
  onMouseDown: any;
};

const Puks: FC<PuksProps> = ({
  translateX,
  isTranslated,
  index,
  onMouseDown,
}) => {
  const wrapperRef: MutableRefObject<HTMLElement> = useRef(null);

  const prevIndexRef: MutableRefObject<number> = useRef(index);

  const [triggerUpdate, setTriggerUpdate] = useState(0);

  const setIndexChange = useCallback(
    (v: boolean) => setTriggerUpdate((tr) => tr + 1),
    []
  );

  useEffect(() => {
    prevIndexRef.current = index;
    //console.log("[USE EFFECT PUKS]", prevIndexRef.current, index);
  }, [index]);

  const wrapperWidth = useMemo(() => {
    return wrapperRef.current === null
      ? 0
      : wrapperRef.current.getBoundingClientRect().width;
  }, [isTranslated, index]);

  /* console.log(
    "[RENDER PUKS]",
    prevIndexRef.current,
    index,
    translateX,
    isTranslated
  ); */

  // CHECK INDEX FOR WHAT PUK WAS CHANGED
  return (
    <div
      ref={wrapperRef as any}
      onMouseDown={onMouseDown}
      className="absolute inset-0 flex"
    >
      <Puk
        position="left"
        translateX={translateX > 0 ? translateX : 0}
        isTranslated={isTranslated}
        isIndexChanged={
          prevIndexRef.current !== index && index - prevIndexRef.current < 0
        }
        wrapperWidth={wrapperWidth}
        setIndexChange={setIndexChange}
      />
      <Puk
        position="right"
        translateX={translateX < 0 ? translateX : 0}
        isTranslated={isTranslated}
        isIndexChanged={
          prevIndexRef.current !== index && index - prevIndexRef.current > 0
        }
        wrapperWidth={wrapperWidth}
        setIndexChange={setIndexChange}
      />
    </div>
  );
};

export default Puks;
