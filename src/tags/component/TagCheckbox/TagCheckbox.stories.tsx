import React from "react";
//import { action } from "@storybook/addon-actions";
import TagCheckbox, { TagCheckboxProps } from ".";
import { TagClickable } from ".";
import Box from "@mui/system/Box";
import Tag from "./../Tag";

export default {
  component: TagCheckbox,
  title: "Tags/TagCheckbox",
  decorators: [
    (story: any) => (
      <Box width="500px" className="m-auto p-8 flex justify-around">
        {story()}
      </Box>
    ),
  ],
};

//@ts-ignore
const Template = (args: TagCheckboxProps) => <TagCheckbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: "input123",
  name: "tag",
  tagType: "withWho",
  disabled: false,
  checked: false,
  label: "С бабушкой",
};

export const Checked = Template.bind({});
Checked.args = {
  id: "input123",
  name: "tag",
  tagType: "withWho",
  disabled: false,
  checked: true,
  label: "С бабушкой",
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: "input123",
  name: "tag",
  tagType: "withWho",
  disabled: true,
  checked: false,
  label: "С бабушкой",
};

export const TagVsTagClickable = () => {
  return (
    <>
      <Tag tagType="withWho">На работе</Tag>

      <TagClickable disabled={false} checked={true} tagType="withWho">
        На работе
      </TagClickable>
    </>
  );
};
