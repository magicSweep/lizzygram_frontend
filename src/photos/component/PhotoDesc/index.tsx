import React from "react";
import {
  getFormatDate,
  makeYearsOldStringify,
  getDate,
} from "./../../../utils/app";
//import { getDate } from "../../../utils/app";
import CircularProgress from "@mui/material/CircularProgress";
import Tags from "../../../tags/container/Tags";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
//import Link from "@mui/material/Link";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import DownloadPhotoLink from "../DownloadPhoto/Link";
import { getBuildFor } from "lizzygram-common-data";
import { BuildFor } from "lizzygram-common-data/dist/types";

//import { DownloadOriginalPhotoData } from "../../types";

export interface PhotoDescProps {
  photo: Photo<FirestoreDate> | undefined;
  photoLoading: boolean;
  photoError: boolean;
  isEditable: boolean;
  isEditor: boolean;
  isPhotoEditing: boolean;
  userUid: string;
  showEditPhotoForm?: () => void;
}

const MainWrapper = ({ className, children }: any) => {
  return (
    <div
      className={`
     w-80 h-full ${className === undefined ? "" : className}
  `}
    >
      {children}
    </div>
  );
};

const Wrapper = (props: any) => {
  return (
    <div className="p-3 w-full">
      <Box component="h5" typography="body2">
        {props.title}
      </Box>
      {props.children}
    </div>
  );
};

export const PhotoDesc_ =
  (buildFor: BuildFor) =>
  ({
    //photo,
    /* tags,
      error,
      loading, */
    photo,
    photoLoading,
    photoError,
    isEditable,
    isEditor,
    isPhotoEditing,
    userUid,
    //tagsState,
    showEditPhotoForm,
  }: //downloadPhotoData,
  PhotoDescProps) => {
    //console.log("RENDER PHOTO DESC", photo, photoLoading, isPhotoEditing);

    if (photo === undefined)
      return (
        <MainWrapper>
          <Box className="block p-4" component="p" typography="body2">
            Нет информации о фото...
          </Box>
        </MainWrapper>
      );

    // photoError - show nothing
    if (photoError)
      return (
        <MainWrapper>
          <Box
            className="block p-4"
            component="p"
            color="error.main"
            typography="body2"
          >
            К сожалению, произошла ошибочка...
          </Box>
        </MainWrapper>
      );

    // photoLoading - show spinner
    if (photoLoading || isPhotoEditing)
      return (
        <MainWrapper className="flex justify-center pt-8">
          <CircularProgress size={20} thickness={2.4} />
        </MainWrapper>
      );

    // photo - show desc, if isEditable - show edit btn

    //if (photo === undefined) throw new Error("Bad, bad photo");

    const finalDate = getDate(photo.date);

    const formatDate = getFormatDate(finalDate);

    const yearsOldFormated = makeYearsOldStringify(finalDate);

    const onEdit = () => {
      if (showEditPhotoForm) showEditPhotoForm();
    };

    return (
      <div className="w-80 pl-2">
        <Wrapper title="Дата">
          <Box component="span" typography="body2">
            {formatDate}
          </Box>
        </Wrapper>

        {buildFor === "lizzygram" && (
          <Wrapper title="Возраст">
            <Box component="span" typography="body2">
              {yearsOldFormated}
            </Box>
          </Wrapper>
        )}

        {isEditor === true && (
          <Wrapper title="Оригинал фото">
            <DownloadPhotoLink
              userUid={userUid}
              googleDriveId={photo.googleDriveId}
              imageExtension={photo.imageExtention}
            />
          </Wrapper>
        )}

        {photo.description && (
          <Wrapper title="Комментарий">
            <Box component="p" typography="body2">
              {photo.description}
            </Box>
          </Wrapper>
        )}

        <Wrapper title="Тэги">
          <Tags photoTags={photo.tags} />
        </Wrapper>

        {isEditor === true && isEditable === true && (
          <div className="p-3 text-center">
            <Button color="primary" onClick={onEdit}>
              Редактировать
            </Button>
          </div>
        )}
      </div>
    );
  };

const PhotoDesc = PhotoDesc_(getBuildFor());

export default PhotoDesc;
