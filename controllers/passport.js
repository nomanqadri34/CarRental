import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userModel from '../models/usermodel.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, emails, displayName } = profile;
      const email = emails[0].value;

      try {
        let user = await userModel.findOne({ googleId: id });

        if (!user) {
          user = await userModel.findOne({ email });

          if (user) {
            user.googleId = id;
            await user.save();
          } else {
            user = await new userModel({
              name: displayName,
              email,
              googleId: id,
            }).save();
          }
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
