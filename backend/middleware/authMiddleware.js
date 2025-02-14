// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // ✅ Fix parsing

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ Attach user info
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};


const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

module.exports = { authenticateUser, authorizeAdmin };
