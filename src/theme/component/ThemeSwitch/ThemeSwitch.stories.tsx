import Box from "@material-ui/core/Box";
import React from "react";
//import { action } from "@storybook/addon-actions";
import ThemeSwitch from ".";
import { SwitchProps } from "@material-ui/core/Switch";
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

const Template: Story<SwitchProps> = (args) => <ThemeSwitch {...args} />;

export const Default = Template.bind({});
(Default as any).args = {};
