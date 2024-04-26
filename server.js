const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();
let sslOptions;

// Serve static files from the 'build' directory for all hostnames
// app.use(express.static(path.join(__dirname, "build")));

// Serve static files only for app.desktopcrm.com
app.use((req, res, next) => {
  if (req.hostname === "app.desktopcrm.com") {
    express.static(path.join(__dirname, "build"))(req, res, next);

    sslOptions = {
      key: fs.readFileSync("app.desktopcrm.com.key"),
      cert: fs.readFileSync("app_desktopcrm_com.crt"),
      // cert: fs.readFileSync("desktopcrm_com.crt"),
      ca: fs.readFileSync("app_desktopcrm_com.ca-bundle"),
      // ca: fs.readFileSync("desktopcrm.ca-bundle"),
    };
  } else if (req.hostname === "desktopcrm.com") {
    express.static(path.join(__dirname, "build2"))(req, res, next);
    // Load SSL certificate and key
    sslOptions = {
      key: fs.readFileSync("desktopcrm.key"),
      cert: fs.readFileSync("desktopcrm.crt"),
      ca: fs.readFileSync("desktopcrm.ca-bundle"),
    };
  } else {
    next();
  }
});

// Handle all other requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start HTTPS server
https.createServer(sslOptions, app).listen(443, () => {
  console.log("Server running...");
});
