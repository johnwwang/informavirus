// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyARopibwAQzw5eeaWIQcH7No4XSpzy0CIA",
  authDomain: "informavirus-8b544.firebaseapp.com",
  databaseURL: "https://informavirus-8b544.firebaseio.com",
  projectId: "informavirus-8b544",
  storageBucket: "informavirus-8b544.appspot.com",
  messagingSenderId: "526335992558",
  appId: "1:526335992558:web:52938f7b53d53e3b1789ff",
  measurementId: "G-BGEVYYRR65"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
// firebase.analytics();


let firebaseAuth = firebaseApp.auth();
let firebaseDb = firebaseApp.database();

export { firebaseAuth, firebaseDb }