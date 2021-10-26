import React from "react";
import { Story } from "@storybook/react";
import UploadButton, { UploadButtonProps } from ".";

export default {
  component: UploadButton,
  title: "Form Elements/UploadButton",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template: Story<UploadButtonProps> = (args) => <UploadButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: "super-id",
  label: "Добавить фоту",
  name: "photoFile",
  inputRef: undefined,
  error: false,
  disabled: false,
};

export const Success = Template.bind({});
Success.args = {
  id: "super-id",
  success: true,
  label: "Добавить фоту",
  name: "photoFile",
  inputRef: undefined,
  error: false,
  disabled: false,
  helperText: "Вы добавили - hello.jpg",
};

export const Error = Template.bind({});
Error.args = {
  id: "super-id",

  label: "Добавить фоту",
  name: "photoFile",
  inputRef: undefined,
  error: true,
  disabled: false,
  helperText: "А где фота?",
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: "super-id",

  label: "Добавить фоту",
  name: "photoFile",
  inputRef: undefined,
  error: false,
  disabled: true,
  helperText: "А где фота?",
};
