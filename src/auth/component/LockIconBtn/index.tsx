import React, { FC } from "react";
import LockIcon from "@mui/icons-material/Lock";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

export const LockIconBtn: FC<IconButtonProps> = (props) => {
  return (
    <IconButton aria-label="войти в аккаунт" color="inherit" {...props}>
      <LockIcon color="inherit" fontSize="small" />
    </IconButton>
  );
};
