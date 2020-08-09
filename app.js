const express = require("express");
const path = require("path");
var cors = require("cors");

// Initializations
const db = require("./config/database");
const usersRoute = require("./routes/api/users");
const driversRoute = require("./routes/api/drivers");
const providersRoute = require("./routes/api/providers");
const clientsRoute = require("./routes/api/clients");
const vehiclesRoute = require("./routes/api/vehicles");
const piaRoute = require("./routes/api/pia");
const authRoute = require("./routes/api/auth");

const app = express();

// Test db
db.authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

app.use(cors());

// Middleware
app.use(express.json({ extended: false }));

// Define routes
app.use("/api/users", usersRoute);
app.use("/api/drivers", driversRoute);
app.use("/api/providers", providersRoute);
app.use("/api/clients", clientsRoute);
app.use("/api/vehicles", vehiclesRoute);
app.use("/api/pia", piaRoute);
app.use("/api/auth", authRoute);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
