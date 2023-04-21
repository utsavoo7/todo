import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDE47xpGQTji-KmpAWTBzmYYI_KHQw69oU",
  authDomain: "resume2-0.firebaseapp.com",
  projectId: "resume2-0",
  storageBucket: "resume2-0.appspot.com",
  messagingSenderId: "661307128082",
  appId: "1:661307128082:web:c9b956951566fe4f735bcb",
  measurementId: "G-9WTSTXKKXX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
