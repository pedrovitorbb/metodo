import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCO52NXqG1A7iZOOK96yr1IntIyS3BPffk",
  authDomain: "login-67c98.firebaseapp.com",
  projectId: "login-67c98",
  storageBucket: "login-67c98.firebasestorage.app",
  messagingSenderId: "792375254516",
  appId: "1:792375254516:web:847b2a927667a3d1beeda1",
  measurementId: "G-HFH4EZBQNV"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
