// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN_KEY,
    projectId: FIREBASE_PROJECT_ID_KEY,
    storageBucket: FIREBASE_STORAGEBUCKET_KEY,
    messagingSenderId: FIREBASE_MESSAGINGSENDERID_KEY,
    appId: FIREBASE_APPID_KEY,
    measurementId: FIREBASE_MEASUREMENTID_KEY
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
