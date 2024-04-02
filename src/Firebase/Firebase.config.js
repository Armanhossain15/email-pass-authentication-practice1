// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1Lv24TrCV94OFgWoUr6kD477KV_64bFk",
  authDomain: "email-pass-auth-3aa86.firebaseapp.com",
  projectId: "email-pass-auth-3aa86",
  storageBucket: "email-pass-auth-3aa86.appspot.com",
  messagingSenderId: "208459761602",
  appId: "1:208459761602:web:3e6f49b619a8ac4f82385b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth