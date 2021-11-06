import Box from "@mui/system/Box";
import React, { forwardRef, ComponentProps, FC, RefAttributes } from "react";

export type ImageProps = ComponentProps<"img"> & ComponentProps<typeof Box>;

export const Image = forwardRef<any, ImageProps>((props, ref) => {
  return <Box component="img" maxWidth="none" ref={ref} {...props} />;
});

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
