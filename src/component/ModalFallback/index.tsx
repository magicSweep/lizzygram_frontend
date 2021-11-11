import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

const ModalFallback = () => (
  <Box
    className="w-12 h-12 fixed z-50 flex justify-center items-center rounded-sm shadow"
    top="calc(50vh - 24px)"
    left="calc(50vw - 24px)"
    bgcolor="background.paper"
  >
    <CircularProgress size={20} /* thickness={2.4} */ />
  </Box>
);

export default ModalFallback;
