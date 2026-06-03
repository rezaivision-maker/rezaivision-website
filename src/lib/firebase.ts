import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "rezaivisioncms",
  appId: "1:119103386800:web:ce2890ce9fe57b6e1d7775",
  storageBucket: "rezaivisioncms.firebasestorage.app",
  apiKey: "AIzaSyAYgrWpiiGrsBeZ5v2GLBD-0P_oaI7yR3I",
  authDomain: "rezaivisioncms.firebaseapp.com",
  messagingSenderId: "119103386800",
  measurementId: "G-LY7W9J8KX2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
