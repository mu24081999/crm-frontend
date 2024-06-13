const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const passport = require("passport");
const app = express();

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
app.get("/auth/google/callback", (req, res) => {
  console.log("🚀 ~ app.get ~ req:", req.url, req.params);
  console.log("yes");
  passport.authenticate(
    "google",
    { failureRedirect: "/" },
    (err, user, info) => {
      console.log(user, err, info);
    }
  );
  res.json({ success: true });
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
