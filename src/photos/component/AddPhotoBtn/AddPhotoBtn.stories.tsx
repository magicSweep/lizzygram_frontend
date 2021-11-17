import React from "react";
import AddPhotoBtnWidget from "./AddPhotoBtnWidget";
import { Story } from "@storybook/react";
//import { IZoomButtonProps } from "../../../component/ZoomButton";

export default {
  component: AddPhotoBtnWidget,
  title: "Photos/AddPhotoBtn",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template: Story<any> = (args) => <AddPhotoBtnWidget {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick: () => console.log("onClick"),
};

/* export const AddPhotoIconBtn = () => {
  return <AddPhotoBtnWidget onClick={() => console.log("onClick")} />;
}; */
