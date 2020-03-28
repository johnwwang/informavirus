// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDAals3B6FJIplAAAqMnhmtpNteF2t78f4",
  authDomain: "chat-31b5f.firebaseapp.com",
  databaseURL: "https://chat-31b5f.firebaseio.com",
  projectId: "chat-31b5f",
  storageBucket: "chat-31b5f.appspot.com",
  messagingSenderId: "502415556218",
  appId: "1:502415556218:web:7d8d02d8169fba009bc5c3",
  measurementId: "G-VHX9PNEZMR"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
// firebase.analytics();


let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb }