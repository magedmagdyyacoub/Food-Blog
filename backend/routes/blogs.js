const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Get all blog posts
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM blogs ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single blog post by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM blogs WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Blog not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new blog post
router.post("/", async (req, res) => {
  try {
    const { title, content, image_url } = req.body;
    const result = await pool.query(
      "INSERT INTO blogs (title, content, image_url) VALUES ($1, $2, $3) RETURNING *",
      [title, content, image_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a blog post
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image_url } = req.body;
    const result = await pool.query(
      "UPDATE blogs SET title = $1, content = $2, image_url = $3 WHERE id = $4 RETURNING *",
      [title, content, image_url, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Blog not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a blog post
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM blogs WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
