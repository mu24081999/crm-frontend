// const express = require("express");
// const https = require("https");
// const fs = require("fs");
// const path = require("path");

// const app = express();

// // Serve static files only for app.desktopcrm.com and desktopcrm.com
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

// // Load SSL certificates
// const landingSslOptions = {
//   key: fs.readFileSync("desktopcrm.key"),
//   cert: fs.readFileSync("desktopcrm.crt"),
//   ca: fs.readFileSync("desktopcrm.ca-bundle"),
// };
// const dashboardSslOptions = {
//   key: fs.readFileSync("app.desktopcrm.com.key"),
//   cert: fs.readFileSync("app_desktopcrm_com.crt"),
//   ca: fs.readFileSync("app_desktopcrm_com.ca-bundle"),
// };

// // Function to create HTTPS server with SSL options based on the hostname
// function createServerWithSSLOptions(req) {
//   // Determine SSL options based on the hostname
//   const sslOptions =
//     req.hostname === "desktopcrm.com" ? landingSslOptions : dashboardSslOptions;

//   // Create and return HTTPS server with the determined SSL options
//   return https.createServer(sslOptions, app);
// }

// // Middleware to create and start HTTPS server based on request hostname
// app.use((req, res, next) => {
//   const server = createServerWithSSLOptions(req);
//   console.log("🚀 ~ app.use ~ server:", server);
//   server.listen(443, () => {
//     console.log("Server running...");
//   });
//   next();
// });

// // Error handling
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broken!");
// });
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

// Load SSL certificates (ensure proper validation and handling of errors)
const landingSslOptions = {
  key: validateAndGetCertificate("desktopcrm.key"),
  cert: validateAndGetCertificate("desktopcrm.crt"),
  ca: validateAndGetCertificate("desktopcrm.ca-bundle"), // Optional for client CA validation
};
const dashboardSslOptions = {
  key: validateAndGetCertificate("app.desktopcrm.com.key"),
  cert: validateAndGetCertificate("app_desktopcrm_com.crt"),
  ca: validateAndGetCertificate("app_desktopcrm_com.ca-bundle"), // Optional for client CA validation
};

// Function to validate and get certificate/key (add error handling)
function validateAndGetCertificate(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    // Perform additional validation on certificate content (e.g., expiry date)
    return content;
  } catch (err) {
    console.error("Error reading certificate/key:", err);
    // Handle the error appropriately (e.g., exit process)
    process.exit(1);
  }
}

// Create separate HTTPS servers with pre-configured SSL options
// const landingServer = https.createServer(landingSslOptions, app);
// const dashboardServer = https.createServer(dashboardSslOptions, app);
let server;
// Route requests to appropriate server based on hostname (using a switch statement for clarity)
app.use((req, res, next) => {
  switch (req.hostname) {
    case "desktopcrm.com":
      // landingServer.emit("request", req, res);
      server = https.createServer(landingSslOptions, app);
      break;
    case "app.desktopcrm.com":
      // dashboardServer.emit("request", req, res);
      server = https.createServer(dashboardSslOptions, app);

      break;
    default:
      // Handle invalid hostnames (e.g., return an error)
      res.status(400).send("Invalid hostname");
  }
  server.emit("request", req, res);
});

// Error handling (improve for more specific error messages)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});
console.log("server: " + server);
server.listen(443, () => {
  console.log("Landing server running on port 443...");
});
// dashboardServer.listen(443, () => {
//   console.log("Dashboard server running on port 443...");
// });
