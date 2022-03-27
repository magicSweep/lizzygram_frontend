import { FavoriteData } from "lizzygram-common-data/dist/types";
import React, { FC, useCallback } from "react";
import Favorite, { FavoriteProps } from "../../../component/Favorite";
import { AddToFavorite, RemoveFromFavorite } from "../../hook/useFavorite";
import { FavoriteReqs } from "../../types";

export type PhotoFavoriteProps = {
  userUid: string;
  favoriteReqs: FavoriteReqs;
  photoId: string;
  favoriteBy?: FavoriteData;
  addFavorite: AddToFavorite;
  removeFavorite: RemoveFromFavorite;
  placement?: FavoriteProps["placement"];
};

export const usePhotoFavorite = ({
  addFavorite,
  removeFavorite,
  favoriteReqs,
  favoriteBy,
  photoId,
  userUid,
}: PhotoFavoriteProps): FavoriteProps => {
  const addToFavorite = useCallback(() => {
    return addFavorite(photoId, favoriteBy);
  }, [photoId, favoriteBy]);

  const removeFromFavorite = useCallback(() => {
    return removeFavorite(photoId, favoriteBy);
  }, [photoId, favoriteBy]);

  return {
    add: addToFavorite,
    remove: removeFromFavorite,
    loading: favoriteReqs.includes(photoId),
    isFavorite: favoriteBy === undefined ? false : favoriteBy[userUid] === true,
  };
};

const PhotoFavorite: FC<PhotoFavoriteProps> = (props) => {
  const favoriteProps = usePhotoFavorite(props);

  return (
    <Favorite
      {...favoriteProps}
      placement={props.placement !== undefined ? props.placement : "bottom"}
    />
  );
};

export default PhotoFavorite;
