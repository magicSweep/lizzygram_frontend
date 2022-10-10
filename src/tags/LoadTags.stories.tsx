import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Story } from "@storybook/react";
import useTags from "./hook/useTags";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import { TagData } from "./types";
import { useAuth } from "../auth/hook/useAuth";

export default {
  //component: Fragment,
  title: "LoadTagsModule",
};

const Tags = () => {
  const { loading, error, tags, reLoad } = useTags();
  const { isAuth } = useAuth();

  const getTagsElements = (tags: TagData[] | undefined) => {
    if (tags === undefined) return undefined;

    if (tags.length === 0) return "We found no tags...";

    return tags.map((tag, i) => (
      <Box key={`${i}_${tag.id}`} component="li">
        {tag.id} - {tag.name} - {tag.title}
      </Box>
    ));
  };

  return (
    <Box
      width="80%"
      pt="50px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {isAuth === false && (
        <Box typography="body1">
          First we need to go to auth tab and authenticate!!!
        </Box>
      )}
      <Box typography="body1">Tags state:</Box>
      <Box typography="body1"> - loading: {JSON.stringify(loading)}</Box>
      <Box typography="body1"> - error: {JSON.stringify(error)}</Box>
      <Box typography="body1"> - Tags: </Box>
      <Button onClick={reLoad}>Re-load</Button>
      <Box component="ul" maxHeight="300px" overflow="scroll">
        {getTagsElements(tags)}
      </Box>
    </Box>
  );
};

export const Default = () => <Tags />;
