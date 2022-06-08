import React, { FC, ComponentProps } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

export type EditIconBtnProps = {
  onClick: (event?: any) => void;
  tooltipTitle: string;
  tooltipPlacement: ComponentProps<typeof Tooltip>["placement"];
  ariaLabel: string;
  fill: string;
  iconSize: ComponentProps<typeof EditIcon>["fontSize"];
};

const EditIconBtn: FC<EditIconBtnProps> = ({
  onClick,
  tooltipTitle,
  tooltipPlacement,
  ariaLabel,
  fill,
  iconSize,
}) => {
  return (
    <Tooltip title={tooltipTitle} placement={tooltipPlacement}>
      <IconButton onClick={onClick} aria-label={ariaLabel}>
        <EditIcon sx={{ fill }} fontSize={iconSize} />
      </IconButton>
    </Tooltip>
  );
};

export default EditIconBtn;
