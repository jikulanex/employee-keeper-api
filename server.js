const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

// Import `employees` route.
const employees = require("./routes/employees");
// Import `skills` route.
const skills = require("./routes/skills");

// Load environment variables.
dotenv.config({ path: "./config/config.env" });

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

// Initialize server port.
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}.`
  );
});
