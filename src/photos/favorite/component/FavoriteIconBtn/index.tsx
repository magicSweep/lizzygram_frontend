import { FavoriteData } from "lizzygram-common-data/dist/types";
import React, { FC, useCallback, ComponentProps } from "react";
import Favorite, { FavoriteProps } from "../../../../component/Favorite";
import { AddToFavorite, RemoveFromFavorite, useFavorite } from "./../../hook";
import { FavoriteReqs } from "../../types";

export type FavoriteIconBtnProps = ReturnType<typeof useFavorite> & {
  userUid: string;
  //favoriteReqs: FavoriteReqs;
  photoId: string;
  favoriteBy?: FavoriteData;
  //addFavorite: AddToFavorite;
  //removeFavorite: RemoveFromFavorite;
  placement?: FavoriteProps["placement"];
};

export const useFavoriteIconBtn = ({
  photoId,
  userUid,
  favoriteBy,
  add,
  remove,
  favoriteReqs,
}: {
  favoriteBy?: FavoriteData;
  photoId: string;
  userUid: string;
} & ReturnType<typeof useFavorite>): FavoriteProps => {
  const addToFavorite = useCallback(() => {
    return add(photoId, favoriteBy);
  }, [photoId, favoriteBy]);

  const removeFromFavorite = useCallback(() => {
    return remove(photoId, favoriteBy);
  }, [photoId, favoriteBy]);

  return {
    add: addToFavorite,
    remove: removeFromFavorite,
    loading: favoriteReqs.includes(photoId),
    isFavorite: favoriteBy === undefined ? false : favoriteBy[userUid] === true,
  };
};

const FavoriteIconBtn: FC<FavoriteIconBtnProps> = ({
  placement,
  userUid,
  photoId,
  favoriteBy,
  ...props
}) => {
  //const useFavoriteReturn = useFavorite(userUid);

  const favoriteProps = useFavoriteIconBtn({
    ...props,
    userUid,
    photoId,
    favoriteBy,
  });

  /* console.log(
    "RENDER FavoriteIconBtn",
    userUid,
    photoId,
    favoriteBy,
    favoriteProps
  ); */

  return (
    <Favorite
      {...favoriteProps}
      placement={placement !== undefined ? placement : "bottom"}
    />
  );
};

export default FavoriteIconBtn;
