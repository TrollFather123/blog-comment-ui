const blogController = require("../controller/blogController")
const express = require("express");
const upload = require("../utils/multer.config");
const { authToken } = require("../middlewares/authToken");

const router = express.Router();


router.get("/",authToken,blogController.getAllBlogs);
router.post("/create-blog",authToken,upload.single("image"),blogController.createBlog);
router.get("/blog-details/:blog_id",authToken,blogController.getBlogDetails);
router.put("/:blog_id",authToken,upload.single("image"),blogController.updateBlog);
router.delete("/:blog_id",authToken,blogController.deleteBlog);


module.exports = router