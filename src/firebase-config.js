import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDFwz9wWLfJTDwExGLejTBQZIaqppnHhN4",
  authDomain: "training2024-f802c.firebaseapp.com",
  projectId: "training2024-f802c",
  storageBucket: "training2024-f802c.appspot.com",
  messagingSenderId: "428955412834",
  appId: "1:428955412834:web:58bec5487b27299832a43b",
  measurementId: "G-746Q16BGGR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const database = getDatabase(app);

export default app;
