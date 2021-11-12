import React from "react";
import PhotoDesc, { PhotoDescProps } from ".";
import { Story } from "@storybook/react";
import Box from "@mui/system/Box";
import { photos } from "../../mock/fake.data";

export default {
  component: PhotoDesc,
  title: "Photos/PhotoDesc",
};

const Template: Story<PhotoDescProps> = (args) => {
  return (
    <Box
      width="600px"
      height="400px"
      m="auto"
      boxShadow={2}
      className="flex flex-nowrap"
    >
      <Box className="w-full h-full bg-black"></Box>
      <PhotoDesc {...args} />
    </Box>
  );
};

export const Default = Template.bind({});

Default.args = {
  photo: photos[0],
  photoLoading: false,
  photoError: false,
  isEditable: true,
  isPhotoEditing: false,
  //tagsState,
  downloadOriginalPhotoUrl: "https://google.com",
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
};

export const NoPhoto = Template.bind({});

NoPhoto.args = {
  photo: undefined,
  photoLoading: false,
  photoError: false,
  isEditable: true,
  isPhotoEditing: false,
  //tagsState,
  downloadOriginalPhotoUrl: "https://google.com",
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
};

export const Error = Template.bind({});

Error.args = {
  photo: photos[0],
  photoLoading: false,
  photoError: true,
  isEditable: true,
  isPhotoEditing: false,
  //tagsState,
  downloadOriginalPhotoUrl: "https://google.com",
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
};

export const Loading = Template.bind({});

Loading.args = {
  photo: photos[0],
  photoLoading: true,
  photoError: false,
  isEditable: true,
  isPhotoEditing: false,
  //tagsState,
  downloadOriginalPhotoUrl: "https://google.com",
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
};

export const Editing = Template.bind({});

Editing.args = {
  photo: photos[0],
  photoLoading: false,
  photoError: false,
  isEditable: true,
  isPhotoEditing: true,
  //tagsState,
  downloadOriginalPhotoUrl: "https://google.com",
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
};
