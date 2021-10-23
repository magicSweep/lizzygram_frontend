import React from "react";
import SliderAppBar from ".";
import { Story } from "@storybook/react";
import HeroTitle from ".";
import Box from "@mui/material/Box";
import { IconButton, Typography } from "@mui/material";

export default {
  component: HeroTitle,
  title: "Components/HeroTitle",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template: Story = () => (
  <Box
    width="100%"
    height="70%"
    pt="50px"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Box
      position="relative"
      width="400px"
      height="500px"
      bgcolor="background.paper"
      boxShadow={1}
    >
      <HeroTitle>Welcome, friend...</HeroTitle>
    </Box>
  </Box>
);

export const Default = Template.bind({});
Default.args = {};
