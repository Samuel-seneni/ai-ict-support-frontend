import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const smartAssign = async (category) => {
  const snapshot = await getDocs(collection(db, "technicians"));

  let best = null;
  let bestScore = -999;

  snapshot.forEach((doc) => {
    const t = doc.data();

    const skillMatch = t.skills?.includes(category) ? 10 : 0;
    const loadPenalty = (t.activeTickets || 0) * 2;
    const availability = t.available ? 5 : -10;

    const score = skillMatch + availability - loadPenalty;

    if (score > bestScore) {
      bestScore = score;
      best = { id: doc.id, ...t };
    }
  });

  return best;
};