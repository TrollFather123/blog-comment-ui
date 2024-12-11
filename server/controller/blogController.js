const BlogService = require("../services/blogService");

const createBlog = async (req, res, next) => {
  try {
    const blogImage = req?.file ? `${req.file.filename}` : "";

    const payload = {
      ...req.body,
      image: blogImage,
      comments: [],
    };
    const { blog } = await BlogService.createBlogService(payload);

    return res.status(201).json({
      status: 201,
      message: "Blog created successfully",
      blog,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};
const getAllBlogs = async (req, res, next) => {
  try {
    const { blogs } = await BlogService.getAllBlogServices();

    return res.status(200).json({
      status: 200,
      message: "Blog fetched successfully",
      blogs,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};
const getBlogDetails = async (req, res, next) => {
  try {
    const { blog_id } = req.params;
    const { blog } = await BlogService.getBlogService(blog_id);

    return res.status(200).json({
      status: 200,
      message: "Blog fetched successfully",
      blog,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { blog_id } = req.params;


    const { flatBlog } = await BlogService.flatBlogDetails(blog_id);

    const blogImage = req?.file ? `${req.file.filename}` : flatBlog.image;

    const data = {
      ...req.body,
      comments:flatBlog.comments,
      image: blogImage,
    };

    console.log(data,req.body,"data")

    const { updatedBlog } = await BlogService.updateBlogService(blog_id, data);

    return res.status(200).json({
      status: 200,
      message: "Blog updated successfully",
      updatedBlog,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { blog_id } = req.params;
    const { message } = await BlogService.deleteBlogService(blog_id);

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

module.exports = {
  createBlog,
  getBlogDetails,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
