import React, { FC, ComponentProps } from "react";
import {
  FavoriteIconBtn as FavoriteIconBtnWidget,
  useFavorite,
} from "../../../favorite";
import { usePhotoSliderContext } from "../../hook/usePhotoSliderContext";

const FavoriteIconBtn: FC<{
  placement?: ComponentProps<typeof FavoriteIconBtnWidget>["placement"];
}> = ({ placement }) => {
  const {
    userUid,
    activePhoto: { id, favoriteBy },
  } = usePhotoSliderContext();

  const useFavoriteReturn = useFavorite(userUid);

  return (
    <FavoriteIconBtnWidget
      photoId={id}
      userUid={userUid}
      favoriteBy={favoriteBy}
      placement={placement}
      {...useFavoriteReturn}
    />
  );
};

export default FavoriteIconBtn;
