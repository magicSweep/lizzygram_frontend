import React, { FC } from "react";
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import SearchBtn from "./container/SearchBtn";
import { Story } from "@storybook/react";
import SearchPhotoForm from "./form/SearchPhotoForm";
import useSearchTerms from "./hook/useSearchTerms";
import { SearchTerms } from "./types";

export default {
  title: "SearchModule",
  component: SearchBtn,
};

const Search = () => {
  const { searchTerms } = useSearchTerms();

  const getSearchTermsElements = (searchTerms: SearchTerms) => {
    return <Box>{JSON.stringify(searchTerms)}</Box>;
  };

  return (
    <>
      <Box className="flex h-20 items-center justify-center bg-indigo-500">
        <SearchBtn isDebug={true} />
      </Box>
      <SearchPhotoForm />
      <Box>
        <Box typography="h6" className="pl-4">
          Search terms:{" "}
        </Box>
        <Box typography="body1" className="pl-8">
          {getSearchTermsElements(searchTerms)}
        </Box>
      </Box>
    </>
  );
};

export const Default = () => <Search />;
