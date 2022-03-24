import * as React from "react";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";

const Copyright = () => {
  return (
    <Box typography="body2" color="text.secondary" className="text-center">
      {"Copyright © "}
      <MuiLink color="inherit" href="https://mui.com/">
        Your Website
      </MuiLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Box>
  );
};

export default Copyright;
