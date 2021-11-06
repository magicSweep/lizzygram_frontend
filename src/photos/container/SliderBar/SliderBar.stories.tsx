import SliderBar, { SliderBarProps } from ".";
import { Story } from "@storybook/react";
import Box from "@mui/system/Box";
//import { IZoomButtonProps } from "../../../component/ZoomButton";

export default {
  component: SliderBar,
  title: "Photos/SliderBar",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template: Story<SliderBarProps> = (args) => (
  <Box width="80%" height="500px" className="relative bg-green-300">
    <SliderBar {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  isEditable: true,
  cancel: () => console.log("Cancel"),
  zoom: 0,
  handleSliderChange: () => console.log("Change"),
  downloadOriginalPhotoUrl: "downloadOriginalPhotoUrl.com",
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  onClose: () => console.log("onClose"),
  onToggleDesc: () => console.log("onToggleDesc"),
};
