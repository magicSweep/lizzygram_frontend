/*  <Box
          sx={{
            backgroundImage: `url("data:image/png;base64, ${photos[0].base64}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
          }}
          component="div"
        /> */

import React, { ComponentProps, FC } from "react";
import Fade from "@mui/material/Fade";
//import Image from "../Image";
//import { getImageSizeStyle } from "./../helper";
import { styled } from "@mui/material/styles";
import { Photo } from "lizzygram-common-data/dist/types";

export type ImageContainerProps = {
  base64: string;
  imageExtension: Photo<any>["imageExtension"];
  //photoAspectRatio: number;
  //wrapperRef: MutableRefObject<HTMLElement>;
};

export type PlaceholderProps = ImageContainerProps &
  ComponentProps<"img"> & {
    show: boolean;
  };

const ImageContainer = styled("div", {
  shouldForwardProp: (prop: any) =>
    ["base64", "imageExtension"].includes(prop) ===
    false /* prop !== "base64" && prop !== "imageExtension" */,
})<ImageContainerProps>(({ theme, ...props }) => ({
  backgroundImage: `url("data:image/${props.imageExtension};base64, ${props.base64}")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "center",
  position: "absolute",
  inset: 0,
  /* width: "100%",
            height: "100%", */
}));

const Placeholder: FC<PlaceholderProps> = ({ show, ...props }) => {
  return (
    <Fade timeout={300} in={show}>
      <ImageContainer alt="Placeholder for photo" loading="lazy" {...props} />
    </Fade>
  );
};

export default Placeholder;

/* import React, { FC } from "react";
import Box from "@mui/system/Box";
import Fade from "@mui/material/Fade";
import Image from "../Image";
import { StyleSize } from "../../../types";
//import { getImageSizeStyle } from "./../helper";

export type PlaceholderProps = {
  show: boolean;
  base64: string;
  imageSize: StyleSize;
  //photoAspectRatio: number;
  //wrapperRef: MutableRefObject<HTMLElement>;
};

const Placeholder: FC<PlaceholderProps> = ({ show, base64, imageSize }) => {
  /* const rect = 

    const {} = getImageSizeStyle(photoAspectRatio, ); /

  return (
    <Fade timeout={300} in={show}>
      <Box className="absolute inset-0 flex justify-center items-center">
        <Image
          /*  wrapperSize={wrapperSize}
        photoAspectRatio={1.6}
        base64={photos[index].base64} /
          {...imageSize}
          //width={width}
          // height={height}
          src={`data:image/jpeg;base64, ${base64}`}
          /* src="" /
          alt="Placeholder for photo"
        />
      </Box>
    </Fade>
  );
};

export default Placeholder;
 */
