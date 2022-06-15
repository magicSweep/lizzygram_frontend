import IconButton from "@mui/material/IconButton";
import Box from "@mui/system/Box";
import React, { FC, useState, useCallback, MutableRefObject } from "react";
import PhotoSliderWidget from "./PhotoSliderWidget";
import CloseIcon from "@mui/icons-material/Close";
import PhotoDesc from "../PhotoDesc";
//import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import { usePhotoSliderContext } from "../../hook/usePhotoSliderContext";

/* export type PhotoSliderWithDescProps = Omit<
  PhotoSliderProps,
  "onToggleDesc"
> & {
  activePhoto?: Photo<FirestoreDate>;
  //showEditPhotoForm?: () => void;
  isEditingActivePhoto: boolean;
  fullscreenElemRef: MutableRefObject<any>;
}; */

const PhotoSliderWithDesc: FC = () => {
  /* const [width, setWidth] = useState(0);

  const toggleDesc = useCallback(
    () => setWidth((width) => (width === 0 ? 290 : 0)),
    []
  ); */

  //console.log("[RENDER PHOTO SLIDER WITH DESC]");

  const { toggleDesc, descWidth, fullscreenElemRef } = usePhotoSliderContext();

  return (
    <Box
      ref={fullscreenElemRef}
      id="super_photo_slider_23klj2342"
      className="w-full h-full flex flex-nowrap flex-grow-0 flex-shrink-0 bg-black overflow-hidden"
    >
      <PhotoSliderWidget />
      <Box
        sx={{
          height: "100%",
          width: `${descWidth}px`,
          flexShrink: 0,
          flexGrow: 1,
          overflowY: "auto",
          overflowX: "hidden",
          transitionProperty: "width",
          transitionDuration: "0.5s",
          bgcolor: "background.paper",
        }}
      >
        <IconButton onClick={toggleDesc} aria-label="скрыть описание фото">
          <CloseIcon
            fontSize="small"
            sx={{
              color: "secondary.main",
            }}
          />
        </IconButton>
        <PhotoDesc
        /* 
          photo={activePhoto}
          photoLoading={props.photosLoading}
          photoError={props.photosError}
          isEditable={props.isEditable}
          isEditor={props.isEditor}
          isPhotoEditing={isEditingActivePhoto}
          userUid={props.userUid}
          //tagsState: ITagsState;
          showEditPhotoForm={props.showEditPhotoForm}
         */
        />
      </Box>
    </Box>
  );
};

export default PhotoSliderWithDesc;
