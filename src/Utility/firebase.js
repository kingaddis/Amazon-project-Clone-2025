// src/Utility/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjx3KZ6Q9uvJ-Yck1JLKbgL5N82eyaFBc",
  authDomain: "project-clone-2025.firebaseapp.com",
  projectId: "project-clone-2025",
  storageBucket: "project-clone-2025.firebasestorage.app",
  messagingSenderId: "464424647494",
  appId: "1:464424647494:web:a52d5c958f2d643fd8c347",
  measurementId: "G-WBWESYR2XY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize auth and db
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export them for use in other files
export { auth, db };
