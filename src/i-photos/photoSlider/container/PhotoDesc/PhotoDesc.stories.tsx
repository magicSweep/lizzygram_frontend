import React from "react";
import { PhotoDesc_ } from ".";
import { Story } from "@storybook/react";
import Box from "@mui/system/Box";
import { photos } from "../../../loadPhotos/fake-data/fake.data";

const PhotoDesc = PhotoDesc_("portfolio");

export default {
  component: PhotoDesc,
  title: "Container/PhotoDesc",
};

const Template: Story<any> = (args) => {
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

Default.args = {};
