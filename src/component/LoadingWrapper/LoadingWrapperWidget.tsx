import React, { FC } from "react";
//import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
//import Box, { BoxProps } from "@material-ui/core/Box";

export type LoadingWrapperWidgetProps = {
  circle: boolean;
};

const LoadingWrapperWidget: FC<LoadingWrapperWidgetProps> = ({ circle }) => {
  return (
    <div
      className={`
        absolute top-0 left-0
        bg-gray-200
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
      <CircularProgress size="20px" thickness={2.4} color="primary" />
    </div>
  );
};

export default LoadingWrapperWidget;
