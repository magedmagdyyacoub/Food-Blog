const pool = require("../config/db");

// Create Comment
const createComment = async (blogId, userId, content) => {
  const result = await pool.query(
    "INSERT INTO comments (blog_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
    [blogId, userId, content]
  );
  return result.rows[0];
};

// Get Comments by Blog ID
const getCommentsByBlogId = async (blogId) => {
  const result = await pool.query(
    `SELECT c.id, c.content, c.created_at, u.username 
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.blog_id = $1
     ORDER BY c.created_at DESC`,
    [blogId]
  );
  return result.rows;
};

module.exports = { createComment, getCommentsByBlogId };
