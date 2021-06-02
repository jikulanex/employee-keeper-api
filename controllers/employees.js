const faker = require("faker");

// Find employee data.
const findEmployee = (employees, inputId, callback) => {
  const capturedEmployee = employees.find((item) => {
    return Number(item.id) === Number(inputId);
  });

  if (!capturedEmployee) {
    callback();
  }

  return capturedEmployee;
};

// Fake data
let employees = Array(50)
  .fill("")
  .map((item, index) => {
    return {
      id: index,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      birthDate: faker.date.past(),
    };
  });

// @desc   Get all employees
// @route  GET /api/v1/employees
// @access Public
exports.getEmployees = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: "Show all employees", employees: employees });
};

// @desc   Get single employee
// @route  GET /api/v1/employees/:id
// @access Public
exports.getEmployee = (req, res, next) => {
  const capturedEmployee = findEmployee(employees, req.params.id, () => {
    res.status(400).json({
      success: false,
      msg: `Cannot find employee ${req.params.id}`,
    });
  });

  res.status(200).json({
    success: true,
    msg: `Show employee ${req.params.id}`,
    employees: capturedEmployee,
  });
};

// @desc   Create new employee
// @route  POST /api/v1/employees
// @access Private
exports.createEmployee = (req, res, next) => {
  const newEmployee = { id: employees.length, ...req.body };
  employees = [...employees, newEmployee];

  res
    .status(200)
    .json({ success: true, msg: "Create new employee", employee: newEmployee });
};

// @desc   Update employee
// @route  PUT /api/v1/employees/:id
// @access Private
exports.updateEmployee = (req, res, next) => {
  const capturedEmployee = findEmployee(employees, req.params.id, () => {
    res.status(400).json({
      success: false,
      msg: `Unable to update. Cannot find employee ${req.params.id}`,
    });
  });

  let updatedEmployee;

  employees = employees.map((item) => {
    if (Number(item.id) === Number(capturedEmployee.id)) {
      updatedEmployee = { ...item, ...req.body };
      return updatedEmployee;
    }
    return item;
  });

  res.status(200).json({
    success: true,
    msg: `Update employee ${req.params.id}`,
    employee: updatedEmployee,
  });
};

// @desc   Delete employee
// @route  DELETE /api/v1/employees/:id
// @access Private
exports.deleteEmployee = (req, res, next) => {
  const capturedEmployee = findEmployee(employees, req.params.id, () => {
    res.status(400).json({
      success: false,
      msg: `Unable to delete. Cannot find employee ${req.params.id}`,
    });
  });

  let deletedEmployee;

  employees = employees.filter((item) => {
    if (Number(item.id) === Number(capturedEmployee.id)) {
      deletedEmployee = item;
    }
    return Number(item.id) !== Number(req.params.id);
  });

  res.status(200).json({
    success: true,
    msg: `Delete employee ${req.params.id}`,
    employees: deletedEmployee,
  });
};
