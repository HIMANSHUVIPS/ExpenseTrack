import user from "../models/user.model.js";
import bcrypt from "bcrypt";
import JWT_TOKEN from "../utils/JWT.js";

export const Signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(404).json({
        success: false,
        message: "Email Already Exists",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const USER = await user.create({
      name,
      email,
      password: hash,
      isOauth: false,
    });
    const token = JWT_TOKEN(USER);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(200).json({
      success: true,
      message: "User Created Successfully",
      token,
      user: { ...USER._doc, password: undefined }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Signup failed",
      error: error.message,
    });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const USER = await user.findOne({ email });
    if (!USER) {
      return res.status(404).json({
        success: false,
        message: "Email Not Exists"
      });
    }
    const compare = await bcrypt.compare(password, USER.password);
    if (!compare) {
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password"
      });
    }
    const token = JWT_TOKEN(USER);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(200).json({
      success: true,
      message: "User LogedIn successfully",
      token,
      user: { ...USER._doc, password: undefined }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "User LogedOut Successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};