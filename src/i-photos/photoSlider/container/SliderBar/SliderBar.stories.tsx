import SliderBar, { SliderBarProps } from ".";
import { Story } from "@storybook/react";
import Box from "@mui/system/Box";

export default {
  component: SliderBar,
  title: "Container/SliderBar",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template: Story<SliderBarProps> = (args) => (
  <Box width="80%" height="500px" className="relative bg-black">
    <SliderBar {...args} />
  </Box>
);

const args: SliderBarProps = {
  onClose: () => console.log("onClose"),
};

export const Default = Template.bind({});
Default.args = {
  ...args,
};
