import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import passport from "passport";
import user from "../models/user.model.js";
import dotenv from "dotenv";
import JWT_TOKEN from "../utils/JWT.js";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { name, email } = profile._json;
        let USER = await user.findOne({ email });
        if (!USER) {
          USER = await user.create({
            name,
            email,
            password: "google ji",
            isOauth: true,
          });
          console.log("New User Created Successfully");
        } else {
          console.log("Existing User LogedIn");
        }
        const token = JWT_TOKEN(USER);
        return done(null, { ...USER._doc, token });
      } catch (error) {
        console.log("Error", error.message);
        return done(error, null);
      }
    }
  )
);
