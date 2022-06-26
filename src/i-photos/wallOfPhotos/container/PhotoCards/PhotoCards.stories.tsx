import React, { Fragment } from "react";
//import PhotoCardWithDesc from "./PhotoCardWithDesc";
import PhotoCards from ".";
import { Story } from "@storybook/react";
import { photos } from "../../../loadPhotos/fake-data/fake.data";
import Box from "@mui/material/Box";

export default {
  component: PhotoCards,
  title: "Component/PhotoCards",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template: Story<any> = (args) => {
  return (
    <div className="m-auto pt-10 pb-10 w-9/12">
      <div className="w-full flex flex-wrap justify-around">
        <PhotoCards {...args} />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  photos,
  isLast: false,
  loading: false,
  numberOfPhotosInBlock: 6,
  blockIndex: 0,
  numberOfAddedPhotos: 0,
};

export const Loading = Template.bind({});
Loading.args = {
  photos: undefined,
  isLast: false,
  loading: true,
  numberOfPhotosInBlock: 6,
  blockIndex: 0,
  numberOfAddedPhotos: 0,
};

export const AddPhoto = Template.bind({});
AddPhoto.args = {
  photos,
  isLast: false,
  loading: false,
  numberOfPhotosInBlock: 4,
  blockIndex: 0,
  numberOfAddedPhotos: 2,
};

export const SecondBlock = Template.bind({});
SecondBlock.args = {
  photos,
  isLast: false,
  loading: false,
  numberOfPhotosInBlock: 4,
  blockIndex: 1,
  numberOfAddedPhotos: 2,
};
