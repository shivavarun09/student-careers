// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCi8gotJ2cIBArFeUnqdgSF9nDz2WuvAY",
  authDomain: "student-career-guidance-437cb.firebaseapp.com",
  projectId: "student-career-guidance-437cb",
  storageBucket: "student-career-guidance-437cb.firebasestorage.app",
  messagingSenderId: "1026286503055",
  appId: "1:1026286503055:web:2f5bc4f0c4c8547db2dcfa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
