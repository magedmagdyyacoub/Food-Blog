// commentController.js
const pool = require("../config/db");

const createComment = async (req, res) => {
  const { blog_id, user_id, content } = req.body;

  try {
    const newComment = await pool.query(
      'INSERT INTO comments (blog_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
      [blog_id, user_id, content]
    );

    res.status(201).json(newComment.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create comment', details: error.message });
  }
};

const getCommentsByBlogId = async (blogId) => {
  const result = await pool.query('SELECT * FROM comments WHERE blog_id = $1 ORDER BY created_at DESC', [blogId]);
  return result.rows;
};

const getComments = async (req, res) => {
  const { blogId } = req.params;

  try {
    const comments = await getCommentsByBlogId(blogId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to get comments", details: error.message });
  }
};

module.exports = { createComment, getComments };