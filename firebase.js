// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOTbbQYGBUmlF6HlEsFAsZEVxJ2uA2Vjw",
  authDomain: "flashcard-saas-7600c.firebaseapp.com",
  projectId: "flashcard-saas-7600c",
  storageBucket: "flashcard-saas-7600c.appspot.com",
  messagingSenderId: "1006296362712",
  appId: "1:1006296362712:web:25e5633eb37cb008e071ad",
  measurementId: "G-5YGRZYV31B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export default db;