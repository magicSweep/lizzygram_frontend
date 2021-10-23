import React from "react";
import { Story } from "@storybook/react";
import LoadingWrapper, { LoadingWrapperProps } from ".";
import Box from "@mui/material/Box";
import { Button, IconButton } from "@mui/material";
import AlarmIcon from "@mui/icons-material/Alarm";

export default {
  component: LoadingWrapper,
  title: "Components/LoadingWrapper",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template: Story<LoadingWrapperProps> = ({ children, ...args }) => (
  <Box
    width="100%"
    height="70%"
    pt="50px"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <LoadingWrapper {...args}>{children}</LoadingWrapper>
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  loading: true,
  circle: false,
  children: <Button>Hello, my friend...</Button>,
};

export const NotLoading = Template.bind({});
NotLoading.args = {
  loading: false,
  circle: false,
  children: <Button>Hello, my friend...</Button>,
};

export const IconBtn = Template.bind({});
IconBtn.args = {
  loading: true,
  circle: true,
  children: (
    <IconButton color="secondary" aria-label="add an alarm">
      <AlarmIcon />
    </IconButton>
  ),
};
