require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const healthRoutes = require("./routes/healthRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/books", bookRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log(`Shelf Life API running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Unable to start Shelf Life API:", error.message);
  process.exitCode = 1;
});