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



