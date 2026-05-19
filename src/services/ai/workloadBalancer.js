import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

// =============================================
// AUTO WORKLOAD BALANCER ENGINE
// =============================================
export const getBestTechnician = async (category = null) => {
  try {
    const snapshot = await getDocs(
      collection(db, "technicians")
    );

    const technicians = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!technicians.length) return null;

    // =========================================
    // FILTER ACTIVE TECHNICIANS ONLY
    // =========================================
    const activeTechs = technicians.filter(
      (t) => t.status === "Active"
    );

    if (!activeTechs.length) return null;

    // =========================================
    // SORT BY WORKLOAD (LOWEST FIRST)
    // =========================================
    const sorted = activeTechs.sort((a, b) => {
      const loadA = a.assignedTickets || 0;
      const loadB = b.assignedTickets || 0;

      return loadA - loadB;
    });

    // =========================================
    // RETURN LEAST LOADED TECH
    // =========================================
    return sorted[0];

  } catch (error) {
    console.log("Workload Balancer Error:", error);
    return null;
  }
};