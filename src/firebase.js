// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCcEsouTK06TU9UvC-Vx_OnY1eIvmOnm50",
    authDomain: "assignment02-cd232.firebaseapp.com",
    projectId: "assignment02-cd232",
    storageBucket: "assignment02-cd232.firebasestorage.app",
    messagingSenderId: "568142415975",
    appId: "1:568142415975:web:582440147bb3a49d692cc2",
    measurementId: "G-2R9MRVVXM8",
    databaseURL: "https://assignment02-cd232-default-rtdb.firebaseio.com/"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
