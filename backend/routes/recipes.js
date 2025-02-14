const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await pool.query("SELECT * FROM recipes ORDER BY created_at DESC");
    res.json(recipes.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a single recipe by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await pool.query("SELECT * FROM recipes WHERE id = $1", [id]);
    if (recipe.rows.length === 0) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Add a new recipe
router.post("/", async (req, res) => {
  const { title, description, ingredients, instructions, image_url } = req.body;

  if (!title || !description || !ingredients || !instructions) {
    return res.status(400).json({ error: "All fields are required except image" });
  }

  try {
    const newRecipe = await pool.query(
      "INSERT INTO recipes (title, description, ingredients, instructions, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, ingredients, instructions, image_url]
    );
    res.json(newRecipe.rows[0]);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).send("Server Error");
  }
});

// Update a recipe
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, ingredients, instructions, image_url } = req.body;

  try {
    const updatedRecipe = await pool.query(
      "UPDATE recipes SET title = $1, description = $2, ingredients = $3, instructions = $4, image_url = $5 WHERE id = $6 RETURNING *",
      [title, description, ingredients, instructions, image_url, id]
    );

    if (updatedRecipe.rows.length === 0) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json(updatedRecipe.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a recipe
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM recipes WHERE id = $1", [id]);
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
