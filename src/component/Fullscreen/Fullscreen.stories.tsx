import React, { ComponentProps } from "react";
import { Story } from "@storybook/react";
import { Box } from "@mui/system";
import Fullscreen from ".";

export default {
  component: Fullscreen,
  title: "Components/Fullscreen",
};

const Template: Story<ComponentProps<typeof Fullscreen>> = (args) => (
  <Box bgcolor="secondary.main" padding="20px">
    <Fullscreen {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  exitFullscreen: () => {},
  requestFullscreen: () => {},
  isFullscreen: false,
};

export const Fullscreened = Template.bind({});
Fullscreened.args = {
  exitFullscreen: () => {},
  requestFullscreen: () => {},
  isFullscreen: true,
};
