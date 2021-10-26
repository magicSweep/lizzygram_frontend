import React from "react";
//import { action } from "@storybook/addon-actions";
import BaseTag, { BaseTagProps } from ".";

export default {
  component: BaseTag,
  title: "Tags/BaseTag",
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

const Template = (args: BaseTagProps) => <BaseTag {...args}>На работе</BaseTag>;

export const Default = Template.bind({});
(Default as any).args = {
  bgcolor: "primary.main",
};
