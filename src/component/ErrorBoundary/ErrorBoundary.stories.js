import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import ErrorBoundary from ".";
import Button from "@mui/material/Button";

export default {
  component: ErrorBoundary,
  title: "ErrorBoundary",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

const ErrorComponent = () => {
  throw new Error("Big Error");

  return null;
};

export const Default = () => {
  const [show, setShow] = useState(false);

  const makeBoom = () => {
    setShow(true);
  };

  return (
    <ErrorBoundary>
      <Button onClick={makeBoom}>Make boom</Button>
      {show === true && <ErrorComponent />}
    </ErrorBoundary>
  );
};

//TODO check on modal component
