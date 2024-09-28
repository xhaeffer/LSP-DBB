import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyD-tK-5ztDtRzoC1AlaMsmgv5WzVFN39dg",
  authDomain: "dapur-bunda-bahagia-c6ba4.firebaseapp.com",
  projectId: "dapur-bunda-bahagia-c6ba4",
  storageBucket: "dapur-bunda-bahagia-c6ba4.appspot.com",
  messagingSenderId: "611832133190",
  appId: "1:611832133190:web:3e7d2d62c536b463f27c47"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };