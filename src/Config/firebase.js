import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import SignUp from "../Pages/SignUpPage/SignUp";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_CONFIG_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTHDOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
  measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const userCred = getFirestore(SignUp);
export const userCartItems = getFirestore();
export const confirmOrder = getFirestore();
export const wishlistDb = getFirestore();
export const tempOrder = getFirestore();
export const address = getFirestore();
export const OTPCred = getFirestore();
export const productData = getFirestore();
export const googleProvider = new GoogleAuthProvider();
export const getCurrentUser = () => {
  const currentUser = auth.currentUser;
  return currentUser;
};
