import React, { useState, lazy, Suspense } from "react";
//import Backdrop from "@material-ui/core/Backdrop";
import IconButton from "@mui/material/IconButton";
//import Menu from "@material-ui/core/Menu";
//import MenuItem from "@material-ui/core/MenuItem";
//import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import pMinDelay from "p-min-delay";
import LoadingWrapperWidget from "../../../component/LoadingWrapper/LoadingWrapperWidget";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
//import { getBuildFor } from "lizzygram-common-data";
//import loadable from "@loadable/component";

//import FaceIcon from '@material-ui/icons/Face';
//import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

/* const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);
 */
//import(/* webpackPrefetch: true */ './OtherComponent'),

/* console.log("-----------process.env.BUILD_FOR", getBuildFor());

console.log(
  "-----------process.env.GATSBY_TEST_VAR",
  process.env.GATSBY_TEST_VAR
); */

const isPortfolio = process.env.BUILD_FOR === "portfolio";

const pLazyMenu = lazy(() =>
  pMinDelay(import("../PortfolioAccountContextMenu"), 200)
);

const lLazyMeny = lazy(() =>
  pMinDelay(import("../PortfolioAccountContextMenu"), 200)
);

const LazyMenu = isPortfolio === true ? pLazyMenu : lLazyMeny;

export default function AccountBtnWithLoadableMenu({ userName, logout }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="inline-block" position="relative">
      <Tooltip title="Аккаунт">
        <IconButton
          aria-controls="аккаунт"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          <AccountCircleIcon color="inherit" fontSize="small" />
        </IconButton>
      </Tooltip>

      {anchorEl !== null && (
        <Suspense fallback={<LoadingWrapperWidget circle={true} />}>
          <LazyMenu
            userName={userName}
            anchorEl={anchorEl}
            handleClose={handleClose}
            logout={logout}
          />
        </Suspense>
      )}
    </Box>
  );
}
