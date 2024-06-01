import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAF2SlEgPmwPnIm2I_Xr6p6bz8DiXs6k8I",
  authDomain: "chatapp-ea78c.firebaseapp.com",
  projectId: "chatapp-ea78c",
  storageBucket: "chatapp-ea78c.appspot.com",
  messagingSenderId: "895962252274",
  appId: "1:895962252274:web:f1ad1c15843a6f6d7fa16b",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const database = getFirestore();

export default auth;