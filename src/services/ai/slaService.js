export const generateSLA = (priority) => {
  switch (priority) {
    case "High":
      return Date.now() + 1000 * 60 * 60 * 4; // 4 hours

    case "Medium":
      return Date.now() + 1000 * 60 * 60 * 24; // 24 hours

    default:
      return Date.now() + 1000 * 60 * 60 * 72; // 3 days
  }
};