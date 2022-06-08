import { compose, set, elif, justReturn } from "fmagic";
import { photoSizes } from "lizzygram-common-data";
import { TagsData } from "lizzygram-common-data/dist/types";
import { TagsFormState } from "../../../../../../../../../tags/types";
import {
  WebSecureUrl,
  Width,
  //PhotoFieldsToUpdateOnAdd,
  //PhotoFieldsToUpdateOnEdit,
} from "../types";

export const makeTagsData = (tagsFormState: TagsFormState): TagsData => {
  const tags: TagsData = {};

  for (let tagId in tagsFormState) {
    if (tagsFormState[tagId] === true) {
      tags[tagId] = true;
    }
  }

  return tags;
};

export const makeSrcSet = (webUrls: Map<Width, WebSecureUrl>) => {
  let result = "";

  //"/images/girl_300.jpeg 300w, /images/girl_600.jpeg 600w"

  //@ts-ignore
  for (let webUrl of webUrls) {
    switch (webUrl[0]) {
      case 320:
        //result += `${urlByWidth[1]} 400w, `;
        break;
      case 800:
        result += `${webUrl[1]} 600w, `;
        break;
      case 1280:
        result += `${webUrl[1]} 1000w, `;
        break;
      case 1920:
        result += `${webUrl[1]} 1500w, `;
        break;
      case 3840:
        result += `${webUrl[1]} 2300w`;
        break;

      default:
        throw new Error(
          `No implementation for width = ${webUrl[0]} in getSrcSet`
        );
    }
  }

  return result;
};

export const makeSrc_ = (photoSizes: any) => (urls: Map<number, string>) => {
  return urls.get(photoSizes[1].width);
};

export const makeIconSrc_ =
  (photoSizes: any) => (urls: Map<number, string>) => {
    return urls.get(photoSizes[0].width);
  };

export const makeIconSrc = makeIconSrc_(photoSizes);

export const makeSrc = makeSrc_(photoSizes);
