import IconButton from "@mui/material/IconButton";
import Box from "@mui/system/Box";
import React, { FC, useState, useCallback, MutableRefObject } from "react";
import PhotoSliderWidget, { PhotoSliderProps } from "./PhotoSliderWidget";
import CloseIcon from "@mui/icons-material/Close";
import PhotoDesc from "../../component/PhotoDesc";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";

export type PhotoSliderWithDescProps = Omit<
  PhotoSliderProps,
  "onToggleDesc"
> & {
  activePhoto?: Photo<FirestoreDate>;
  //showEditPhotoForm?: () => void;
  isEditingActivePhoto: boolean;
  fullscreenElemRef: MutableRefObject<any>;
};

const PhotoSliderWithDesc: FC<PhotoSliderWithDescProps> = ({
  activePhoto,
  isEditingActivePhoto,
  fullscreenElemRef,
  ...props
}) => {
  const [width, setWidth] = useState(0);

  const toggleDesc = useCallback(
    () => setWidth((width) => (width === 0 ? 290 : 0)),
    []
  );

  //console.log("[RENDER PHOTO SLIDER WITH DESC]");

  return (
    <Box
      ref={fullscreenElemRef}
      id="super_photo_slider_23klj2342"
      className="w-full h-full flex flex-nowrap flex-grow-0 flex-shrink-0 bg-black overflow-hidden"
    >
      <PhotoSliderWidget
        {...props}
        isEditingActivePhoto={isEditingActivePhoto}
        onToggleDesc={toggleDesc}
      />
      <Box
        sx={{
          height: "100%",
          width: `${width}px`,
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
          photo={activePhoto}
          photoLoading={props.loading}
          photoError={props.error}
          isEditable={props.isEditableActivePhoto}
          isEditor={props.isEditor}
          isPhotoEditing={isEditingActivePhoto}
          userUid={props.userUid}
          //tagsState: ITagsState;
          showEditPhotoForm={props.showEditPhotoForm}
        />
      </Box>
    </Box>
  );
};

export default PhotoSliderWithDesc;
