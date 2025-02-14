const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { authenticateUser, authorizeAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// 📌 User Registration (Default role: User)
router.post("/register", registerUser);

// 📌 User Login
router.post("/login", loginUser);

// 🔐 Protected Route: Only Authenticated Users Can Access
router.get("/profile", authenticateUser, (req, res) => {
  res.status(200).json({
    message: "User Profile",
    user: req.user, // Data from authentication middleware
    token: req.header("Authorization"),
  });
});

// 🔐 Admin-Only Route
router.get("/admin", authenticateUser, authorizeAdmin, (req, res) => {
  res.status(200).json({
    message: "Admin Dashboard - Access Granted",
    user: req.user, // Displaying admin details
  });
});

module.exports = router;
