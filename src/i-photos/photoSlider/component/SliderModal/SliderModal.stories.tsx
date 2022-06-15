import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import SliderModal, { SliderModalProps } from ".";
import { Story } from "@storybook/react";
import Button from "@mui/material/Button";

export default {
  component: SliderModal,
  title: "Component/SliderModal",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template: Story<SliderModalProps> = ({ open, onClose, ...args }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(true)}>Show modal</Button>
      <SliderModal open={show} onClose={() => setShow(false)} {...args}>
        <div
          style={{
            width: "100%",
            height: "100%",
            textAlign: "center",
            padding: "20px",
            backgroundColor: "cyan",
          }}
        >
          <p>Hello.</p>
          <Button onClick={() => setShow(false)}>Close</Button>
        </div>
      </SliderModal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  //open: true,
  //onClose: () => console.log("close"),
};
