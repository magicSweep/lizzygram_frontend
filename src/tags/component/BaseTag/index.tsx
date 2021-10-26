import Box, { BoxProps } from "@mui/system/Box";
import React, { FC, InputHTMLAttributes } from "react";
import { tagTypeToColor } from "./../../helper";
import { TagType } from "./../../types";

export interface BaseTagProps extends BoxProps {
  //tagType: TagType;
  //htmlFor?: string;
}

const BaseTag: FC<BaseTagProps> = ({ children, ...props }) => {
  //const tagColor = tagTypeToColor(tagType);
  /* bgcolor={`${tagColor}.main`} */

  return (
    <Box
      className={`
            cursor-default outline-none whitespace-nowrap no-underline lowercase select-none
            h-6 px-3
            inline-flex justify-center items-center
            rounded-sm
            text-xs text-white
        `}
      {...props}
    >
      {`#${children}`}
    </Box>
  );
};

export default BaseTag;
