import React, { useEffect, useState, FC } from "react";
import { init as initializeFirebase } from "./../firebaseInit";
import Box from "@mui/system/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AuthTab from "./Tabs/AuthTab";
import PhotosTab from "./Tabs/PhotosTab";
import TagsTab from "./Tabs/TagsTab";
import UsersTab from "./Tabs/UsersTab";

export default {
  component: Box,
  title: "Firebase",
  //decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

// CONFIG FIRESTORE
initializeFirebase();

const MainTabs = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Auth" value="1" />
            <Tab label="Photos" value="2" />
            <Tab label="Tags" value="3" />
            <Tab label="Users" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <AuthTab />
        </TabPanel>
        <TabPanel value="2">
          <PhotosTab />
        </TabPanel>
        <TabPanel value="3">
          <TagsTab />
        </TabPanel>
        <TabPanel value="4">
          <UsersTab />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export const Default = () => <MainTabs />;
