// const express = require("express");
// const https = require("https");
// const fs = require("fs");
// const path = require("path");
// const os = require("os");
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
// let sslOptions;
// console.log("🚀 ~ sslOptions:", os.hostname());

// if (os.hostname() === "desktopcrm.com") {
//   sslOptions = {
//     // key: fs.readFileSync("app.desktopcrm.com.key"),
//     key: fs.readFileSync("desktopcrm.key"),
//     // cert: fs.readFileSync("app_desktopcrm_com.crt"),
//     cert: fs.readFileSync("desktopcrm.crt"),
//     // ca: fs.readFileSync("app_desktopcrm_com.ca-bundle"),
//     ca: fs.readFileSync("desktopcrm.ca-bundle"),
//   };
// } else {
//   sslOptions = {
//     key: fs.readFileSync("app.desktopcrm.com.key"),
//     cert: fs.readFileSync("app_desktopcrm_com.crt"),
//     // cert: fs.readFileSync("desktopcrm_com.crt"),
//     ca: fs.readFileSync("app_desktopcrm_com.ca-bundle"),
//     // ca: fs.readFileSync("desktopcrm.ca-bundle"),
//   };
// }

// console.log("🚀 ~ sslOptions:", sslOptions);

// // Load SSL certificate and key
// // const sslOptions = {
// //   key: fs.readFileSync("desktopcrm.key"),
// //   cert: fs.readFileSync("desktopcrm.crt"),
// //   ca: fs.readFileSync("desktopcrm.ca-bundle"),
// // };
// // sslOptions = {
// //   key: fs.readFileSync("app.desktopcrm.com.key"),
// //   cert: fs.readFileSync("app_desktopcrm_com.crt"),
// //   // cert: fs.readFileSync("desktopcrm_com.crt"),
// //   ca: fs.readFileSync("app_desktopcrm_com.ca-bundle"),
// //   // ca: fs.readFileSync("desktopcrm.ca-bundle"),
// // };

// // Start HTTPS server
// https.createServer(sslOptions, app).listen(443, () => {
//   console.log("Server running...");
// });
const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const app = express();

// Middleware to serve static files based on hostname
app.use((req, res, next) => {
  let sslOptions;
  if (req.hostname === "desktopcrm.com") {
    sslOptions = {
      key: fs.readFileSync("desktopcrm.key"),
      cert: fs.readFileSync("desktopcrm.crt"),
      ca: fs.readFileSync("desktopcrm.ca-bundle"),
    };
  } else {
    sslOptions = {
      key: fs.readFileSync("app.desktopcrm.com.key"),
      cert: fs.readFileSync("app_desktopcrm_com.crt"),
      ca: fs.readFileSync("app_desktopcrm_com.ca-bundle"),
    };
  }
  req.sslOptions = sslOptions; // Store sslOptions in req for later use
  next();
});

// Serve static files based on hostname
app.use(
  express.static((req, res, next) => {
    if (req.hostname === "app.desktopcrm.com") {
      express.static(path.join(__dirname, "build"))(req, res, next);
    } else if (req.hostname === "desktopcrm.com") {
      express.static(path.join(__dirname, "build2"))(req, res, next);
    } else {
      next();
    }
  })
);

// Handle all other requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start HTTPS server
app.listen(443, () => {
  console.log("Server running...");
});

// Start HTTPS server with SSL options
https
  .createServer(
    (req, res) => {
      app(req, res); // Use Express app as the request handler
    },
    (req, socket, head) => {
      const sslOptions = req.sslOptions; // Retrieve sslOptions from req
      https
        .createServer(sslOptions, (req, res) => {
          res.end();
        })
        .emit("connection", socket, head);
    }
  )
  .listen(443, () => {
    console.log("HTTPS server running...");
  });
