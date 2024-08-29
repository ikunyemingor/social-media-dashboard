const express = require('express');
const session = require('express-session');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Configure session middleware
app.use(session({
  secret: 'your-secret',
  resave: false,
  saveUninitialized: true,
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Twitter Strategy
passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_API_KEY,
  consumerSecret: process.env.TWITTER_API_SECRET,
  callbackURL: "http://localhost:5000/api/auth/twitter/callback"
}, function(token, tokenSecret, profile, done) {
  return done(null, { profile, token, tokenSecret });
}));

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Auth route - Redirects to Twitter login
app.get('/api/auth/twitter', passport.authenticate('twitter'));

// Callback route for Twitter
app.get('/api/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => {
    // On success, redirect to React frontend or send success response
    res.redirect('http://localhost:5173'); // Redirect to your frontend dashboard
  }
);

// Protected route to fetch user followers count
app.get('/api/twitter/followers', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  // Fetch followers count from Twitter API
  const { token, tokenSecret } = req.user;
  const userId = req.user.profile.id;

  axios.get(`https://api.twitter.com/2/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    const followersCount = response.data.public_metrics.followers_count;
    res.json({ followers: followersCount });
  })
  .catch(error => {
    res.status(500).json({ error: 'Failed to fetch followers count' });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
