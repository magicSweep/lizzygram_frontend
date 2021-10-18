import React, { ComponentProps } from "react";
import { Link } from ".";
import { Story } from "@storybook/react";

export default {
  component: Link,
  title: "Components/Link",
};

const Template: Story<ComponentProps<typeof Link>> = (args) => (
  <Link {...args} />
);

export const Default = Template.bind({});
Default.args = {
  to: "/",
  children: "Go to hell",
};
