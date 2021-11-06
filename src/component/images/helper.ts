import { CSSProperties } from "@mui/system";
import { compose } from "fmagic";
import { Size, StyleSize } from "../../types";

export const getImageSizeStyle = (
  photoAspectRatio: number,
  wrapperSize: Size
) =>
  compose<Size, StyleSize>(
    ({ width, height }: Size) => aspectRatio(width, height),
    (wrapperAspectRatio: number) => photoAspectRatio <= wrapperAspectRatio,
    getImageStyle
  )(wrapperSize);

export const aspectRatio = (width: number, height: number) => {
  return Math.round((width / height) * 10) / 10;
};

export const getImageStyle = (isWrapperAspectRatioBigger: boolean) => {
  let height: string, width: string;

  if (isWrapperAspectRatioBigger === true) {
    width = "auto";
    height = "100%";
  } else {
    width = "100%";
    height = "auto";
  }

  /* console.log("GET STYLE", {
      width,
      height,
    }); */

  return {
    //cursor: "pointer",
    width,
    height,
  };
};
