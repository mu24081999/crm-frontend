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
// Start HTTPS server
https.createServer(sslOptionsSub, app).listen(443, () => {
  console.log("Server running...");
});
// const express = require("express");
// const https = require("https");
// const fs = require("fs");
// const path = require("path");

// const app = express();

// // Serve static files from the 'build' directory for all hostnames
// // app.use(express.static(path.join(__dirname, "build")));

// // Serve static files only for app.desktopcrm.com
// app.use((req, res, next) => {
//   if (req.hostname === "app.desktopcrm.com") {
//     express.static(path.join(__dirname, "build"))(req, res, next);
//   } else if (req.hostname === "desktopcrm.com") {
//     express.static(path.join(__dirname, "build2"))(req, res, next);
//   } else {
//     next();
//   }
// });

// // Handle all other requests
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// // Load SSL certificate and key dynamically based on req.hostname
// const getSSLOptions = (hostname) => {
//   if (hostname === "app.desktopcrm.com") {
//     return {
//       key: fs.readFileSync("app.desktopcrm.com.key"),
//       cert: fs.readFileSync("app_desktopcrm_com.crt"),
//       ca: fs.readFileSync("app_desktopcrm_com.ca-bundle"),
//     };
//   } else if (hostname === "desktopcrm.com") {
//     return {
//       key: fs.readFileSync("desktopcrm.key"),
//       cert: fs.readFileSync("desktopcrm.crt"),
//       ca: fs.readFileSync("desktopcrm.ca-bundle"),
//     };
//   }
//   // Default SSL options
//   return {
//     key: fs.readFileSync("default.key"),
//     cert: fs.readFileSync("default.crt"),
//     ca: fs.readFileSync("default.ca-bundle"),
//   };
// };

// // Start HTTPS server
// https
//   .createServer((req, res) => {
//     // Get SSL options dynamically based on req.hostname
//     const sslOptions = getSSLOptions(req.hostname);
//     // Create HTTPS server with dynamically determined SSL options
//     app(req, res);
//   }, app)
//   .listen(443, () => {
//     console.log("Server running...");
//   });
