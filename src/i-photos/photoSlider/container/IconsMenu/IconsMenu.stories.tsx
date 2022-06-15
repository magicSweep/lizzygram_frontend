import React, { Fragment } from "react";
//import PhotoCardWithDesc from "./PhotoCardWithDesc";
import { Story } from "@storybook/react";
import Box from "@mui/material/Box";
import IconsMenu from ".";

export default {
  component: IconsMenu,
  title: "Container/IconsMenu",
  decorators: [],
};

const Template: Story<any> = (args) => {
  return (
    <Box
      width="600px"
      height="400px"
      m="auto"
      pt="50px"
      className="flex justify-center items-center bg-black"
    >
      <IconsMenu {...args} />
    </Box>
  );
};

const defaultArgs = {};

export const Default = Template.bind({});

Default.args = {
  ...defaultArgs,
};
