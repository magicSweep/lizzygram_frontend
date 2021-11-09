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
    <Box width="800px" height="500px" className="flex flex-nowrap">
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
