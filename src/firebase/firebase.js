// Import Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBE8x0a5nl8mnvCbKfg9-ziHUo6YKnFHs8",
  authDomain: "ai-ict-support-frontend.firebaseapp.com",
  projectId: "ai-ict-support-frontend",
  storageBucket: "ai-ict-support-frontend.firebasestorage.app",
  messagingSenderId: "1050997816525",
  appId: "1:1050997816525:web:8a61ace787c325adb6bd84",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;