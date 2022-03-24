import { ComponentProps, FC } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Story } from "@storybook/react";
import { Box } from "@mui/system";
import Favorite from ".";

export default {
  component: Favorite,
  title: "Components/Favorite",
};

const Template: Story<ComponentProps<typeof Favorite>> = (args) => (
  <Box bgcolor="secondary.main" padding="20px">
    <Favorite {...args} />
  </Box>
);

const defaultArgs = {
  loading: false,
  onAdd: () => console.log("on add"),
  onCancel: () => console.log("on cancel"),
  isFavorite: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const IFavorite = Template.bind({});
IFavorite.args = {
  ...defaultArgs,
  isFavorite: true,
};

export const Loading = Template.bind({});
Loading.args = {
  ...defaultArgs,
  loading: true,
};
