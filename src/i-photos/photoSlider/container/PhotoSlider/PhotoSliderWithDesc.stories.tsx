import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PhotoSliderWithDesc from "./PhotoSliderWithDesc";
import Box from "@mui/material/Box";

export default {
  component: PhotoSliderWithDesc,
  title: "Container/PhotoSliderWithDesc",
};

export const Default = () => {
  return (
    <Box width="600px" height="400px">
      <PhotoSliderWithDesc />
    </Box>
  );
};
