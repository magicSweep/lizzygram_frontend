import React from "react";
import SubmitBtn, { SubmitBtnProps } from ".";
import { Story } from "@storybook/react";
import HeroTitle from ".";
import Box from "@mui/material/Box";

export default {
  component: HeroTitle,
  title: "Form Elements/SubmitBtn",
};

const Template: Story<SubmitBtnProps> = (args) => (
  <Box width="50%" p="30px" textAlign="center">
    <SubmitBtn {...args}>Отправить</SubmitBtn>
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  loading: false,
  submit: () => console.log("Submit-----------"),
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  submit: () => console.log("Submit-----------"),
};
