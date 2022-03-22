// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0sK1nkkeede6fKT9oJikUc0PydqSoTl8",
  authDomain: "takarewards.firebaseapp.com",
  projectId: "takarewards",
  storageBucket: "takarewards.appspot.com",
  messagingSenderId: "443614509657",
  appId: "1:443614509657:web:d800c49f3692ce36c98f48"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
//const storage = getStorage(app);

export {
  app, db, //storage
}