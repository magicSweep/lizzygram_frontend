import { Box } from "@mui/material";
import { Story } from "@storybook/react";
import { useRef, useState, useEffect } from "react";
import wait from "waait";
import {
  PortfolioAccountContextMenuWidget,
  PortfolioAccountContextMenuProps,
} from ".";

export default {
  component: PortfolioAccountContextMenuWidget,
  title: "Auth/PortfolioAccountContextMenuWidget",
};

const grantPermissions = () => console.log("grantPermissions");

const revokePermissions = () => console.log("revokePermissions");

const Template: Story<PortfolioAccountContextMenuProps> = (props) => {
  const ref: any = useRef();

  const [anchorEl, setAnchorEl] = useState(null);
  /* const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };  */

  useEffect(() => {
    setAnchorEl(ref.current);
  }, [ref.current]);

  return (
    <Box
      sx={{
        width: "300px",
        margin: "auto",
        paddingTop: "30px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="w-8 m-auto" ref={ref}></div>
      <PortfolioAccountContextMenuWidget {...props} anchorEl={anchorEl} />
    </Box>
  );
};

export const UserEditor = Template.bind({});

(UserEditor as any).args = {
  userName: "MiracleMan",
  isEditor: true,
  grantPermissions,
  revokePermissions,
};

export const UserNotEditor = Template.bind({});

(UserNotEditor as any).args = {
  userName: "MiracleMan",
  isEditor: false,
  grantPermissions,
  revokePermissions,
};
