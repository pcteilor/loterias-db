// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbJnupvDqv4yfKaj4ONCaFA-BRWBQ8DYM",
  authDomain: "db-loterias.firebaseapp.com",
  databaseURL: "https://db-loterias-default-rtdb.firebaseio.com",
  projectId: "db-loterias",
  storageBucket: "db-loterias.appspot.com",
  messagingSenderId: "656122483817",
  appId: "1:656122483817:web:5486c536343b078c457ef8",
  measurementId: "G-DY5LY0KWCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
