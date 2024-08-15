import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import SignUp from "../Pages/SignUpPage/SignUp";

const firebaseConfig = {
  apiKey: "AIzaSyC2edMfu9kH7MjxuqDRSSazuM1abFhZq3c",
  authDomain: "krist-33bba.firebaseapp.com",
  projectId: "krist-33bba",
  storageBucket: "krist-33bba.appspot.com",
  messagingSenderId: "68032946745",
  appId: "1:68032946745:web:de265e6c5c5e8dff58e3e8",
  measurementId: "G-Y5B9D4X9ED",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const userCred = getFirestore(SignUp);
export const userCartItems = getFirestore();
export const confirmOrder = getFirestore();
export const googleProvider = new GoogleAuthProvider();
export const getCurrentUser = () => {
  const currentUser = auth.currentUser;
  return currentUser;
};
