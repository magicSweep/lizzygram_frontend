import Box, { BoxProps } from "@mui/system/Box";
import React, { FC, InputHTMLAttributes } from "react";
import BaseTag, { BaseTagProps } from "../BaseTag";
import { tagTypeToColor } from "./../../helper";
import { TagType } from "./../../types";

export interface TagProps extends BaseTagProps {
  tagType: TagType;
  //htmlFor?: string;
}

const Tag: FC<TagProps> = ({ children, tagType, ...props }) => {
  const tagColor = tagTypeToColor(tagType);

  return (
    <BaseTag bgcolor={`${tagColor}.main`} {...props}>
      {children}
    </BaseTag>
  );
};

export default Tag;
