
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";

import { classifyTicket } from "./classifyTicket";
import { smartAssign } from "./smartAssign";
import { generateSLA } from "./slaService";

// =============================================
// CREATE TICKET FROM AI CHAT
// =============================================
export const createTicketFromAI = async ({
  text,
  user,
}) => {
  // AI CLASSIFICATION
  const ai = await classifyTicket(text);

  // TECHNICIAN ASSIGNMENT
  const technician = await smartAssign(ai.category);

  // SLA
  const slaDeadline = generateSLA(ai.priority);

  // SAVE TICKET
  const ticket = await addDoc(
    collection(db, "tickets"),
    {
      title: text.slice(0, 80),

      description: text,

      category: ai.category,
      priority: ai.priority,

      status: "Open",

      createdBy:
        user?.email || "AI Assistant",

      userId: user?.uid || null,

      assignedTo:
        technician?.id || null,

      assignedName:
        technician?.name ||
        "Unassigned",

      slaDeadline,

      source: "AI Assistant",

      createdAt: serverTimestamp(),
    }
  );

  return {
    ticketId: ticket.id,
    ai,
    technician,
  };
};