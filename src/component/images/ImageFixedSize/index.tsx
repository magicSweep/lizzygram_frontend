import React, { FC } from "react";
import Image, { ImageProps } from "../Image";
import { useFixedImageSize } from "./hook";

export type ImageFixedSizeProps = ImageProps & {
  photoAspectRatio: number;
};

const ImageFixedSize: FC<ImageFixedSizeProps> = ({
  photoAspectRatio,
  ...props
}) => {
  const { show, imageSize, wrapperRef } = useFixedImageSize(photoAspectRatio);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full flex justify-center items-center"
    >
      <Image
        {...props}
        className={`${show === true ? "" : "hidden"}`}
        {...imageSize}
        /* 
        key={photos[index].src}
        className={`${loaded === false ? "invisible" : "visible"}`}
        onLoad={onLoad}
        width={width}
        height={height}
        src={photos[index].src}
        alt="hello"*/
      />
    </div>
  );
};

export default ImageFixedSize;
