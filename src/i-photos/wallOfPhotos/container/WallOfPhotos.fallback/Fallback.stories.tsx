import React, { ComponentProps } from "react";
//import PhotoCardWithDesc from "./PhotoCardWithDesc";
import Fallback from "./Fallback";
import { Story } from "@storybook/react";

export default {
  component: Fallback,
  title: "Component/Fallback",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template: Story<ComponentProps<typeof Fallback>> = (args) => {
  return <Fallback {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  numberOfPhotosPerQuery: 6,
  photoCardHeight: 194,
  photoCardWidth: 345,
};
