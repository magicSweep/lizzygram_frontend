import Typography from "@mui/material/Typography";
//import Box from "@mui/material/Box";
import React, { FC } from "react";
import { numberOfTagsByPhoto } from "../../../config";
import Tag from "../../component/Tag";
import TagSkeleton from "../../component/TagSkeleton";
import { TagData } from "../../types";

interface TagsProps {
  tags: TagData[] | undefined;
  error: boolean;
  loading: boolean;
  photoTags: { [id: string]: boolean };
}

const getDescSkeletons = () => {
  const elements = [];

  for (let i = 0; i < numberOfTagsByPhoto; i++) {
    elements.push(
      <div className="inline-block mr-2 pt-2" key={"_desc_skeleton_" + i}>
        <TagSkeleton />
      </div>
    );
  }
  return elements;
};

const getTags = (tags: TagData[], photoTags: { [id: string]: boolean }) => {
  const elements: any[] = [];

  tags.forEach((tag, index) => {
    if (photoTags[tag.id] === true) {
      elements.push(
        <div className="inline-block mr-2 pt-2" key={"_desc_tags_" + tag.id}>
          <Tag tagType={tag.type}>{tag.title}</Tag>
        </div>
      );
    }
  });

  return elements;
};

const Tags: FC<TagsProps> = ({ tags, error, loading, photoTags }) => {
  // tags error - show error message

  // tags loading - show skeletons

  // tags - show tags

  let content: any;

  if (error) {
    content = (
      <div className="p-3">
        <Typography align="center" color="error">
          Упс, тэги не загрузились...
        </Typography>
      </div>
    );
  } else {
    let elements: any;

    if (loading) {
      elements = getDescSkeletons();

      content = (
        <ul className="p-3 flex justify-center flex-wrap">{elements}</ul>
      );
    } else {
      if (tags === undefined) throw new Error("No tags...");

      elements = getTags(tags, photoTags);

      content = (
        <ul className="p-3 flex justify-center flex-wrap">{elements}</ul>
      );
    }
  }

  return <>{content}</>;
};

export default Tags;
