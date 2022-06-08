import { calcPhotosLimitPerQuery } from "./../utils/app";
import {
  lNumberOfTagsByType,
  lExpressUrl,
  lFirebaseConfig,
  lNumberOfTags,
  lNumberOfTagsByPhoto,
  lGlobalTitle,
  lMinDate,
  lMaxDate,
} from "./config.lizzygram";
import {
  pExpressUrl,
  pFirebaseConfig,
  pNumberOfTags,
  pNumberOfTagsByPhoto,
  pNumberOfTagsByType,
  pGlobalTitle,
  pMaxDate,
  pMinDate,
} from "./config.portfolio";
import { BuildFor } from "lizzygram-common-data/dist/types";

export const buildFor = process.env.GATSBY_BUILD_FOR as BuildFor;

// DIFFERENCE
// - Tags, SearchForm - ageSelect, config - firestore and worker
//////////////////////////

// SHARED CONFIG

// photos validation
export const maxDate = buildFor === "portfolio" ? pMaxDate : lMaxDate;
export const minDate = buildFor === "portfolio" ? pMinDate : lMinDate;

// title
export const globalTitle =
  buildFor === "portfolio" ? pGlobalTitle : lGlobalTitle;

// tags
export const tagsTitleByType = {
  feeling: "Настроение",
  where: "Где",
  withWho: "С кем",
  genre: "Жанр",
  details: "Детали",
};

export const numberOfTagsByType =
  buildFor === "portfolio" ? pNumberOfTagsByType : lNumberOfTagsByType;
export const numberOfTags =
  buildFor === "portfolio" ? pNumberOfTags : lNumberOfTags;
export const numberOfTagsByPhoto =
  buildFor === "portfolio" ? pNumberOfTagsByPhoto : lNumberOfTagsByPhoto;

export const firebaseConfig =
  buildFor === "portfolio" ? pFirebaseConfig : lFirebaseConfig;

// express server

export const expressUrl = buildFor === "portfolio" ? pExpressUrl : lExpressUrl;

/////////////////

/* PORTAL ELEMENTS */
export const modalId = "modal";
export const alertId = "alert";

/* FIRESTORE */

export const photosCollectionName = "photos";
//process.env.NODE_ENV === "test" ? "phototest" : "photos";
//export const testPhotosCollectionName = "phototest";

export const tagsCollectionName = "tags";
export const usersCollectionName = "users";

/* export const firebaseConfig = {
  apiKey: "AIzaSyDKywOLq8yuozmOXjtOUIR7yUXBekDoN3A",
  authDomain: "lizzigram-1600291187801.firebaseapp.com",
  databaseURL: "https://lizzigram-1600291187801.firebaseio.com",
  projectId: "lizzigram-1600291187801",
  storageBucket: "lizzigram-1600291187801.appspot.com",
  messagingSenderId: "944169679344",
  appId: "1:944169679344:web:d376029997bd7351b04535",
  measurementId: "G-C9Q921F1E6",
}; */

/* LOCAL STORAGE */

// Auth
export const authLocalStorageKey = "lg_super_puper_user";

// Theme info
export const themeLocalStorageKey = "lg_theme_info_1ghf2qw34wwqqe";

/* EXPRESS SERVER */

//export const expressUrl = "https://lizzygram.herokuapp.com";
//export const expressUrl = "http://localhost:3009";

//export const herokuPingUrl = `${expressUrl}/sleep_q23we4rt5`;

export const addPhotoUrl = `${expressUrl}/add-photo`;
export const editPhotoUrl = `${expressUrl}/edit-photo`;

export const workerPhotoUrl = `${expressUrl}/main`;
// download?token=12kl3kl&id=2jk2l31
export const downloadPhotoUrl = `${expressUrl}/download`;

/* PHOTOS */
export const photoCardWidth = 345;
export const photoCardHeight = 194;

export const photoCardMarginLeft = 8;
export const photoCardMarginBottom = 8;

//export const maxAppWidth = 1600;

export const addPhotoFormTitle = "Добавить новое фото";
export const editPhotoFormTitle = "Изменить фото";
export const searchPhotoFormTitle = "Поиск фото";

/* OTHER */

//export const lizzyYearsOld = getLizzyYearsOld();

export const lizzyBirthday = new Date("2018-07-08");

// NUMBER OF PHOTOS PER QUERY

export const numberOfPhotosPerQuery = 5;

// WALL OF PHOTOS | USE OBSERVABLE PHOTOS

//export const rootDivId = "wall_of_photos";
//export const idPrefix = "#OBSERVER_";
