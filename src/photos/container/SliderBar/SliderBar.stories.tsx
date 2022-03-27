import SliderBar, { SliderBarProps } from ".";
import { Story } from "@storybook/react";
import Box from "@mui/system/Box";
import { photos } from "../../mock/photos.db";
//import { IZoomButtonProps } from "../../../component/ZoomButton";

export default {
  component: SliderBar,
  title: "Photos/Container/SliderBar",
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

const args: SliderBarProps = {
  photos: photos as any,
  isEditable: true,
  isEditor: true,
  cancel: () => console.log("Cancel"),
  zoom: 0,
  handleSliderChange: () => console.log("Change"),
  userUid: "userUid",
  googleDriveId: "googleDriveId",
  imageExtension: "jpeg",
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
  onClose: () => console.log("onClose"),
  onToggleDesc: () => console.log("onToggleDesc"),
  isFullscreen: false,
  exitFullscreen: () => console.log("exitFullscreen"),
  requestFullscreen: () => console.log("requestFullscreen"),
  addFavorite: () => console.log("addFavorite") as any,
  removeFavorite: () => console.log("removeFavorite") as any,
  favoriteReqs: [],
  activeIndex: 0,
};

export const Default = Template.bind({});
Default.args = {
  ...args,
  isEditable: true,
  isEditor: true,
};

export const NotEditable = Template.bind({});
NotEditable.args = {
  ...args,
  isEditable: false,
  isEditor: true,
};

export const OnlyViewer = Template.bind({});
OnlyViewer.args = {
  ...args,
  isEditable: false,
  isEditor: false,
};
