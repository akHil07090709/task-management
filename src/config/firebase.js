// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApf_oISks0EpAIU11CnwMJ8D9aGZO27Kw",
  authDomain: "task-management-app-1695d.firebaseapp.com",
  projectId: "task-management-app-1695d",
  storageBucket: "task-management-app-1695d.firebasestorage.app",
  messagingSenderId: "246351165612",
  appId: "1:246351165612:web:38134579a6f80c9cdc4709",
  measurementId: "G-ZEZ28W5R0V",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
setPersistence(auth, browserLocalPersistence);
getAnalytics(app);


export {
  auth,
  provider,
  onAuthStateChanged,
  db,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
};
