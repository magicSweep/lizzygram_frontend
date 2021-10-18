import * as React from "react";
import MuiLink from "@mui/material/Link";
import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby";

export const Link = React.forwardRef((props: GatsbyLinkProps<any>, ref) => {
  //@ts-ignore
  return <MuiLink component={GatsbyLink} ref={ref} {...props} />;
});
