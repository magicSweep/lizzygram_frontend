import {
  downloadPhotoUrl,
  photoCardWidth,
  photoCardHeight,
  //maxAppWidth,
} from "../config";
import { FirestoreDate } from "lizzygram-common-data/dist/types";
import { intersection } from "lodash-es";

export const makePhotoId = () => {
  return (90000000000000 - Date.now()).toString();
};

export const makeDownloadPhotoUrl = (
  googleDriveId: string,
  imageExtention: string
) => {
  let downloadUrl = `${downloadPhotoUrl}/${googleDriveId}`;
  if (imageExtention) downloadUrl += `.${imageExtention}`;

  return downloadUrl;
};

// AGE AND DATE

export const getDate = (date: Date | number | string | FirestoreDate): Date => {
  let resultDate = undefined;

  /* console.log(
      "GET DATE",
      date.hasOwnProperty("toDate"),
      (date as any).toDate ? true : false
    );
   */
  if (date instanceof Date) return date;

  if ((date as FirestoreDate).toDate) {
    return (date as any).toDate();
  }

  if (typeof date === "string") {
    resultDate = new Date(date);
    if (resultDate.toString() === "Invalid Date")
      resultDate = new Date(parseInt(date));
  } else {
    // @ts-ignore
    resultDate = new Date(date);
  }

  if (resultDate.toString() === "Invalid Date")
    throw new Error("Bad date in PhotoDesc");

  return resultDate;
};

export const millisecondsToYears = (mSeconds: number) => {
  return Math.floor(mSeconds / 31536000000);
};

export const getLizzyYearsOld = () => {
  const birthday = new Date("2018-07-07");

  const now = new Date();

  const mSeconds = now.getTime() - birthday.getTime();

  return millisecondsToYears(mSeconds);
};

export const getYearsOld = (date: Date) => {
  const birthday = new Date("2018-07-07");

  //console.log("Date", date.getTime(), birthday.getTime());

  const mSeconds = date.getTime() - birthday.getTime();

  //console.log("mSeconds", mSeconds);

  //console.log("result", mSeconds / 31536000000);

  return millisecondsToYears(mSeconds);
};

export const getAlphabetMonth = (date: Date, withDay: boolean = false) => {
  const month = date.getMonth();
  switch (month) {
    case 0:
      return `январ${withDay ? "я" : "ь"}`;
    case 1:
      return `феврал${withDay ? "я" : "ь"}`;
    case 2:
      return `март${withDay ? "а" : ""}`;
    case 3:
      return `апрел${withDay ? "я" : "ь"}`;
    case 4:
      return `ма${withDay ? "я" : "й"}`;
    case 5:
      return `июн${withDay ? "я" : "ь"}`;
    case 6:
      return `июл${withDay ? "я" : "ь"}`;
    case 7:
      return `август${withDay ? "а" : ""}`;
    case 8:
      return `сентябр${withDay ? "я" : "ь"}`;
    case 9:
      return `октябр${withDay ? "я" : "ь"}`;
    case 10:
      return `ноябр${withDay ? "я" : "ь"}`;
    case 11:
      return `декабр${withDay ? "я" : "ь"}`;

    default:
      throw new Error(`Unknown month number  ${month}`);
  }
};

export const calcPhotosLimitPerQuery = () => {
  if (typeof window !== "undefined") {
    let width = screen.width;
    const height = screen.height;

    //width = width > maxAppWidth ? maxAppWidth : width;

    let numberOfElementsByWidth = Math.floor(width / photoCardWidth);

    numberOfElementsByWidth =
      numberOfElementsByWidth === 0 ? 1 : numberOfElementsByWidth;

    //Math.ceil(height / photoCardHeight)
    // we add two additional rows
    let numberOfElementsByHeight = Math.floor(height / photoCardHeight) + 2;

    const res = numberOfElementsByWidth * numberOfElementsByHeight;

    return res < 5 ? 5 : res;
  } else {
    return 0;
  }
};

export const getFormattedYearsOld = (yearsOld: number): string => {
  switch (yearsOld) {
    case 0:
      return "Меньше года";
    case 1:
      return "1 год";
    case 2:
      return "2 года";
    case 3:
      return "3 года";
    case 4:
      return "4 года";
    case 5:
      return "5 лет";
    case 6:
      return "6 лет";
    case 7:
      return "7 лет";
    case 8:
      return "8 лет";
    case 9:
      return "9 лет";
    case 10:
      return "10 лет";
    case 11:
      return "11 лет";
    case 12:
      return "12 лет";
    case 13:
      return "13 лет";
    case 14:
      return "14 лет";
    case 15:
      return "15 лет";
    case 16:
      return "16 лет";

    default:
      `${yearsOld}`;
    /* default:
      throw new Error(`No implementation or bad data | ${yearsOld}`); */
  }
};

export const makeYearsOldStringify = (date: Date) => {
  const yearsOld = getYearsOld(date);

  return getFormattedYearsOld(yearsOld);
};

export const getFormatDate = (date: Date) => {
  const day = date.getDate();
  const month = getAlphabetMonth(date);
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

// OTHER

export const isSameArrayValues = (arr1: string[], arr2: string[]) => {
  const resIntersection = intersection(arr1, arr2);
  if (
    resIntersection.length !== arr1.length ||
    resIntersection.length !== arr2.length
  ) {
    return false;
  }

  return true;
};

export const getOnlyTrueTags = (tags: { [name: string]: boolean }) => {
  const result: { [id: string]: boolean } = {};
  for (let id in tags) {
    if (tags[id] === true) {
      result[id] = true;
    }
  }

  return result;
};
