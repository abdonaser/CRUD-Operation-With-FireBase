// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUjbSsSY2ENbBU6Yte416UHp6V4kxVgjo",
  authDomain: "testfirebase-fc8e4.firebaseapp.com",
  projectId: "testfirebase-fc8e4",
  storageBucket: "testfirebase-fc8e4.firebasestorage.app",
  messagingSenderId: "70850229295",
  appId: "1:70850229295:web:da2881a823a7e1c52502da",
  measurementId: "G-GVJMDBYCHD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
