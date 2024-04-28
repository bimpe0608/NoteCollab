import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB9pfunhjKILPpl5L7fDEe8FklvDOpWOds',
  authDomain: 'student-blog-32855.firebaseapp.com',
  projectId: 'student-blog-32855',
  storageBucket: 'student-blog-32855.appspot.com',
  messagingSenderId: '985066312988',
  appId: '1:985066312988:web:283ba4c6280a04c237d6d9',
  measurementId: 'G-4GRYBMVNNP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db: Firestore = getFirestore(app);
