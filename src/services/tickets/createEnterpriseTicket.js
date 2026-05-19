import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";

import { classifyTicket } from "../ai/classifyTicket";
import { smartAssign } from "../ai/smartAssign";
import { generateSLA } from "../ai/slaService";
import { getBestTechnician } from "../ai/workloadBalancer";

// =====================================================
// ENTERPRISE SHARED TICKET CREATION ENGINE
// =====================================================
export const createEnterpriseTicket = async ({
  formData,
  user,
  source = "Manual",
}) => {

  // ================= AI CLASSIFICATION =================
  const ai = await classifyTicket(
    `${formData.title} ${formData.description}`
  );

  // ================= SMART ASSIGNMENT =================
  const technician = await getBestTechnician(ai.category);

  // ================= SLA =================
  const slaDeadline = generateSLA(ai.priority);

  // ================= SAVE TO FIRESTORE =================
  const ticketRef = await addDoc(
    collection(db, "tickets"),
    {
      ...formData,

      category: ai.category,
      priority: ai.priority,
      status: "Open",

      createdBy: user?.email || "Unknown",
      userId: user?.uid || null,

      assignedTo: technician?.id || null,

      assignedName:
        technician?.name || "Unassigned",

      slaDeadline,

      source,

      createdAt: serverTimestamp(),
    }
  );
if (technician?.id) {
  await updateDoc(doc(db, "technicians", technician.id), {
    assignedTickets: (technician.assignedTickets || 0) + 1,
  });
}
  // ================= UPDATE TECHNICIAN =================
  if (technician?.id) {
    await updateDoc(
      doc(db, "technicians", technician.id),
      {
        activeTickets: increment(1),
      }
    );
  }

  return {
    ticketId: ticketRef.id,
    ai,
    technician,
  };
};