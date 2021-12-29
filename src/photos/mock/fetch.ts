import { useState } from "react";
import wait from "waait";
import { photos } from "./../../photos/mock/fake.data";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";

const firstPagePhotos: Photo<FirestoreDate>[] = [];
const secondPagePhotos: Photo<FirestoreDate>[] = [];

photos.forEach((photo, i) => {
  if (i <= 3) firstPagePhotos.push(photo);
  else secondPagePhotos.push(photo);
});

export interface IPhotoState {
  photos?: Photo<FirestoreDate>[];
  hasNextPage: boolean;
  nextPageDocRef: any;
  loading: boolean;
  error: boolean;
}

export const initPhotoState: IPhotoState = {
  photos: undefined,
  hasNextPage: true,
  nextPageDocRef: "ref",
  loading: true,
  error: false,
};

export const fetchPhotos = (setState: any) => async () => {
  await wait(2000);

  setState((state) => ({
    ...state,
    loading: false,
    photos: firstPagePhotos,
    hasNextPage: true,
    error: false,
  }));
};

export const fetchMorePhotos = (setState: any) => async () => {
  setState((state) => ({
    ...state,
    loading: true,
  }));

  await wait(2000);

  setState((state) => ({
    ...state,
    loading: false,
    photos: [...state.photos, ...secondPagePhotos],
    hasNextPage: false,
    error: false,
  }));
};
