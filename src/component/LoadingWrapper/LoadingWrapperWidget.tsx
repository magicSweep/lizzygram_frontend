import React, { FC } from "react";
//import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
//import Box, { BoxProps } from "@material-ui/core/Box";

export type LoadingWrapperWidgetProps = {
  circle: boolean;
  transparentBg?: boolean;
  thickness?: number;
};

const LoadingWrapperWidget: FC<LoadingWrapperWidgetProps> = ({
  circle,
  transparentBg,
  thickness,
}) => {
  return (
    <div
      className={`
        absolute top-0 left-0
        ${transparentBg === true ? "bg-transparent" : "bg-gray-200"}
        w-full h-full
        flex justify-center items-center
        ${circle === true ? "rounded-full" : "rounded"}
      `}
      /* position="absolute"
      top="0"
      left="0"
      bgcolor="#e8e8e8bd"
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="4px"
      {...props} */
    >
      <CircularProgress
        size="20px"
        thickness={thickness === undefined ? 2.4 : thickness}
        color="primary"
      />
    </div>
  );
};

export default LoadingWrapperWidget;
