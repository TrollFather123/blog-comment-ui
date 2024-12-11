const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
