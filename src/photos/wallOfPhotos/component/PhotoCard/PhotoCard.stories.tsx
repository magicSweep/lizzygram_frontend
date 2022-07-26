import React, { Fragment } from "react";
//import PhotoCardWithDesc from "./PhotoCardWithDesc";
import PhotoCard, { PhotoCardProps } from ".";
import { Story } from "@storybook/react";
import { photos } from "../../../loadPhotos/fake-data/fake.data";
/* import WallOfPhotosImg from "../../../component/images/WallOfPhotosImg";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import InfoIcon from "@mui/icons-material/Info"; */
import Box from "@mui/material/Box";

export default {
  component: PhotoCard,
  title: "Component/PhotoCard",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template: Story<PhotoCardProps> = (args) => {
  return (
    <Box
      width="600px"
      height="400px"
      m="auto"
      className="flex justify-center items-center"
    >
      <PhotoCard {...args} />
    </Box>
  );
};

const defaultArgs = {
  base64: photos[0].base64,
  iconSrc: photos[0].iconSrc,
  aspectRatio: photos[0].aspectRatio,
  favoriteBy: photos[0].favoriteBy,
  id: photos[0].id,
  tags: photos[0].tags,
  description: photos[0].description,
  downloadPhotoUrl: "https://bvwew.com",
  googleDriveId: photos[0].googleDriveId,
  imageExtension: photos[0].imageExtension,
  date: photos[0].date,
  ///
  photoCardWidth: 345,
  photoCardHeight: 194,
  isEditable: true,
  isEditor: true,
  index: 32,
  userUid: "jkFrANbtA4bBEjFsvWWbSOPdt56yt",
  showEditPhotoForm: () => console.log("Show edit form"),
  onImageClick: () => console.log("Image click"),
  //loadingFavorite,
  favoriteReqs: [],
  addFavorite: () => console.log("addFavorite"),
  removeFavorite: () => console.log("removeFavorite"),
};

export const Default = Template.bind({});

Default.args = {
  ...defaultArgs,
};

export const NotEditable = Template.bind({});

NotEditable.args = {
  ...defaultArgs,
  isEditable: false,
};

export const OnlyViewer = Template.bind({});

OnlyViewer.args = {
  ...defaultArgs,
  isEditable: true,
  isEditor: false,
};
