const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, "build")));

// Your other routes or middleware can go here

// Load SSL certificate and key
const sslOptions = {
  key: fs.readFileSync("desktopcrm.key"),
  cert: fs.readFileSync("desktopcrm.crt"),
};
console.log("🚀 ~ sslOptions:", path.join(__dirname, "build"));

// Start HTTPS server
https.createServer(sslOptions, app).listen(443, () => {
  console.log("Server running...");
});
