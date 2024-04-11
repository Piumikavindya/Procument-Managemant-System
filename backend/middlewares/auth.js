const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../Models/user'); // Import your User model

// Define the local strategy
passport.use(new LocalStrategy({
    usernameField: 'email', // Assuming email is used as the username
    passwordField: 'password',
    passReqToCallback: true // Pass request object to callback
  },
  async function(req, email, password, done) {
    const { role } = req.body; // Extract role from request body

    try {
      // Find user by email in your database
      const user = await User.findOne({ email });

      // If user not found or password doesn't match, return error
      if (!user || !(await user.comparePassword(password))) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      // If provided role is not in user's role, return error
      if (!user.role.includes(role)) {
        return done(null, false, { message: 'Invalid role' });
      }

      // If everything is correct, return the user
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
};
