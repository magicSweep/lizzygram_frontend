import React from "react";
//import classes from "./FormWrapper.module.scss";
//import HeroTitle from "../../../component/HeroTitle";

import Box, { BoxProps } from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export interface FormWrapperProps extends BoxProps {
  title: string;
  submitBtnTitle: string;
  disabled: boolean;
  onClose: () => void;
  onSubmit: (...args: any) => void;
  children: any;
}

const HeroTitle = ({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) => {
  return (
    <div className={`absolute left-0 -top-8 w-full flex justify-center`}>
      {/* <Box
        boxShadow={1}
        sx={{
          display: "flex-inline",
          p: "10px 20px",
          /* boxShadow: 1, /
          width: "80%",
          /* bgcolor: "background.paper", /
          bgcolor: "primary.main",
          borderRadius: 1,
        }}
      > */}
      <div className="shadow flex-inline py-2 px-5 w-4/5 bg-primary rounded">
        <div className="flex justify-center items-center text-white">
          <Box
            className="flex-grow text-center"
            color="white"
            typography="h6"
            component="h3"
          >
            {title}
          </Box>
          <IconButton color="inherit" onClick={onClose}>
            <CloseIcon color="inherit" fontSize="small" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

const FormWrapper = ({
  title,
  onSubmit,
  onClose,
  submitBtnTitle,
  disabled,
  children,
  ...props
}: FormWrapperProps) => {
  //const classes = useStyles();

  /* <Box
      component="form"
      onSubmit={onSubmit}
      position="relative"
      p="70px 20px 10px"
      width="600px"
      m="30px auto 0"
      borderRadius={1}
      boxShadow={1}
      bgcolor="background.paper"
       {...props} 
    > */
  return (
    <form
      onSubmit={onSubmit}
      className="relative pt-16 px-5 pb-3 w-600 mt-8 mx-auto mb-0 rounded shadow bg-paper"
    >
      <HeroTitle title={title} onClose={onClose} />

      {children}

      <div className="text-center mb-5">
        <Button
          color="primary"
          variant="text"
          disabled={disabled}
          type="submit"
        >
          {submitBtnTitle}
        </Button>
      </div>
    </form>
  );
};

export default FormWrapper;
