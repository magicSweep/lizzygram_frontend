import { useState } from "react";
import wait from "waait";
import { photos } from "./../../photos/mock/fake.data";

let pagesCount = 0;

const useFakePhotos = (numberOfPhotosPerQuery: number) => {
  const [state, setState] = useState({
    photos: undefined,
    loading: true,
    isError: false,
  });

  const loadPhotos = async (isNewState: boolean = false) => {
    if (isNewState === true) pagesCount = 0;

    setState((state) => ({
      ...state,
      loading: true,
      isError: false,
    }));

    await wait(2000);

    pagesCount += 1;

    setState((state) => ({
      ...state,
      loading: false,
      photos:
        photos.length < pagesCount * numberOfPhotosPerQuery
          ? photos
          : photos.slice(0, pagesCount * numberOfPhotosPerQuery),
    }));
  };

  const loadPhotosWithError = async () => {
    setState((state) => ({
      ...state,
      loading: true,
      isError: false,
    }));

    await wait(2000);

    setState((state) => ({
      ...state,
      loading: false,
      isError: true,
    }));
  };

  return {
    ...state,
    hasNextPage: photos.length > pagesCount * numberOfPhotosPerQuery,
    nextPageDocRef: "ref",
    loadPhotos,
    loadMorePhotos: loadPhotos,
    loadNewPhotosState: () => loadPhotos(true),
    loadPhotosWithError,
  };
};

export default useFakePhotos;
