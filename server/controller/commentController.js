const CommentService = require("../services/commentService");

const createComment = async (req, res, next) => {
  try {
    const { authorId, blogId, comment } = req.body;
    const { newComment } = await CommentService.createCommentService({
      authorId,
      comment,
      blogId,
    });

    return res.status(201).json({
      status: 201,
      message: "Comment created successfully",
      newComment,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { message } = await CommentService.deleteCommentService(commentId);

    return res.status(204).json({
      status: 204,
      message,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const payload = req.body; 

    const { updatedComment } = await CommentService.updateCommentService(id, payload);

    return res.status(204).json({
      status: 204,
      message: "Comment updated successfully!!!",
      data: updatedComment,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};


module.exports = {
  createComment,
  deleteComment,
  updateComment,
};
