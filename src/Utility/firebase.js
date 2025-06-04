// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";


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
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

// src/Utility/firebase.js

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "YOUR_FIREBASE_API_KEY",            // Replace with your Firebase API key
//   authDomain: "YOUR_PROJECT_ID.firebaseapp.com", // Replace with your Firebase Auth domain
//   projectId: "YOUR_PROJECT_ID",                // Replace with your project ID
//   storageBucket: "YOUR_PROJECT_ID.appspot.com", // Replace with your storage bucket
//   messagingSenderId: "YOUR_SENDER_ID",          // Replace with your sender ID
//   appId: "YOUR_APP_ID"                           // Replace with your app ID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Export auth and firestore instances
// export const auth = getAuth(app);
// export const db = getFirestore(app);
