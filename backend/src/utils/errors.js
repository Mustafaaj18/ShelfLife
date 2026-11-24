// Turns a database error into a safe message for the user.
// Never sends raw error details (they can contain passwords or database names).
export const safeError = (err) => {
  if (err.code === 11000) return "That email is already in use";
  if (err.name === "ValidationError") {
    return Object.values(err.errors).map((e) => e.message).join(", ");
  }
  console.error(err); // full details stay in the server log only
  return "Something went wrong";
};