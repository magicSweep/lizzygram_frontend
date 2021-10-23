import React from "react";
//import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, Theme } from "@mui/material/styles";

export default {
  component: Box,
  title: "Theme/Playground",
};

const ITypography = styled(Typography)((props: any) => ({
  color: (props.theme as Theme).palette.text.secondary,
}));

export const Default = () => {
  return (
    <>
      <Box
        sx={{
          width: "80%",
          mx: "auto",
          mb: "20px",
          py: "10px",
        }}
      >
        <Typography>
          If we do not set color properties - by default dark mode works. For
          Box background it set bgcolor to background.default, not paper
        </Typography>
      </Box>

      <Box
        sx={{
          width: "80%",
          mx: "auto",
          mb: "20px",
          py: "10px",
        }}
      >
        <Typography sx={{ color: "text.secondary" }}>
          If we set in Typography sx: color: "text.secondary" - it will not work
          on change mode to dark
        </Typography>
      </Box>

      <Box
        sx={{
          width: "80%",
          mx: "auto",
          mb: "20px",
          py: "10px",
          bgcolor: "background.paper",
        }}
      >
        <Box typography="body2" sx={{ color: "text.secondary" }}>
          Instead of Typography component we can use Box with prop typography
        </Box>
      </Box>

      <Box
        sx={{
          width: "80%",
          mx: "auto",
          mb: "20px",
          py: "10px",
        }}
      >
        <ITypography>
          What should we do to set Typography to dark mode???
        </ITypography>
      </Box>
    </>
  );
};
