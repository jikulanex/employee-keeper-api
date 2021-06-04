const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

// Load custom error handler.
const { errorHandler } = require("./middleware/error");

// Load environment variables.
dotenv.config({ path: "./config/config.env" });

// Connect to the database.
connectDB();

// Import `employees` route.
const employees = require("./routes/employees");
// Import `skills` route.
const skills = require("./routes/skills");

// Initialize express application.
const app = express();

// Initialize express middlewares.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize morgan middleware only in `development` mode.
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount the `employee` router.
app.use("/api/v1/employees", employees);
// Mount the `skills` router.
app.use("/api/v1/skills", skills);

// Make use of the custom error handler.
app.use(errorHandler);

// Initialize server port.
const port = process.env.PORT || 5000;

// Run the server.
const server = app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}.`.white.bold
  );
});

// Handle unhandled promise rejections.
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`.red);

  // Close the server and exit the process.
  server.close(() => process.exit(1));
});
