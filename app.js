const express = require("express");

// Initializations
const db = require("./config/database");
const adminsRoute = require("./routes/api/admins");
const providersRoute = require("./routes/api/providers");
const locationsRoute = require("./routes/api/locations");
const authRoute = require("./routes/api/auth");

const app = express();

// Test db
db.authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

// Middleware
app.use(express.json({ extended: false }));

// Define routes
app.use("/api/admins", adminsRoute);
app.use("/api/providers", providersRoute);
app.use("/api/locations", locationsRoute);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
