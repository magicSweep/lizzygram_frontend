import React, { useState } from "react";
import { Story } from "@storybook/react";
import ZoomBtn from ".";
import { Box } from "@mui/system";
import { useImgZoom } from "../../hook/useImgZoom";

export default {
  component: ZoomBtn,
  title: "Component/ZoomBtn",
};

export const Default = () => {
  const { zoom, value, handleSliderChange, cancel } = useImgZoom();

  return (
    <Box width="300px" p="50px" m="auto" bgcolor="black">
      <ZoomBtn
        zoom={typeof value === "number" ? value : 0}
        handleSliderChange={handleSliderChange}
        cancel={cancel}
      />
      <Box mt="50px" p="20px" color="white">
        {zoom}
      </Box>
    </Box>
  );
};
