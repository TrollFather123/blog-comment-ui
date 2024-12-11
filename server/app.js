const userRouter = require("./routes/user.router");
const blogRouter = require("./routes/blog.router");
const commentRouter = require("./routes/comment.route");
const path = require("path")
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({
  path:'./.env'
});

const app = express();
const PORT = process.env.PORT || 3000;
const DB = process.env.DB_CONNECTION_STRING;

app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json());
app.use(
  cors({
    path: "*",
  })
);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/user",userRouter);
app.use("/api/blog",blogRouter);
app.use("/api/comment",commentRouter);

app.get("/",(req,res)=>{
  res.send("API is running")
})
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });


module.exports = app