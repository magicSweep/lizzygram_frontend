import React from "react";
//import { action } from "@storybook/addon-actions";
import Tag, { TagProps } from ".";

export default {
  component: Tag,
  title: "Tags/Tag",
  decorators: [
    (story: any) => (
      <div
        style={{
          width: "500px",
          margin: "auto",
          paddingTop: "30px",
          backgroundColor: "white",
        }}
      >
        {story()}
      </div>
    ),
  ],
  excludeStories: /.*Data$/,
};

const Template = (args: TagProps) => <Tag {...args}>На работе</Tag>;

export const Default = Template.bind({});
(Default as any).args = {
  tagType: "withWho",
};
