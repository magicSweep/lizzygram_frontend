import React, { useState } from "react";
import PhotoCardSkeletons from ".";

export default {
  component: PhotoCardSkeletons,
  title: "Photos/Component/PhotoCardSkeletons",
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

const Template = (args: any) => <PhotoCardSkeletons {...args} />;

export const Default = Template.bind({});
(Default as any).args = {
  numberOfSkeletons: 12,
};
