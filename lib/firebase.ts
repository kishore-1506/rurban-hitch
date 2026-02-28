// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{ getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjFtu3WrMFmefCGZZTIWYKigD1fI_k6RQ",
  authDomain: "rurban-hitch1.firebaseapp.com",
  projectId: "rurban-hitch1",
  storageBucket: "rurban-hitch1.firebasestorage.app",
  messagingSenderId: "72933529324",
  appId: "1:72933529324:web:1caa52b8df3e07cdef77c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);