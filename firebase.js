import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMd-R6aGXlTYijybOaRDSRVh6D-Ad5kWQ",
  authDomain: "conexia-2c179.firebaseapp.com",
  projectId: "conexia-2c179",
  storageBucket: "conexia-2c179.appspot.com",
  messagingSenderId: "299154284240",
  appId: "1:299154284240:web:476bc11af51b8a249448d5",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
