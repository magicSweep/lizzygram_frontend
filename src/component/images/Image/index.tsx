//import Box from "@mui/system/Box";
import React, { ComponentProps } from "react";
import { styled } from "@mui/material/styles";

export type ImageProps = Omit<
  ComponentProps<"img">,
  "ref"
> /* & ComponentProps<typeof Box> */;

/* export const Image = forwardRef<any, ImageProps>((props, ref) => {
  return (
    <Box component="img" maxWidth="none" loading="lazy" ref={ref} {...props} />
  );
}); */

const Image = styled("img")(({ theme, ...props }) => ({
  maxWidth: "none",
  width: props.width,
  height: props.height,
}));

/* export const Image = forwardRef<any, ImageProps>(
  ({ width, height, ...props }, ref) => {
    const style = {
      maxWidth: "none",
      width,
      height,
    };

    return <img css={style} loading="lazy" ref={ref} {...props} />;
  }
); */

export default Image;

/* <ImageWidget className="relative" {...props} />
      {isShowBase64 === true && (
        <div
          className={`absolute inset-0 transition-opacity delay-500 z-15 ${
            isPhotoLoading ? "opacity-100" : "opacity-0"
          }`}
          /* style={{
              ...props.style,
              backgroundImage: `url("data:image/jpeg;base64, ${base64}")`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }} /
            >
            <div className="relative w-full h-full flex justify-center items-center">
              <ImageWidget
                role="presentation"
                alt="Пока загружается основное фото"
                className="relative"
                src={`data:image/jpeg;base64, ${base64}`}
                style={props.style}
              />
            </div>
          </div>
        )} */
