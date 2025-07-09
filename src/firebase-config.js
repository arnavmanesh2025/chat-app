// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEEFbktohk_O57qTFnC9TWPWJxlHc9YDs",
  authDomain: "chat-app-d8d81.firebaseapp.com",
  projectId: "chat-app-d8d81",
  storageBucket: "chat-app-d8d81.firebasestorage.app",
  messagingSenderId: "505458343079",
  appId: "1:505458343079:web:96b5ecbd480e05c8acaf82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const provider =new GoogleAuthProvider();
export const db= getFirestore(app);