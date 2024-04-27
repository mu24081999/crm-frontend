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
// Load SSL certificate and key
const landingSslOptions = {
  key: fs.readFileSync("desktopcrm.key"),
  cert: fs.readFileSync("desktopcrm.crt"),
  ca: fs.readFileSync("desktopcrm.ca-bundle"),
};
const dashboardSslOptions = {
  key: fs.readFileSync("app.desktopcrm.com.key"),
  cert: fs.readFileSync("app_desktopcrm_com.crt"),
  // cert: fs.readFileSync("desktopcrm_com.crt"),
  ca: fs.readFileSync("app_desktopcrm_com.ca-bundle"),
  // ca: fs.readFileSync("desktopcrm.ca-bundle"),
};

// HTTPS server creation function
// Function to create HTTPS server with SSL options based on the hostname
function createServerWithSSLOptions(req) {
  // Determine SSL options based on the hostname
  let sslOptions =
    req.hostname === "desktopcrm.com" ? landingSslOptions : dashboardSslOptions;

  // Create and return HTTPS server with the determined SSL options
  return https.createServer(sslOptions, app);
}

// Create HTTPS server based on request hostname
app.use((req, res, next) => {
  const server = createServerWithSSLOptions(req);
  console.log("🚀 ~ app.use ~ server:", server);
  server.listen(443, () => {
    console.log("Server running...");
  });
  next();
});

// Start HTTPS server
// https.createServer(sslOptions, app).listen(443, () => {
//   console.log("Server running...");
// });
