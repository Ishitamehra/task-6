// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCR3oI5779rWPcIB752lNgMLlk96oNyzA8",
  authDomain: "task-6-e89b9.firebaseapp.com",
  projectId: "task-6-e89b9",
  storageBucket: "task-6-e89b9.appspot.com",
  messagingSenderId: "261277408709",
  appId: "1:261277408709:web:cd3d0738edb564157a3fac",
  measurementId: "G-9R1HYLZXL3",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default auth;
