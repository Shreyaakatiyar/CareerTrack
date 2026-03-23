import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYK10f8V_0gdM6Ei5hHPLMtibKGHOhlpM",
  authDomain: "careertrack-db8fb.firebaseapp.com",
  projectId: "careertrack-db8fb",
  storageBucket: "careertrack-db8fb.firebasestorage.app",
  messagingSenderId: "931771471451",
  appId: "1:931771471451:web:466ccf1af521abf3add17e",
  measurementId: "G-VY164GSNWY"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();