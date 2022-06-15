import React, { useState, FC } from "react";
import IconButton from "@mui/material/IconButton";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import Popper from "@mui/material/Popper";
import ZoomSlider from "./../../component/ZoomSlider";
import Box from "@mui/material/Box";

export interface ZoomBtnProps {
  handleSliderChange: (event: any, value: number | number[]) => void;
  cancel: (event?: any) => void;
  zoom: number;
}

const ZoomBtn: FC<ZoomBtnProps> = ({ cancel, zoom, handleSliderChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl((prevVal: any) => {
      if (prevVal === null) {
        return event.currentTarget;
      } else {
        cancel();
        return null;
      }
    });
  };

  return (
    <>
      <IconButton
        aria-label="show photo zoom panel"
        aria-controls="zoom-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ color: "white" }}
      >
        {anchorEl === null ? <ZoomInIcon /> : <ZoomOutIcon />}
      </IconButton>

      <Popper
        id="show photo zoom panel"
        open={anchorEl !== null}
        anchorEl={anchorEl}
        /* onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }} */
        placement="bottom"
        disablePortal
        className="flex justify-center items-center"
      >
        <Box
          bgcolor="background.paper"
          width="220px"
          className="py-2 shadow rounded flex justify-center items-center"
        >
          <ZoomSlider
            onChange={handleSliderChange}
            value={zoom}
            //defaultValue={minZoom}
            //getAriaValueText={valuetext}
            aria-labelledby="zoom-slider"
          />
        </Box>
      </Popper>
    </>
  );
};

export default ZoomBtn;
