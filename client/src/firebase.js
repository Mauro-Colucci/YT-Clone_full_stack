import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "video-site-6fcd6.firebaseapp.com",
  projectId: "video-site-6fcd6",
  storageBucket: "video-site-6fcd6.appspot.com",
  messagingSenderId: "786689653763",
  appId: "1:786689653763:web:99de112e5c20de9c436236"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app