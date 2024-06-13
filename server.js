const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const passport = require("passport");
const app = express();
var GoogleStrategy = require("passport-google-oauth20").Strategy;

// Serve static files from the 'build' directory for all hostnames
// app.use(express.static(path.join(__dirname, "build")));

// Serve static files only for app.desktopcrm.com
app.use((req, res, next) => {
  if (req.hostname === "app.desktopcrm.com") {
    express.static(path.join(__dirname, "build"))(req, res, next);
  } else if (req.hostname === "desktopcrm.com") {
    express.static(path.join(__dirname, "build2"))(req, res, next);
  } else {
    next();
  }
});
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "73457248543-vn1bjkn98qogdcljl35job6ek20e82qt.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://app.desktopcrm.com/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
// Handle all other requests
app.get("*", (req, res, next) => {
  if (req.hostname === "app.desktopcrm.com") {
    if (req.url.includes("/auth/google")) {
      next(); // Pass through for other requests
    } else {
      res.sendFile(path.join(__dirname, "build", "index.html"));
    }
    res.sendFile(path.join(__dirname, "build", "index.html"));
  } else if (req.hostname === "desktopcrm.com") {
    res.sendFile(path.join(__dirname, "build2", "index.html"));
  }
});
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
app.get("/auth/google/callback", (req, res) => {
  console.log("🚀 ~ app.get ~ req:", req.url, req.params);
  console.log("yes");
  passport.authenticate(
    "google",
    { failureRedirect: "/sign-in" },
    (req, res) => {
      console.log(req.user);
      res.json({ success: true, user: req.user });
    }
  );
});
const sslOptionsSub = {
  key: fs.readFileSync("desktopcrm.key"),
  cert: fs.readFileSync("desktopcrm_com.crt"),
  ca: fs.readFileSync("desktopcrm_com.ca-bundle"),
};
// Start HTTPS server
https.createServer(sslOptionsSub, app).listen(443, () => {
  console.log("Server running...");
});
