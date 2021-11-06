import React, { ComponentProps } from "react";
import LabledSpinner from ".";

import { Story } from "@storybook/react";

export default {
  component: LabledSpinner,
  title: "Progress/LabledSpinner",
  decorators: [
    (story: any) => (
      <div className="relative w-96 h-96 m-auto bg-red-500">{story()}</div>
    ),
  ],
};

const Template: Story<ComponentProps<typeof LabledSpinner>> = (args) => (
  <LabledSpinner {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Применяем изменения...",
  isBackDrop: false,
};

export const BackDrop = Template.bind({});
BackDrop.args = {
  label: "Применяем изменения...",
  isBackDrop: true,
};

export const NoLabel = Template.bind({});
NoLabel.args = {};
