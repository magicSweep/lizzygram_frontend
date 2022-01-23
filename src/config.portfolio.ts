/* FIRESTORE */
// [ feeling, withWho, where]
//export const pNumberOfTagsByType = [3, 6, 4];
export const pNumberOfTagsByType = [
  { type: "genre", quantity: 8 },
  { type: "details", quantity: 6 },
];
export const pNumberOfTags = 14;
export const pNumberOfTagsByPhoto = 4;

export const pFirebaseConfig = {
  apiKey: "AIzaSyApiAIF0-uviouwXWetDygVsPUdoo4QUVs",
  authDomain: "amazing-hub-338313.firebaseapp.com",
  projectId: "amazing-hub-338313",
  storageBucket: "amazing-hub-338313.appspot.com",
  messagingSenderId: "539153538932",
  appId: "1:539153538932:web:708feb233e325ecf555621",
  measurementId: "G-M2GQ13PM32",
  databaseURL: "https://amazing-hub-338313.firebaseio.com",
};

// photos validation
export const pMaxDate = new Date();
export const pMinDate = new Date("1826-07-08");

// EXPRESS SERVER

//export const pExpressUrl = "https://photo-album-worker.herokuapp.com";
export const pExpressUrl = "http://localhost:3009";

// SITE METADATA

export const pGlobalTitle = "Фото альбом приветствует тебя";

////////////////
// search form - remove age select
// tags - make widget for another tags
// auth button - in auth context meny add grant/revoke permissions option
// in gatsby-config.js - siteMetadata
