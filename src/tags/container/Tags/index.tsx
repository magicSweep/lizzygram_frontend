import React, { FC } from "react";
import TagsWidget from "./Tags";
import { useTags } from "../../hook/useTags";

const Tags: FC<{ photoTags: { [id: string]: boolean } }> = ({ photoTags }) => {
  const tagsState = useTags();

  //console.log("[RENDER PHOTO DESC TAGS]");

  return <TagsWidget {...tagsState} photoTags={photoTags} />;
};

export default Tags;
