import React, { FC } from "react";
import IconButton from "@mui/material/IconButton";
//import EditIcon from "@mui/icons-material/Edit";
//import DescriptionIcon from "@mui/icons-material/Description";
import CloseIcon from "@mui/icons-material/Close";
//import Tooltip from "@mui/material/Tooltip";
//import GetAppIcon from "@material-ui/icons/GetApp";
//import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
//import { DownloadPhotoProps } from "../../component/DownloadPhoto/types";
import ZoomBtn from "../ZoomBtn";
//import { DownloadOriginalPhotoData } from "../../types";
//import DownloadPhotoIcon from "../../component/DownloadPhoto/Icon";
import FullscreenIconBtn from "../FullscreenIconBtn";
import Orientation from "../../../../component/Orientation";
//import Favorite from "../../../component/Favorite";
//import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
/* import PhotoFavorite, {
  PhotoFavoriteProps,
} from "../../component/PhotoFavorite"; */
import IconsMenu, { IconsMenuProps } from "../IconsMenu";
//import useFullscreen from "../../../../hook/useFullscreen";
import { usePhotoSliderContext } from "../../hook/usePhotoSliderContext";

// DownloadPhotoProps &
export type SliderBarProps = {
  /*  iconsMenuProps: IconsMenuProps;
  fullscreenProps: FullscreenProps;
  zoomBtnProps: ZoomBtnProps; */
  //photos: Photo<FirestoreDate>[] | undefined;
  //activeIndex: number;
  onClose: (event: any) => void;
  /*  isEditable: boolean;
    isEditor: boolean;
    //downloadPhotoData: DownloadOriginalPhotoData;
    showEditPhotoForm: () => void;*/

  //onToggleDesc: (event: any) => void;
};

const ItemWrapper = ({ children }: { children: any }) => {
  return <div className="w-12 h-12 mr-1.5">{children}</div>;
};

const SliderBar: FC<SliderBarProps> = ({
  //iconsMenuProps,
  //fullscreenProps,
  //zoomBtnProps,
  onClose,
  //onToggleDesc,
}) => {
  const { isFullscreen } = usePhotoSliderContext();

  return (
    <div className="absolute top-0 left-0 right-0 h-18 bg-transparent z-50">
      <div className="absolute w-full shadow-none top-0 h-16 slider-bar-gradient"></div>
      <div className="absolute top-0 right-0 left-0 z-50 py-0 px-3 flex items-center justify-between h-16">
        <ItemWrapper>
          <IconButton onClick={onClose} aria-label="закрыть фото слайдер">
            <CloseIcon sx={{ fill: "white" }} />
          </IconButton>
        </ItemWrapper>
        <div className="flex-grow flex justify-end items-center">
          <ItemWrapper>
            <ZoomBtn />
          </ItemWrapper>

          <ItemWrapper>
            <FullscreenIconBtn />
          </ItemWrapper>

          {isFullscreen === true && (
            <ItemWrapper>
              <Orientation />
            </ItemWrapper>
          )}

          {isFullscreen === false && (
            <ItemWrapper>
              <IconsMenu
              /*  onToggleDesc={onToggleDesc}
                 {...iconsMenuProps} */
              /*  addFavorite={addFavorite}
                removeFavorite={removeFavorite}
                favoriteReqs={favoriteReqs} 
                favoriteBy={
                  (photos as Photo<FirestoreDate>[])[activeIndex].favoriteBy
                }
                photoId={(photos as Photo<FirestoreDate>[])[activeIndex].id}
                userUid={userUid}
                showEditPhotoForm={showEditPhotoForm}
                onToggleDesc={onToggleDesc}
                googleDriveId={googleDriveId}
                imageExtension={imageExtension}
                isEditor={isEditor}
                isEditable={isEditable}
                downloadPhotoUrl={downloadPhotoUrl}*/
              />
            </ItemWrapper>
          )}
        </div>
      </div>
    </div>
  );
};

export default SliderBar;
