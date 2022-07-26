import { Story } from "@storybook/react";
import React, { ComponentProps, useState } from "react";
import PhotoCardSkeleton from ".";

export default {
  component: PhotoCardSkeleton,
  title: "Component/PhotoCardSkeletons",
  decorators: [
    (story: any) => (
      <div
        style={{
          width: "90%",
          margin: "auto",
          paddingTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {story()}
      </div>
    ),
  ],
  excludeStories: /.*Data$/,
};

const Template: Story<ComponentProps<typeof PhotoCardSkeleton>> = (args) => (
  <PhotoCardSkeleton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  photoCardWidth: 345,
  photoCardHeight: 194,
};
