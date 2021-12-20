import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config";

export const init = () => initializeApp(firebaseConfig);
