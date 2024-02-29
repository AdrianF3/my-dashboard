import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase Environment Variables
let apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
let authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
let projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
let storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
let messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
let appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
