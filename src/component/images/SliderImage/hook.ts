import { MutableRefObject, useState, useRef, useEffect } from "react";
import { aspectRatio as calcAspectRatio } from "../helper";
import {
  calcIsWidthAuto,
  calcIsWrapperHigher,
  calcIsWrapperWider,
} from "./helper";

export type Main = {
  init: boolean;
  observer: null | ResizeObserver;
  wrapperAspectRatio: number;
  photoAspectRatio: number;
  isBigger: boolean | undefined;
};

export const onResize =
  (mainRef: MutableRefObject<Main>, setIsBigger: any) => (entries) => {
    // Only care about the first element, we expect one element ot be watched
    //const { width } = entries[0].contentRect
    //const entry = entries[0];

    const { width, height } = entries[0].contentRect;

    const newWrapperAspectRatio = calcAspectRatio(width, height);

    const newIsBigger =
      newWrapperAspectRatio >= mainRef.current.photoAspectRatio;

    if (newIsBigger !== mainRef.current.isBigger) setIsBigger(newIsBigger);

    /*  console.log(
      "RESIZE",
      newWrapperAspectRatio,
      mainRef.current.photoAspectRatio
    ); */

    mainRef.current.wrapperAspectRatio = newWrapperAspectRatio;
  };

export const useWrapperSize = (aspectRatio: number, zoom: number) => {
  const wrapperRef: MutableRefObject<HTMLDivElement> = useRef();

  const mainRef: MutableRefObject<Main> = useRef({
    init: false,
    observer: null,
    wrapperAspectRatio: 0,
    photoAspectRatio: aspectRatio,
    isBigger: undefined,
  });

  const [isBigger, setIsBigger] = useState<undefined | boolean>(undefined);

  // SAVE STATE DATA TO REF - TO GET POSSIBILITY TO COMPARE VALUES WITHOUT CALLING setIsBigger
  mainRef.current.isBigger = isBigger;
  mainRef.current.photoAspectRatio = aspectRatio;

  // INITIALIZE RESIZE OBSERVER
  if (mainRef.current.init === false) {
    mainRef.current.observer = new ResizeObserver(
      onResize(mainRef, setIsBigger)
    );

    mainRef.current.init = true;
  }

  useEffect(() => {
    mainRef.current.observer.observe(wrapperRef.current);

    return () => {
      mainRef.current.observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const { width, height } = wrapperRef.current.getBoundingClientRect();

    mainRef.current.wrapperAspectRatio = calcAspectRatio(width, height);

    const newIsBigger = mainRef.current.wrapperAspectRatio >= aspectRatio;

    if (newIsBigger !== isBigger) setIsBigger(newIsBigger);

    //setIsBigger(mainRef.current.wrapperAspectRatio >= aspectRatio);
  }, [aspectRatio]);

  const isWrapperWider =
    isBigger === undefined
      ? true
      : calcIsWrapperWider(
          zoom,
          calcIsWidthAuto(isBigger),
          mainRef.current.wrapperAspectRatio,
          aspectRatio
        );
  const isWrapperHigher =
    isBigger === undefined
      ? true
      : calcIsWrapperHigher(
          zoom,
          calcIsWidthAuto(isBigger),
          mainRef.current.wrapperAspectRatio,
          aspectRatio
        );

  /* console.log(
    "useWrapperSize",
    isBigger,
    calcIsWidthAuto(isBigger),
    mainRef.current.wrapperAspectRatio,
    aspectRatio
  ); */
  //console.log("useWrapperSize", isBigger, zoom);

  return {
    isWrapperWider,
    isWrapperHigher,
    isWrapperAspectRatioBigger: isBigger,
    wrapperRef,
  };
};

export const useOnChangeImage = (
  src: string,
  setLoaded: (loaded: boolean) => void
) => {
  const prevSrcRef: MutableRefObject<string> = useRef(src);

  useEffect(() => {
    if (prevSrcRef.current !== src) {
      setLoaded(false);
    }

    prevSrcRef.current = src;
  }, [src]);
};

/* export const useIsWrapperAspectRatioBigger = (
  //elRef: MutableRefObject<HTMLDivElement>,
  aspectRatio: number
) => {
  const wrapperRef: MutableRefObject<HTMLDivElement> = useRef();

  const mainRef: MutableRefObject<any> = useRef({
    init: false,
    observer: null,
    prevWrapperAspectRatio: 0,
    isBigger: undefined,
  });

  const [isBigger, setIsBigger] = useState<undefined | boolean>(undefined);

  mainRef.current.isBigger = isBigger;

  if (mainRef.current.init === false) {
    mainRef.current.observer = new ResizeObserver((entries) => {
      // Only care about the first element, we expect one element ot be watched
      //const { width } = entries[0].contentRect
      //const entry = entries[0];

      const { width, height } = entries[0].contentRect;

      const newWrapperAspectRatio = calcAspectRatio(width, height);

      const newIsBigger = newWrapperAspectRatio >= aspectRatio;

      if (newIsBigger !== mainRef.current.isBigger) setIsBigger(newIsBigger);

      console.log("RESIZE", newWrapperAspectRatio, aspectRatio);

      mainRef.current.prevWrapperAspectRatio = newWrapperAspectRatio;

      // compare new aspectRatio with previous
      //setBreakSize(findBreakPoint(breakpoints, width))
    });

    mainRef.current.init = true;
  }

  useEffect(() => {
    mainRef.current.observer.observe(wrapperRef.current);

    const { width, height } = wrapperRef.current.getBoundingClientRect();

    mainRef.current.prevWrapperAspectRatio = calcAspectRatio(width, height);

    setIsBigger(mainRef.current.prevWrapperAspectRatio >= aspectRatio);

    return () => {
      mainRef.current.observer.disconnect();
    };
  }, []);

  return {
    isBigger,
    wrapperRef,
    wrapperAspectRatio: mainRef.current.prevWrapperAspectRatio,
  };
};
 */
