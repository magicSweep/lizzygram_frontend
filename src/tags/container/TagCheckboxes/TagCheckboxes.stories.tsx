import { Story } from "@storybook/react";
import React, { ComponentProps } from "react";
import TagCheckboxesWidget, { TagCheckboxesProps } from "./TagCheckboxes";
//import TagCheckboxes from ".";
import {
  tagsData,
  state as initTagsState,
  defaultTags,
} from "./../../mock/data";

export default {
  component: TagCheckboxesWidget,
  title: "Tags/TagCheckboxes",
  decorators: [
    (story: any) => (
      <div style={{ width: "600px", margin: "auto", paddingTop: "20px" }}>
        {story()}
      </div>
    ),
  ],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template: Story<TagCheckboxesProps> = (args) => (
  <TagCheckboxesWidget {...args} />
);

const args: TagCheckboxesProps = {
  tagsFormState: initTagsState,
  handleChange: (event: any) => console.log("handleChange"),
  label: "Опишите фото с помощью тэгов:",
  tagsState: {
    items: tagsData,
    error: false,
    loading: false,
  },
  //tagsFormState: initTagsState,
  isFormError: false,
  helperText: "",
  disabled: false,
};

export const AllOk = Template.bind({});
AllOk.args = {
  ...args,
};

export const AllOkTapped = Template.bind({});
AllOkTapped.args = {
  ...args,
  tagsFormState: {
    ...initTagsState,
    WX6CY5kGx4FXvdZR6g8E: true,
    ieYx4ke8ms0DJb5APv4u: true,
    vekwWqVY1222eeXeERmd: true,
  },
};

export const TagsLoading = Template.bind({});
TagsLoading.args = {
  ...args,
  tagsState: {
    items: undefined,
    error: false,
    loading: true,
  },
  defaultTags,
};

export const NoFormTagsState = Template.bind({});
NoFormTagsState.args = {
  ...args,
  tagsFormState: undefined,
  defaultTags,
};

export const ServerErrorTags = Template.bind({});
(ServerErrorTags as any).args = {
  ...args,
  tagsState: {
    tags: undefined,
    error: true,
    loading: false,
  },
};

export const ValidationErrorTags = Template.bind({});
(ValidationErrorTags as any).args = {
  ...args,
  isFormError: true,
  helperText: "Вы что с ума сошли?",
};

export const DisabledTags = Template.bind({});
(DisabledTags as any).args = {
  ...args,
  disabled: true,
};
