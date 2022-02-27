import React from "react";
import { PhotoDescProps, PhotoDesc_ } from ".";
import { Story } from "@storybook/react";
import Box from "@mui/system/Box";
import { photos } from "../../mock/fake.data";

const PhotoDesc = PhotoDesc_("portfolio");

export default {
  component: PhotoDesc,
  title: "Photos/Component/PhotoDesc",
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

const args: PhotoDescProps = {
  photo: photos[0],
  photoLoading: false,
  photoError: false,
  isEditable: true,
  isEditor: true,
  isPhotoEditing: false,
  //tagsState,
  userUid: "userUid",
  showEditPhotoForm: () => console.log("showEditPhotoForm"),
};

export const Default = Template.bind({});

Default.args = {
  ...args,
};

export const NoPhoto = Template.bind({});

NoPhoto.args = {
  ...args,
  photo: undefined,
};

export const Error = Template.bind({});

Error.args = {
  ...args,
  photoError: true,
};

export const Loading = Template.bind({});

Loading.args = {
  ...args,
  photoLoading: true,
};

export const Editing = Template.bind({});

Editing.args = {
  ...args,
  isPhotoEditing: true,
};
