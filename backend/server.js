// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const pool = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const usersRoutes = require("./routes/users");
const recipeRoutes = require("./routes/recipes");
const blogRoutes = require("./routes/blogs");
const commentRoutes = require("./routes/commentRoutes");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for frontend communication

// Routes
app.use("/api/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/blogs", blogRoutes); // ✅ Corrected blog route usage
app.use("/api/comments", commentRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Multi-Auth Node.js API! 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await pool.query("SELECT 1"); // Test DB connection
    console.log(`✅ PostgreSQL Connected`);
  } catch (error) {
    console.error("❌ Database Connection Error:", error);
  }
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
