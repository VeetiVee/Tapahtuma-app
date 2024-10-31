import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA8wAxW12sjkdV3qYbUXZzhPcb_Edbecs",
  authDomain: "tapis-app.firebaseapp.com",
  projectId: "tapis-app",
  storageBucket: "tapis-app.appspot.com",
  messagingSenderId: "656123532823",
  appId: "1:656123532823:web:e36faaf2d317e553162e52",
  measurementId: "G-DE49K96YS5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
