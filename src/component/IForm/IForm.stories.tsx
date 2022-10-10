import React from "react";
import { Story } from "@storybook/react";
import { VerticalLinearStepper } from ".";
import Box from "@mui/material/Box";

export default {
  component: VerticalLinearStepper,
  title: "Components/IForm",
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
    <VerticalLinearStepper />
  </Box>
);

export const Default = Template.bind({});
Default.args = {};
