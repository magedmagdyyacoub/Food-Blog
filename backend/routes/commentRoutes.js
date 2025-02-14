// commentRoutes.js
const express = require("express");
const { createComment, getComments } = require("../controllers/commentController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateUser, createComment);
router.get("/:blogId", getComments);

module.exports = router;