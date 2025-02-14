const express = require("express");
const { authenticateUser, authorizeAdmin } = require("../middleware/authMiddleware");
const { adminDashboard } = require("../controllers/adminController");

const router = express.Router();

// Protect this route so only admins can access it
router.get("/", authenticateUser, authorizeAdmin, adminDashboard);

module.exports = router;
