export const classifyTicket = (text) => {
  const msg = text.toLowerCase();

  let category = "Software";
  let priority = "Low";

  if (msg.includes("wifi") || msg.includes("internet") || msg.includes("network")) {
    category = "Network";
    priority = "High";
  }

  if (msg.includes("printer")) {
    category = "Printer";
    priority = "Medium";
  }

  if (msg.includes("password") || msg.includes("login")) {
    category = "Password Reset";
  }

  if (msg.includes("projector")) {
    category = "Projector";
  }

  if (msg.includes("server down") || msg.includes("all computers")) {
    priority = "High";
  }

  return { category, priority };
};