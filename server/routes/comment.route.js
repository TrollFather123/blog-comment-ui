const commentController = require("../controller/commentController")
const { authToken } = require("../middlewares/authToken");
const express = require("express");

const router = express.Router();

router.post("/create-comment",authToken,commentController.createComment);
router.delete("/delete-comment/:commentId",authToken,commentController.deleteComment);
router.put("/update-comment/:id",authToken,commentController.updateComment);

module.exports = router