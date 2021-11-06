import React, { FC, useState } from "react";
import { useFixedImageSize } from "./../ImageFixedSize/hook";
import Image, { ImageProps } from "./../Image";
import Placeholder from "./../Placeholder";
import { useImageLoad } from "./hook";

export type WallOfPhotosImgProps = ImageProps & {
  photoAspectRatio: number;
  base64: string;
};

const WallOfPhotosImg: FC<WallOfPhotosImgProps> = ({
  photoAspectRatio,
  base64,
  ...props
}) => {
  const { show, imageSize, wrapperRef } = useFixedImageSize(photoAspectRatio);

  const { loaded, onLoad } = useImageLoad();

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full flex justify-center items-center"
    >
      <Image
        {...props}
        onLoad={onLoad}
        className={`${show === true ? "" : "hidden"}`}
        {...imageSize}
      />

      <Placeholder
        imageSize={imageSize}
        base64={base64}
        show={loaded === false}
      />

      {/* <Fade timeout={300} in={loaded === false}>
        <div className="absolute inset-0 flex justify-center items-center">
          <Image
            {...imageSize}
            src={`data:image/jpeg;base64, ${base64}`}
            alt="hello"
          />
        </div>
      </Fade> */}
    </div>
  );
};

export default WallOfPhotosImg;
