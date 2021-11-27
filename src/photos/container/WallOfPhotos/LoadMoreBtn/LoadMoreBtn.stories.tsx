import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import LoadMoreBtn from ".";

export default {
  component: LoadMoreBtn,
  title: "Photos/WallOfPhotos/LoadMoreBtn",
};

export const Default = () => {
  const [state, setState] = useState<any>({
    photos: "photos",
    hasNextPage: true,
    error: false,
    loading: false,
  });

  const togglePhotos = () =>
    setState((state) =>
      state.photos !== undefined
        ? { ...state, photos: undefined }
        : { ...state, photos: "photos" }
    );

  const toggleHasNextPage = () =>
    setState((state) => ({ ...state, hasNextPage: !state.hasNextPage }));

  const toggleError = () =>
    setState((state) => ({ ...state, error: !state.error }));

  const toggleLoading = () =>
    setState((state) => ({ ...state, loading: !state.loading }));

  return (
    <>
      <Box className="flex justify-center">
        <Button onClick={togglePhotos}>togglePhotos</Button>
        <span> | </span>
        <Button onClick={toggleHasNextPage}>toggleHasNextPage</Button>
        <span> | </span>
        <Button onClick={toggleError}>toggleError</Button>
        <span> | </span>
        <Button onClick={toggleLoading}>toggleLoading</Button>
        <span> | </span>
      </Box>
      <Box className="flex justify-center">
        <LoadMoreBtn onLoadMore={() => console.log("onLoadMore")} {...state} />
      </Box>
    </>
  );
};
