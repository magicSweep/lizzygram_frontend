import { DataAdapter } from "./../types";
import {
  BuildFor,
  ImgExt,
  MainResponseData,
  Photo,
} from "lizzygram-common-data/dist/types";
import { AddPhotoFormData } from "../../../../../../../types";
import { calcYearsOld } from "../../../../../../../../../utils/app";
import { buildFor } from "../../../../../../../../../config";

import {
  makeIconSrc,
  makeSrc,
  makeSrcSet,
  makeTagsData,
} from "../../../../../../../common/service/dataAdapter";

export {
  makeWorkerReqData,
  makeIconSrc,
  makeSrc,
  makeSrcSet,
  makeTagsData,
} from "../../../../../../../common/service/dataAdapter";

/* export const makeWorkerReqData: DataAdapter["makeWorkerReqData"] = (
  photoFile: File
) => {
  const formData = new FormData();

  formData.append("file", photoFile);

  return formData;
}; */

export const makeFirestoreReqData_: (
  buildFor: BuildFor
) => DataAdapter["makeFirestoreReqData"] =
  (buildFor) =>
  (
    {
      base64,
      webImagesInfo,
      aspectRatio,
      googleDriveId,
      imageExtention,
    }: MainResponseData,
    formData: AddPhotoFormData,
    userUid: string,
    photoId: string
  ) => {
    const yearsOld = buildFor === "lizzygram" ? calcYearsOld(formData.date) : 0;
    const srcSet = makeSrcSet(webImagesInfo.urls);
    const iconSrc = makeIconSrc(webImagesInfo.urls);
    const src = makeSrc(webImagesInfo.urls);

    const tags = makeTagsData(formData.tags);

    const photo: Photo<any> = {
      id: photoId,
      base64: base64,
      files: webImagesInfo.ids,
      aspectRatio: aspectRatio,
      src,
      srcSet,
      iconSrc,
      _timestamp: new Date(),
      description: formData.desc,
      date: formData.date,
      yearsOld,
      tags,
      googleDriveId: googleDriveId,
      imageExtention: imageExtention as ImgExt,
      addedByUserUID: userUid,
      isActive: true,
    };

    return photo;
  };

export const makeFirestoreReqData = makeFirestoreReqData_(buildFor);
