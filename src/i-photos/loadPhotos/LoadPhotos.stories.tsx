import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Story } from "@storybook/react";
import usePhotos from "./hook/usePhotos";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";

export default {
  //component: Fragment,
  title: "LoadPhotosModule",
};

const Photos = () => {
  const {
    loading,
    error,
    searchState,
    photos,
    hasNextPage,
    nextPageDocRef,
    loadPhotos,
    loadMore,
  } = usePhotos();

  const getPhotosElements = (photos: Photo<any>[] | undefined) => {
    if (photos === undefined) return undefined;

    if (photos.length === 0) return "We found no photos...";

    return photos.map((photo, i) => (
      <Box key={`${i}_${photo.id}`} component="li">
        {photo.id}
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
      <Box typography="h5">
        First we need to go to auth tab and authenticate!!!
      </Box>
      <Box typography="h5">We can set search state in search tab</Box>
      <Box typography="h3">Photos state</Box>
      <Box typography="body1">
        - nextPageDocRef:{" "}
        {hasNextPage === true ? JSON.stringify(nextPageDocRef.id) : "undefined"}
      </Box>
      <Box typography="body1">- hasNextPage: {JSON.stringify(hasNextPage)}</Box>
      <Box typography="body1"> - loading: {JSON.stringify(loading)}</Box>
      <Box typography="body1"> - error: {JSON.stringify(error)}</Box>
      <Box typography="body1"> - search state: </Box>
      <Box>{JSON.stringify(searchState)}</Box>;
      <Box typography="body1"> - Photos: </Box>
      <Button onClick={loadPhotos}>Load photos</Button>
      <Button onClick={loadMore}>Load more</Button>
      <Box
        component="ul"
        maxHeight="300px"
        overflow="scroll"
        width="300px"
        pl="20px"
      >
        {getPhotosElements(photos)}
      </Box>
    </Box>
  );
};

export const Default = () => <Photos />;
