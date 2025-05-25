// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6ApVc694NhGPsm3LFilm9qUsXnjFP9w4",
  authDomain: "clone-af8c8.firebaseapp.com",
  projectId: "clone-af8c8",
  storageBucket: "clone-af8c8.firebasestorage.app",
  messagingSenderId: "570383090667",
  appId: "1:570383090667:web:4ff9170ba847bab565cfae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const  auth = getAuth(app);
export const db =getFirestore(app)