// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7qTm4G851IO5MUHmyIsmkc9FvfZScX-o",
  authDomain: "baiboly-db.firebaseapp.com",
  projectId: "baiboly-db",
  storageBucket: "baiboly-db.appspot.com",
  messagingSenderId: "327148940303",
  appId: "1:327148940303:web:f20560e4fc8b106adf477a",
  measurementId: "G-G3X3STEPNS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;
