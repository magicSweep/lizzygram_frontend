import React, { Fragment } from "react";
//import PhotoCardWithDesc from "./PhotoCardWithDesc";
import { Story } from "@storybook/react";
import { photos } from "../../mock/fake.data";
import WallOfPhotosImg from "../../../component/images/WallOfPhotosImg";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";
import IconsMenu, { IconsMenuProps } from ".";

export default {
  component: IconsMenu,
  title: "Photos/Container/IconsMenu",
  decorators: [],
};

const Template: Story<IconsMenuProps> = (args) => {
  return (
    <Box
      width="600px"
      height="400px"
      m="auto"
      pt="50px"
      className="flex justify-center items-center bg-black"
    >
      <IconsMenu {...args} />
    </Box>
  );
};

const defaultArgs = {
  onToggleDesc: () => console.log("Toggle desc..."),
  addFavorite: () => console.log("Toggle desc..."),
  removeFavorite: () => console.log("Toggle desc..."),
  favoriteReqs: [],
  favoriteBy: { adfasdf: true },
  photoId: "photoId",
  userUid: "userUid",
  showEditPhotoForm: () => console.log("showEditPhotoForm..."),
  googleDriveId: "",
  imageExtension: "",
  isEditor: true,
  isEditable: true,
};

export const Default = Template.bind({});

Default.args = {
  ...defaultArgs,
};
