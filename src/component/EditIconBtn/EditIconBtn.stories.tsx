import React, { ComponentProps } from "react";
import EditIconBtn from ".";
import { Story } from "@storybook/react";
import { Box } from "@mui/system";

export default {
  component: EditIconBtn,
  title: "Components/EditIconBtn",
};

const Template: Story<ComponentProps<typeof EditIconBtn>> = (args) => (
  <Box bgcolor="secondary.main">
    <EditIconBtn {...args} />
  </Box>
);

export const Default = Template.bind({
  onClick: () => console.log("Click"),
  tooltipTitle: "Edit btn",
  tooltipPlacement: "left",
  ariaLabel: "edit photo",
  fill: "white",
  iconSize: "small",
});

Default.args = {};
