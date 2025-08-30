import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2CCAOqlw3X4-h1K_zLp_m_O92q22ZlBM",
  authDomain: "management-77d08.firebaseapp.com",
  projectId: "management-77d08",
  storageBucket: "management-77d08.firebasestorage.app",
  messagingSenderId: "687914750384",
  appId: "1:687914750384:web:7bd8f82ed43055a29d0675"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };