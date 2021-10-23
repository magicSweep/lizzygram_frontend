import React from "react";
//import { action } from "@storybook/addon-actions";
import { NotAuth } from "./NotAuth";
import Box from "@mui/material/Box";

export default {
  component: NotAuth,
  title: "Components/NotAuth",
  /* decorators: [
    (story: any) => (
      <div
        style={{
          width: "95%",
          margin: "auto",
          paddingTop: "30px",
          backgroundColor: "white",
        }}
      >
        {story()}
      </div>
    ),
  ], */
  excludeStories: /.*Data$/,
};

const Template = (args: any) => (
  <Box
    sx={{
      maxWidth: "660px",
      minWidth: "350px",
      m: "auto",
      bgcolor: "background.paper",
      p: "30px",
    }}
  >
    <NotAuth {...args} />
  </Box>
);

export const Default = Template.bind({});

(Default as any).args = {
  loading: false,
};

export const Loading = Template.bind({});

(Loading as any).args = {
  loading: true,
};
