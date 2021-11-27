import React, { FC } from "react";
import TagsWidget from "./Tags";
import TagsTextedWidget from "./TagsTexted";
import { useTags } from "../../hook/useTags";

export type TagsProps = {
  photoTags: { [id: string]: boolean };
  isTexted?: boolean;
};

const Tags: FC<TagsProps> = ({ photoTags, isTexted = false }) => {
  const tagsState = useTags();

  //console.log("[RENDER PHOTO DESC TAGS]");

  if (isTexted === true)
    return <TagsTextedWidget {...tagsState} photoTags={photoTags} />;

  return <TagsWidget {...tagsState} photoTags={photoTags} />;
};

export default Tags;
