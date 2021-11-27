import Typography from "@mui/material/Typography";
//import Box from "@mui/material/Box";
import React, { FC } from "react";
import { numberOfTagsByPhoto } from "../../../config";
import Tag from "../../component/Tag";
import TagSkeleton from "../../component/TagSkeleton";
import { tagTypeToColor } from "../../helper";
import { TagData } from "../../types";

interface TagsProps {
  tags: TagData[] | undefined;
  error: boolean;
  loading: boolean;
  photoTags: { [id: string]: boolean };
}

const getTags = (tags: TagData[], photoTags: { [id: string]: boolean }) => {
  const elements: any[] = [];

  tags.forEach((tag, index) => {
    if (photoTags[tag.id] === true) {
      const tagColor = tagTypeToColor(tag.type);

      elements.push(
        <span
          className={`bg-${tagColor} whitespace-nowrap mr-1`}
          key={`${index}_${tag.name}_textTags`}
        >
          #{tag.title}
        </span>
      );
    }
  });

  return elements;
};

const TagsTexted: FC<TagsProps> = ({ tags, error, loading, photoTags }) => {
  if (error) return null;

  if (loading) return null;

  if (tags === undefined) throw new Error("No tags...");

  const elements = getTags(tags, photoTags);

  return <>{elements}</>;
};

export default TagsTexted;
