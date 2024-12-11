const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      }
    ],
    image: {
      type: String,
    },
    title: {
      type: String,
      reuired:[true,"Blog Title is required"]
    },
    description: {
      type: String,
      reuired: [true, "Description is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
