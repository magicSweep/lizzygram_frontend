import React, { FC, MutableRefObject } from "react";
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

    const {} = getImageSizeStyle(photoAspectRatio, ); */

  return (
    <Fade timeout={300} in={show}>
      <Box className="absolute inset-0 flex justify-center items-center">
        <Image
          /*  wrapperSize={wrapperSize}
        photoAspectRatio={1.6}
        base64={photos[index].base64} */
          {...imageSize}
          //width={width}
          // height={height}
          src={`data:image/jpeg;base64, ${base64}`}
          /* src="" */
          alt="Placeholder for photo"
        />
      </Box>
    </Fade>
  );
};

export default Placeholder;
