import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import FormModal, { FormModalProps } from ".";
import { Story } from "@storybook/react";
import Button from "@mui/material/Button";

export default {
  component: FormModal,
  title: "Modal/FormModal",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const Template: Story<FormModalProps> = ({ open, onClose, ...args }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(true)}>Show modal</Button>
      <FormModal open={show} onClose={() => setShow(false)} {...args}>
        <div
          style={{
            width: "600px",
            height: "300px",
            textAlign: "center",
            padding: "20px",
            backgroundColor: "transparent",
          }}
        >
          <p>Hello.</p>
          <Button onClick={() => setShow(false)}>Close</Button>
        </div>
      </FormModal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  //open: true,
  //onClose: () => console.log("close"),
};
