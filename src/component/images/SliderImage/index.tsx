import React, { FC } from "react";
import { getZoomedImageStyle } from "./helper";
import Image, { ImageProps } from "../Image";
import { useWrapperSize, useOnChangeImage } from "./hook";
import { useImageLoad } from "../WallOfPhotosImg/hook";
import Placeholder from "../Placeholder";
import LabledSpinner from "../../progress/LabledSpinner";

export type SliderImageProps = ImageProps & {
  photoAspectRatio: number;
  base64: string;
  zoom: number;
  isLoading: boolean;
  loadText: string;
};

// it must resize on change wrapper aspectRatio
// it must zoomed
//
const SliderImage: FC<SliderImageProps> = ({
  photoAspectRatio,
  base64,
  zoom,
  isLoading,
  loadText,
  ...props
}) => {
  const { loaded, onLoad, setLoaded } = useImageLoad();

  useOnChangeImage(props.src, setLoaded);

  const fZoom = loaded === true && isLoading !== true ? zoom : 0;

  const {
    wrapperRef,
    isWrapperWider,
    isWrapperHigher,
    isWrapperAspectRatioBigger,
  } = useWrapperSize(photoAspectRatio, fZoom);

  const imageSize =
    isWrapperAspectRatioBigger === undefined
      ? { width: "0", height: "0" }
      : getZoomedImageStyle(isWrapperAspectRatioBigger, fZoom);

  const isZoomed = fZoom > 1;

  //console.log("[RENDER SLIDER IMAGE]", isWrapperWider, isWrapperHigher);

  /*  */

  //grid justify-items-center content-center
  // flex flex-col
  return (
    <div
      ref={wrapperRef}
      className={`
      relative w-full h-full flex

      ${isWrapperAspectRatioBigger === true ? "" : "flex-col"}

      ${
        isZoomed === false
          ? " justify-center items-center overflow-hidden"
          : "overflow-auto"
      }
     
      ${
        isZoomed === true && isWrapperWider === true
          ? isWrapperAspectRatioBigger === true
            ? "justify-center"
            : "items-center"
          : ""
      }
      ${
        isZoomed === true && isWrapperHigher === true
          ? isWrapperAspectRatioBigger === true
            ? "items-center"
            : "justify-center"
          : ""
      }

      ${isZoomed === false ? " overflow-hidden" : " overflow-auto"}
    `}
    >
      <Image
        {...props}
        //className={`${show === true ? "" : "hidden"}`}
        {...imageSize}
        key={props.src}
        //className={`${loaded === false ? "invisible" : "visible"}`}
        onLoad={onLoad}
        /* 
          key={photos[index].src}
          className={`${loaded === false ? "invisible" : "visible"}`}
          onLoad={onLoad}
          width={width}
          height={height}
          src={photos[index].src}
          alt="hello"*/
      />

      <Placeholder
        imageSize={imageSize}
        base64={base64}
        show={loaded === false}
      />

      {isLoading === true && (
        <LabledSpinner
          label={loadText ? loadText : undefined}
          isBackDrop={true}
        />
      )}
    </div>
  );
};

export default SliderImage;
