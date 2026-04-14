import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://gym-website-1-st5g.onrender.com/api/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {

    console.log("PROFILE:", profile);

    if (!profile.emails || profile.emails.length === 0) {
      return done(new Error("No email found from Google"), null);
    }

    const email = profile.emails[0].value;

    let user = await User.findOne({ email });
    

    if (!user) {
      user = await User.create({
        name: profile.displayName || "User",
        email,
        googleId: profile.id
      });
    }

    return done(null, user);

  } catch (error) {
    console.log("GOOGLE ERROR:", error);
    return done(error, null);
  }
}));