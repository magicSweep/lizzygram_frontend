import React, { FC, ComponentProps } from "react";
import {
  FavoriteIconBtn as FavoriteIconBtnWidget,
  useFavorite,
} from "../../../favorite";
import { usePhotoSliderContext } from "../../hook/usePhotoSliderContext";

const FavoriteIconBtn: FC<{
  placement?: ComponentProps<typeof FavoriteIconBtnWidget>["placement"];
}> = ({ placement }) => {
  const useFavoriteReturn = useFavorite("favoriteTestUser");

  const {
    userUid,
    activePhoto: { id, favoriteBy },
  } = usePhotoSliderContext();

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
