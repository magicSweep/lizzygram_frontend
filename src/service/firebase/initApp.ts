import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "../../config";

//CONFIG FIREBASE

export default function () {
  const apps = getApps();
  if (typeof window !== "undefined" && apps.length === 0)
    initializeApp(firebaseConfig);
}

/* export default function(){
    const apps = getApps();
  if (typeof window !== "undefined" && firebase.apps && !firebase.apps.length)
    initializeApp(firebaseConfig);
}; */
