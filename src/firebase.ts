// src/firebase.ts
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCXMwFOJf_lw1OioTWsSSkXNTMjixjX4vE",
    authDomain: "pilvi-react-b15e8.firebaseapp.com",
    projectId: "pilvi-react-b15e8",
    storageBucket: "pilvi-react-b15e8.firebasestorage.app",
    messagingSenderId: "914477483142",
    appId: "1:914477483142:web:b925bceab24f54d4983d07",
    measurementId: "G-P9372T168J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
const db = getFirestore(app);
export { db };