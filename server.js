const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

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
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
const sslOptionsSub = {
  // key: fs.readFileSync("desktopcrm.key"),
  // cert: fs.readFileSync("desktopcrm_com.crt"),
  // ca: fs.readFileSync("desktopcrm_com.ca-bundle"),
};
// Start HTTPS server
https.createServer(sslOptionsSub, app).listen(443, () => {
  console.log("Server running...");
});
http.createServer(app).listen(80, () => {
  console.log("Server running...");
});
