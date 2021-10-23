import Box from "@mui/material/Box";
import { Story } from "@storybook/react";
import React, { useState } from "react";
//import { action } from "@storybook/addon-actions";
import AuthAppBarBtn, { AuthFragmentProps } from "./AuthAppBarBtn";

export default {
  component: AuthAppBarBtn,
  title: "Auth/AuthAppBarBtn",
  decorators: [
    (story: any) => (
      <Box
        style={{
          width: "300px",
          margin: "auto",
          paddingTop: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {story()}
      </Box>
    ),
  ],
  excludeStories: /.*Data$/,
};

const user = {
  name: "Sia Shniperson",
  email: "sia@mail.ru",
  uid: "13345uif",
};

const Template: Story<AuthFragmentProps> = (props) => (
  <AuthAppBarBtn {...props} />
);

export const Default = Template.bind({});

(Default as any).args = {
  user,
  loading: false,
  login: () => {},
  logout: () => {},
};

export const Loading = Template.bind({});

(Loading as any).args = {
  user,
  loading: true,
  login: () => {},
  logout: () => {},
};
