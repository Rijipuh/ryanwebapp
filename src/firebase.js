import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCAvTWqD3F7cTFQbaZI4Cx3E6EYpf5N5wA",
  authDomain: "rijipuh.firebaseapp.com",
  databaseURL: "https://rijipuh.firebaseio.com",
  projectId: "rijipuh",
  storageBucket: "",
  messagingSenderId: "1040319343055",
  appId: "1:1040319343055:web:d86a8eb604cb1455"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
