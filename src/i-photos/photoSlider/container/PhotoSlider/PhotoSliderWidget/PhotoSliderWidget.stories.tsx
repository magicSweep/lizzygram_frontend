import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
//import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
//import { photos } from "./../../mock/fake.data";
//import { createStore, combineReducers, applyMiddleware, compose } from "redux";
//import { Provider } from "react-redux";
//import thunk from "redux-thunk";
import PhotoSliderWidget from ".";
import Box from "@mui/material/Box";

export default {
  component: PhotoSliderWidget,
  title: "Container/PhotoSliderWidget",
  decorators: [],
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <Box width="600px" height="400px" m="auto" boxShadow={2}>
      <PhotoSliderWidget />
    </Box>
  );
};
