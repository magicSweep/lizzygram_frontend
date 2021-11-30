import { getLizzyYearsOld, calcPhotosLimitPerQuery } from "./utils/app";

/* PORTAL ELEMENTS */
export const modalId = "modal";
export const alertId = "alert";

/* FIRESTORE */
// [ feeling, withWho, where]
export const numberOfTagsByType = [3, 6, 4];
export const numberOfTags = 11;
export const numberOfTagsByPhoto = 4;

export const photosCollectionName = "photos";
//process.env.NODE_ENV === "test" ? "phototest" : "photos";
//export const testPhotosCollectionName = "phototest";

export const tagsCollectionName = "tags";
export const usersCollectionName = "users";

export const firebaseConfig = {
  apiKey: "AIzaSyDKywOLq8yuozmOXjtOUIR7yUXBekDoN3A",
  authDomain: "lizzigram-1600291187801.firebaseapp.com",
  databaseURL: "https://lizzigram-1600291187801.firebaseio.com",
  projectId: "lizzigram-1600291187801",
  storageBucket: "lizzigram-1600291187801.appspot.com",
  messagingSenderId: "944169679344",
  appId: "1:944169679344:web:d376029997bd7351b04535",
  measurementId: "G-C9Q921F1E6",
};

/* LOCAL STORAGE */

// Auth
export const authLocalStorageKey = "lg_super_puper_user";

// Theme info
export const themeLocalStorageKey = "lg_theme_info_1234";

/* EXPRESS SERVER */

//export const expressUrl = "https://lizzygram.herokuapp.com";
export const expressUrl = "http://localhost:3009";

export const herokuPingUrl = `${expressUrl}/sleep_q23we4rt5`;

export const addPhotoUrl = `${expressUrl}/add-photo`;
export const editPhotoUrl = `${expressUrl}/edit-photo`;
// download/:photoId
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

export const lizzyYearsOld = getLizzyYearsOld();

export const lizzyBirthday = new Date("2018-07-08");

// NUMBER OF PHOTOS PER QUERY

//export const numberOfPhotosPerQuery = calcPhotosLimitPerQuery();

export const numberOfPhotosPerQuery = 5;

// WALL OF PHOTOS | USE OBSERVABLE PHOTOS

//export const rootDivId = "wall_of_photos";
//export const idPrefix = "#OBSERVER_";
