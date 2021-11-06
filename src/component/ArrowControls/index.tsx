import React, { FC } from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/system/Box";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export type ArrowProps = {
  type: "right" | "left";
  onClick: (event?: any) => void;
  hidden: boolean;
};

const Arrow: FC<ArrowProps> = ({ type, onClick, hidden }) => {
  const clickHandler = (event: any) => {
    event.stopPropagation();
    event.preventDefault();

    onClick();
  };

  return (
    <Box
      /*  sx={{
        ":hover": {
          backgroundImage: `linear-gradient(${
            type === "left" ? "-90deg" : "90deg"
          }, rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.2))`,
        },
      }} */
      className="w-1/6 flex justify-center items-center z-50"
      onClick={clickHandler}
    >
      {hidden === false && (
        <IconButton
          onClick={clickHandler}
          sx={{ color: "white" }}
          aria-label={
            type === "left" ? "предыдущее изображение" : "следующее изображение"
          }
        >
          {type === "left" ? (
            <KeyboardArrowLeftIcon />
          ) : (
            <KeyboardArrowRightIcon />
          )}
        </IconButton>
      )}
    </Box>
  );
};

export type ArrowControlsProps = {
  next: (event?: any) => void;
  prev: (event?: any) => void;
  itemsLength: number;
  activeIndex: number;
  hasNextPage: boolean;
};

const ArrowControls: FC<ArrowControlsProps> = ({
  prev,
  next,
  itemsLength,
  activeIndex,
  hasNextPage,
}) => {
  const isLeftEnd = activeIndex <= 0;
  const isRightEnd = activeIndex >= itemsLength - 1 && hasNextPage === false;

  return (
    <div className="absolute inset-0 flex justify-between">
      <Arrow type="left" onClick={prev} hidden={isLeftEnd} />

      <Arrow type="right" onClick={next} hidden={isRightEnd} />
    </div>
  );
};

export default ArrowControls;
