const express = require("express");

// Import `employees` controllers.
const { getEmployees, getEmployee } = require("../controllers/employees");
const { createEmployee, updateEmployee } = require("../controllers/employees");
const { deleteEmployee } = require("../controllers/employees");

// Initialize express router.
const router = express.Router();

// Setup `get` and `post` routes.
router.route("/").get(getEmployees).post(createEmployee);

// Setup another `get` route as well as `put` and `delete` route.
router
  .route("/:id")
  .get(getEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
