import { MutableRefObject, useEffect, useRef, useState } from "react";
import { getImageSizeStyle } from "./../helper";
import { Size, StyleSize } from "../../../types";
import { compose } from "fmagic";

const run = (
  photoAspectRatio: number,
  setImageSize: any,
  wrapperRef: MutableRefObject<HTMLElement>
) =>
  compose(
    () => wrapperRef.current.getBoundingClientRect(),
    (wrapperRect: DOMRect) => ({
      width: wrapperRect.width,
      height: wrapperRect.height,
    }),
    (wrapperSize: Size) => getImageSizeStyle(photoAspectRatio, wrapperSize),
    setImageSize
  )();

export const useFixedImageSize = (
  photoAspectRatio: number
  //imageRef: MutableRefObject<HTMLElement>,
  //wrapperRef: MutableRefObject<HTMLElement>
) => {
  const wrapperRef: MutableRefObject<HTMLDivElement> = useRef(null);

  const [imageSize, setImageSize] = useState<StyleSize>({
    width: "0",
    height: "0",
  });

  useEffect(() => {
    run(photoAspectRatio, setImageSize, wrapperRef);
  }, []);

  return {
    show: imageSize.width !== "0",
    imageSize,
    wrapperRef,
  };
};

/* const run = (
  photoAspectRatio: number,
  imageRef: MutableRefObject<HTMLElement>,
  wrapperRef: MutableRefObject<HTMLElement>
) =>
  compose(
    () => wrapperRef.current.getBoundingClientRect(),
    (wrapperRect: DOMRect) => ({
      width: wrapperRect.width,
      height: wrapperRect.height,
    }),
    (wrapperSize: Size) => getImageSizeStyle(photoAspectRatio, wrapperSize),
    (imageSize: StyleSize) => {
      imageRef.current.style.width = imageSize.width;
      imageRef.current.style.height = imageSize.height;
    }
  )();

export const useFixedImageSize = (
  photoAspectRatio: number
  //imageRef: MutableRefObject<HTMLElement>,
  //wrapperRef: MutableRefObject<HTMLElement>
) => {
  const imageRef: MutableRefObject<HTMLImageElement> = useRef(null);
  const wrapperRef: MutableRefObject<HTMLDivElement> = useRef(null);

  const [] = useState(
    {
      width: "0",
      height: "0"
    }
  );

  useEffect(() => {
    console.log("USE EFFECT REFS", imageRef, wrapperRef);
    run(photoAspectRatio, imageRef, wrapperRef);
  }, []);

  return {
    imageRef,
    wrapperRef,
  };
};
 */
