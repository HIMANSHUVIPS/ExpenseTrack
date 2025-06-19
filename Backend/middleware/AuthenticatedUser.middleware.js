import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const AutheticatedUser = (req,res,next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You need to login to access this route",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("Token is invalid");
      } else {
        console.log("Decoded Token:", decoded);
      }
      req.user = decode;
      next();
    });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({
      success: false,
      message: "Authentication User Error",
    });
  }
};
