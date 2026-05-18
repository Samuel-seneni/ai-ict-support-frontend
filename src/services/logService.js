import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export const addLog = async (
  action,
  user,
  role
) => {
  try {
    await addDoc(
      collection(db, "activityLogs"),
      {
        action,
        user,
        role,
        timestamp: serverTimestamp(),
      }
    );
  } catch (error) {
    console.log(error);
  }
};