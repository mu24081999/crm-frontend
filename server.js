const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();

// Serve static files only for app.desktopcrm.com and desktopcrm.com
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

// Load SSL certificates
const landingSslOptions = {
  key: fs.readFileSync("desktopcrm.key"),
  cert: fs.readFileSync("desktopcrm.crt"),
  ca: fs.readFileSync("desktopcrm.ca-bundle"),
};
const dashboardSslOptions = {
  key: fs.readFileSync("app.desktopcrm.com.key"),
  cert: fs.readFileSync("app_desktopcrm_com.crt"),
  ca: fs.readFileSync("app_desktopcrm_com.ca-bundle"),
};

// Function to create HTTPS server with SSL options based on the hostname
function createServerWithSSLOptions(req) {
  // Determine SSL options based on the hostname
  const sslOptions =
    req.hostname === "desktopcrm.com" ? landingSslOptions : dashboardSslOptions;

  // Create and return HTTPS server with the determined SSL options
  return https.createServer(sslOptions, app);
}

// Middleware to create and start HTTPS server based on request hostname
app.use((req, res, next) => {
  const server = createServerWithSSLOptions(req);
  console.log("🚀 ~ app.use ~ server:", server);
  server.listen(443, () => {
    console.log("Server running...");
  });
  next();
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
server.listen(443, () => {
  console.log("Server running...");
});

// Error handling
server.on("error", (error) => {
  console.error("Server error:", error);
});
