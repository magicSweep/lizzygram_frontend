import React, { useState } from "react";
import { Story } from "@storybook/react";
import ZoomSlider from ".";
import { Box } from "@mui/system";

export default {
  component: ZoomSlider,
  title: "Photos/Component/ZoomSlider",
};

export const Default = () => {
  const [value, setValue] = useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <ZoomSlider
        value={typeof value === "number" ? value : 0}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
      />
      <Box p="20px">{value * 4}</Box>
    </Box>
  );
};
