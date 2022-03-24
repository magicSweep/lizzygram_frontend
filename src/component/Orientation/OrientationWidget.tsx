import React, { FC } from "react";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export type OrientationProps = {
  title: string;
  change: any;
};

const Orientation: FC<OrientationProps> = ({ title, change }) => {
  return (
    <Tooltip title={"Повернуть"}>
      <IconButton onClick={change} aria-label="повернуть экран">
        <FlipCameraAndroidIcon sx={{ fill: "white" }} fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default Orientation;
