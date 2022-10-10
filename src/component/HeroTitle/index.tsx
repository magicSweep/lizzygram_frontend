import React, { FC, PropsWithChildren } from "react";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";

//const useStyles = makeStyles()

const HeroTitle: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={`absolute left-0 -top-5 w-full flex justify-center`}>
      <Box
        boxShadow={1}
        sx={{
          display: "flex-inline",
          p: "10px 20px",
          /* boxShadow: 1, */
          width: "80%",
          maxHeight: "47px",
          /* bgcolor: "background.paper", */
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Typography
          /*  variant="h5" */
          /* color="text.secondary" */
          align="center"
          sx={{
            /* color: "text.primary", */
            fontSize: 18,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {children}
        </Typography>
      </Box>
    </div>
  );
};

export default HeroTitle;
