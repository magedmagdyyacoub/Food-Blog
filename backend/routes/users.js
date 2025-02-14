const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await pool.query("SELECT id, name, email, role FROM users");
    res.json(users.rows);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new user
router.post("/", async (req, res) => {
  let { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields (name, email, password, role) are required" });
  }

  role = role.toLowerCase();
  if (role !== "user" && role !== "admin") {
    return res.status(400).json({ error: "Invalid role. Allowed values: 'user', 'admin'" });
  }

  try {
    // Check if email already exists
    const emailCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists. Please use a different email." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
      [name, email, hashedPassword, role]
    );

    res.status(201).json({ message: "User added successfully", user: newUser.rows[0] });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  let { name, email, role, password } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ error: "All fields (name, email, role) are required" });
  }

  role = role.toLowerCase();
  if (role !== "user" && role !== "admin") {
    return res.status(400).json({ error: "Invalid role. Allowed values: 'user', 'admin'" });
  }

  try {
    // Check if email already exists for another user
    const emailCheck = await pool.query("SELECT id FROM users WHERE email = $1 AND id <> $2", [email, id]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: "Email is already in use by another user." });
    }

    let updatedUser;
    if (password) {
      // Hash new password if provided
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedUser = await pool.query(
        "UPDATE users SET name = $1, email = $2, role = $3, password = $4 WHERE id = $5 RETURNING id, name, email, role",
        [name, email, role, hashedPassword, id]
      );
    } else {
      updatedUser = await pool.query(
        "UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING id, name, email, role",
        [name, email, role, id]
      );
    }

    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser.rows[0] });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id, name, email", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully", user: result.rows[0] });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
