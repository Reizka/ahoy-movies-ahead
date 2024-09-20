// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_KEY,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_KEY,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET_KEY,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID_KEY,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID_KEY,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID_KEY
};

// Initialize Firebase
console.log(firebaseConfig)
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
