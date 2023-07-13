import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH48Y_7_jUfrb017avJC-Ci-zkHoZ4vx8",
  authDomain: "auth-test-1afda.firebaseapp.com",
  databaseURL: "https://auth-test-1afda-default-rtdb.firebaseio.com",
  projectId: "auth-test-1afda",
  storageBucket: "auth-test-1afda.appspot.com",
  messagingSenderId: "990280085226",
  appId: "1:990280085226:web:d5b321ccb3fef3007d3193",
  measurementId: "G-12J8QKGBLQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage=getStorage(app);
export default app;
