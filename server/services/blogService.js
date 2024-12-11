const mongoose = require("mongoose");
const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");

const createBlogService = async (payload) => {
  try {
    const blog = await Blog.create(payload);

    return { blog };
  } catch (err) {
    throw new Error(err?.message);
  }
};

const getAllBlogServices = async () => {
  try {
    const blogs = await Blog.find().populate({
      path: "userId",
      select: "fullName",
    });

    return { blogs };
  } catch (err) {
    throw new Error(err?.message);
  }
};

const getBlogService = async (id) => {
  try {
    const blogDetails = await Blog.findById(id)
      .populate({
        path: "userId",
        select: "fullName",
      })
      .populate({
        path: "comments",
        populate: {
          path: "authorId",
          select: "fullName email createdAt",
        },
      })
      .lean();
  
    if (!blogDetails) {
      return res.status(404).json({
        status: 404,
        message: "Blog not found",
      });
    }

    return { blog: blogDetails };
  } catch (err) {
    throw new Error(err?.message);
  }
};

const updateBlogService = async (id, payload) => {
  try {
    
    const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
      new: true,
    });

    return { updatedBlog };
  } catch (err) {
    throw new Error(err?.message);
  }
};

const deleteBlogService = async (id) => {
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        status: 404,
        message: "Blog not found",
      });
    }
    await Blog.findByIdAndDelete(id);

    await Comment.deleteMany({ blogId: id });

    return { message: "Blog and related comments deleted successfully" };
  } catch (err) {
    throw new Error(err?.message);
  }
};



const flatBlogDetails = async (id) => {
  try {
    
    const flatBlog = await Blog.findById(id);

    return { flatBlog };
  } catch (err) {
    throw new Error(err?.message);
  }
};

module.exports = {
  createBlogService,
  getBlogService,
  getAllBlogServices,
  updateBlogService,
  deleteBlogService,
  flatBlogDetails
};
