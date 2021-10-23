import Box from "@mui/material/Box";
import React from "react";
//import { action } from "@storybook/addon-actions";
import { ThemeSwitch } from ".";
import { UseSwitchProps } from "@mui/core/SwitchUnstyled";
import { Story } from "@storybook/react";

export default {
  component: ThemeSwitch,
  title: "Components/ThemeSwitch",
  decorators: [
    (story: any) => (
      <Box
        width="500px"
        margin="auto"
        padding="60px"
        bgcolor="background.paper"
      >
        {story()}
      </Box>
    ),
  ],
  excludeStories: /.*Data$/,
};

const Template: Story<UseSwitchProps> = (args) => <ThemeSwitch {...args} />;

export const Default = Template.bind({});
(Default as any).args = {};
