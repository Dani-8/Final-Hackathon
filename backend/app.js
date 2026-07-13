import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
// -----------------------------------------------
// -----------------------------------------------

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MaintainIQ API is running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});