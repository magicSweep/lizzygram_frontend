//import IconButton from "@material-ui/core/IconButton";
import React, { FC } from "react";
//import LockIcon from "@material-ui/icons/Lock";
import Tooltip from "@mui/material/Tooltip";
import { LockIconBtn } from "../LockIconBtn";
import { IconButtonProps } from "@mui/material/IconButton";

/* export interface TooltipedLockIconBtnProps {
  login: () => void;
} */

const TooltipedLockIconBtn: FC<IconButtonProps> = (props) => {
  return (
    <Tooltip title="Войти">
      <span
        className="min-w-44 min-h-44 inline-flex justify-center items center" /* ref={props.ref} */
      >
        <LockIconBtn {...props} />
      </span>
    </Tooltip>
  );
};

export default TooltipedLockIconBtn;
