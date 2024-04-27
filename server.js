const express = require("express");
const https = require("https");
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
// Load SSL certificate and key
// const sslOptions = {
//   key: fs.readFileSync("desktopcrm.key"),
//   cert: fs.readFileSync("desktopcrm.crt"),
//   ca: fs.readFileSync("desktopcrm.ca-bundle"),
// };
const sslOptionsMain = {
  key: fs.readFileSync("desktopcrm.key"),
  cert: fs.readFileSync("desktopcrm.crt"),
  ca: fs.readFileSync("desktopcrm.ca-bundle"),
};
const sslOptionsSub = {
  key: fs.readFileSync("app.desktopcrm.com.key"),
  cert: fs.readFileSync("app_desktopcrm_com.crt"),
  // cert: fs.readFileSync("desktopcrm_com.crt"),
  ca: fs.readFileSync("app_desktopcrm_com.ca-bundle"),
  // ca: fs.readFileSync("desktopcrm.ca-bundle"),
};

const server = https.createServer((req, res) => {
  // Check the hostname from the request
  const hostname = req.hostname;

  // Serve the appropriate certificate based on the hostname
  if (hostname === "desktopcrm.com") {
    handleRequest(req, res, sslOptionsMain);
  } else if (hostname === "app.desktopcrm.com") {
    handleRequest(req, res, sslOptionsSub);
  } else {
    res.writeHead(400);
    res.end("Invalid hostname");
  }
});
console.log("🚀 ~ server ~ server:", server);
function handleRequest(req, res, options) {
  res.writeHead(200);
  res.end("Hello, HTTPS!");
}
server.listen(443, () => {
  console.log("Server is listening on port 443");
});
// Start HTTPS server
// https.createServer(sslOptions, app).listen(443, () => {
//   console.log("Server running...");
// });
