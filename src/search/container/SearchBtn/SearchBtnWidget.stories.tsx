/* import React from "react";
import { Story } from "@storybook/react";
import Box from "@mui/material/Box";
import SearchBtn, { SearchBtnProps } from "./SearchBtnWidget";

export default {
  title: "Search/SearchBtn",
  component: SearchBtn,
};

const Template: Story<SearchBtnProps> = (args) => (
  <Box
    position="fixed"
    bgcolor="#ee6363"
    top="0"
    left="0"
    right="0"
    height="50px"
  >
    <Box
      width="600px"
      height="44px"
      m="auto"
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      position="relative"
    >
      <SearchBtn {...args} />
      <Box height="100%" width="50px" mr="10px" bgcolor="primary.main"></Box>

      <Box height="100%" width="80px" mr="10px" bgcolor="primary.main"></Box>
    </Box>
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  //isAuth: true,
  isSearch: false,
  resetSearchState: () => console.log("resetSearchState"),
  showSearchPhotoForm: () => console.log("showSearchPhotoForm"),
};

export const Searching = Template.bind({});
Searching.args = {
  //isAuth: true,
  isSearch: true,
  resetSearchState: () => console.log("resetSearchState"),
  showSearchPhotoForm: () => console.log("showSearchPhotoForm"),
};
 */
