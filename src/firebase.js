// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {  collection, getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCno875fI3boZNl-sKj-VYK6jzESf6rDRI",
  authDomain: "x5-game-app.firebaseapp.com",
  projectId: "x5-game-app",
  storageBucket: "x5-game-app.firebasestorage.app",
  messagingSenderId: "363788891409",
  appId: "1:363788891409:web:6a459b5245febe09d248b0",
  measurementId: "G-BK55F5Q3GX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);
const leaderboardRef = collection(db, "leaderboard");

export { auth, leaderboardRef , db};