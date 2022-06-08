import React from "react";
import AddBtn from ".";
import { Story } from "@storybook/react";
//import { IZoomButtonProps } from "../../../component/ZoomButton";

export default {
  component: AddBtn,
  title: "Component/AddBtn",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template: Story<any> = (args) => <AddBtn {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick: () => console.log("onClick"),
};

/* export const AddPhotoIconBtn = () => {
  return <AddPhotoBtnWidget onClick={() => console.log("onClick")} />;
}; */
