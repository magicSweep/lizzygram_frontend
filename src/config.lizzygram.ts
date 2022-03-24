/* FIRESTORE */
// [ feeling, withWho, where]
//export const lNumberOfTagsByType = [3, 6, 4];
export const lNumberOfTagsByType = [
  { type: "withWho", quantity: 6 },
  { type: "where", quantity: 4 },
  { type: "feeling", quantity: 3 },
];
export const lNumberOfTags = 11;
export const lNumberOfTagsByPhoto = 4;

export const lFirebaseConfig = {
  apiKey: "AIzaSyDKywOLq8yuozmOXjtOUIR7yUXBekDoN3A",
  authDomain: "lizzigram-1600291187801.firebaseapp.com",
  databaseURL: "https://lizzigram-1600291187801.firebaseio.com",
  projectId: "lizzigram-1600291187801",
  storageBucket: "lizzigram-1600291187801.appspot.com",
  messagingSenderId: "944169679344",
  appId: "1:944169679344:web:d376029997bd7351b04535",
  measurementId: "G-C9Q921F1E6",
};

// photos validation
export const lMaxDate = new Date();
export const lMinDate = new Date("2018-07-08");

// EXPRESS SERVER

export const lExpressUrl = "https://localhost:3009";

// SITE METADATA
export const lGlobalTitle = "Lizzygram приветствует тебя";
