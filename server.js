const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const os = require("os");
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
let sslOptions;
switch (os.hostname()) {
  case "desktopcrm.com":
    sslOptions = {
      // key: fs.readFileSync("app.desktopcrm.com.key"),
      key: fs.readFileSync("desktopcrm.key"),
      // cert: fs.readFileSync("app_desktopcrm_com.crt"),
      cert: fs.readFileSync("desktopcrm_com.crt"),
      // ca: fs.readFileSync("app_desktopcrm_com.ca-bundle"),
      ca: fs.readFileSync("desktopcrm.ca-bundle"),
    };
    break;
  case "app.desktopcrm.com":
    sslOptions = {
      key: fs.readFileSync("app.desktopcrm.com.key"),
      cert: fs.readFileSync("app_desktopcrm_com.crt"),
      // cert: fs.readFileSync("desktopcrm_com.crt"),
      ca: fs.readFileSync("app_desktopcrm_com.ca-bundle"),
      // ca: fs.readFileSync("desktopcrm.ca-bundle"),
    };
    break;
  default:
    sslOptions = {
      key: fs.readFileSync("app.desktopcrm.com.key"),
      cert: fs.readFileSync("app_desktopcrm_com.crt"),
      // cert: fs.readFileSync("desktopcrm_com.crt"),
      ca: fs.readFileSync("app_desktopcrm_com.ca-bundle"),
      // ca: fs.readFileSync("desktopcrm.ca-bundle"),
    };
}
// Load SSL certificate and key
// const sslOptions = {
//   key: fs.readFileSync("desktopcrm.key"),
//   cert: fs.readFileSync("desktopcrm.crt"),
//   ca: fs.readFileSync("desktopcrm.ca-bundle"),
// };
sslOptions = {
  key: fs.readFileSync("app.desktopcrm.com.key"),
  cert: fs.readFileSync("app_desktopcrm_com.crt"),
  // cert: fs.readFileSync("desktopcrm_com.crt"),
  ca: fs.readFileSync("app_desktopcrm_com.ca-bundle"),
  // ca: fs.readFileSync("desktopcrm.ca-bundle"),
};

// Start HTTPS server
https.createServer(sslOptions, app).listen(443, () => {
  console.log("Server running...");
});
