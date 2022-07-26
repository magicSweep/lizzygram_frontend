import React, { ComponentProps, FC } from "react";
import { styled, alpha, Box } from "@mui/system";
import SliderUnstyled from "@mui/base/SliderUnstyled";

const StyledSlider = styled(SliderUnstyled)(
  ({ theme }) => `
  color: ${theme.palette.mode === "light" ? "#1976d2" : "#90caf9"};
  height: 26px;
  width: 100%;
  padding: 0 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  opacity: 0.75;
  &:hover {
    opacity: 1;
  }

  & .MuiSlider-rail {
    display: block;
    position: absolute;
    width: 100%;
    height: 32px;
    border-radius: 2px;
    background-color: currentColor;
    opacity: 0.38;
  }

  & .MuiSlider-track {
    display: block;
    position: absolute;
    height: 32px;
    border-radius: 2px;
    background-color: currentColor;
  }

  & .MuiSlider-thumb {
    position: absolute;
    width: 20px;
    height: 32px;
    margin-left: -9px;
    box-sizing: border-box;
    border-radius: 2px;
    outline: 0;
    border: 2px solid currentColor;
    background-color: #fff;

    :hover,
    &.Mui-focusVisible {
      box-shadow: 0 0 0 0.25rem ${alpha(
        theme.palette.mode === "light" ? "#1976d2" : "#90caf9",
        0.15
      )};
    }

    &.Mui-active {
      box-shadow: 0 0 0 0.25rem ${alpha(
        theme.palette.mode === "light" ? "#1976d2" : "#90caf9",
        0.3
      )};
    }
  }
`
);

const ZoomSlider: FC<ComponentProps<typeof SliderUnstyled>> = (props) => {
  return (
    <Box sx={{ width: 200 }}>
      <StyledSlider {...props} max={100} />
    </Box>
  );
};

export default ZoomSlider;
