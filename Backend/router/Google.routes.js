import express from 'express';
const router = express.Router();
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, res) {
    res.cookie("token", req.user.token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.redirect(`${process.env.CLIENT_URL}/layout/home`);
  }
);

export default router;