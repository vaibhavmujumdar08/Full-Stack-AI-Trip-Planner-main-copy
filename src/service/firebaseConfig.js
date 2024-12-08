// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbfYMAiqrbghOPveYwL6hDrhSPL4-CiKs",
  authDomain: "travelaisdp.firebaseapp.com",
  projectId: "travelaisdp",
  storageBucket: "travelaisdp.firebasestorage.app",
  messagingSenderId: "655384571240",
  appId: "1:655384571240:web:d0f1ce226b609dda6d3add"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);

 

