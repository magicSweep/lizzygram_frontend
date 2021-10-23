import React from "react";
import { Story } from "@storybook/react";
import { Tabs, TabsProps } from ".";

export default {
  component: Tabs,
  title: "Components/Tabs",
};

const Template: Story<TabsProps> = (args) => (
  <Tabs {...args}>
    <p className="text-center">Один</p>
    <p className="text-center">Два</p>
    <p className="text-center">Три</p>
  </Tabs>
);

export const Default = Template.bind({});

Default.args = {
  titles: ["Один", "Два", "Тридцать три"],
};
