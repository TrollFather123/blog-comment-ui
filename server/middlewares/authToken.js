const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

exports.authToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if(!token){
        throw new Error("user not authorized!!!")
    }

    const encodedToken = token.split(" ")[1];

    const decodedToken = await jwt.verify(
      encodedToken,
      process.env.JWT_SECRET,
      function (error, decoded) {
        if (error) {
        throw new Error("user not authorized!!!")
        }
        return decoded
      }
    );

    req.userId = decodedToken.userId;

    next();
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: err.message,
    });
  }
};
