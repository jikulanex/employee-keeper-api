const Employee = require("../models/Employees");

// Import custom error response class.
const ErrorResponse = require("../utils/errorResponse");

// Import utility functions
const { executeDbAction, checkIfDataIsNull } = require("../utils");

// @desc   Get all employees
// @route  GET /api/v1/employees
// @access Public
exports.getEmployees = (req, res, next) => {
  executeDbAction(
    async () => {
      // Fetch all employee data.
      const employees = await Employee.find();

      res
        .status(200)
        .json({ success: true, count: employees.length, data: employees });
    },
    (error) => {
      next(error);
    }
  );
};

// @desc   Get single employee
// @route  GET /api/v1/employees/:id
// @access Public
exports.getEmployee = (req, res, next) => {
  executeDbAction(
    async () => {
      // Find employee data based on the given ID.
      const employee = await Employee.findById(req.params.id);

      // When a correctly-formatted ID is passed but employee data is null, send error 400.
      checkIfDataIsNull(employee, () => {
        return next(
          new ErrorResponse(
            `Employee data not found with id ${req.params.id}`,
            404
          )
        );
      });

      res.status(200).json({ success: true, data: employee });
    },
    (error) => {
      next(error);
    }
  );
};

// @desc   Create new employee
// @route  POST /api/v1/employees
// @access Private
exports.createEmployee = (req, res, next) => {
  executeDbAction(
    async () => {
      // Create new employee data.
      const employee = await Employee.create(req.body);
      res.status(201).json({ success: true, data: employee });
    },
    (error) => {
      next(error);
    }
  );
};

// @desc   Update employee
// @route  PUT /api/v1/employees/:id
// @access Private
exports.updateEmployee = (req, res, next) => {
  executeDbAction(
    async () => {
      // Find and update employee data.
      const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      // When a correctly-formatted ID is passed but employee data is null, send error 400.
      checkIfDataIsNull(employee, () => {
        return next(
          new ErrorResponse(
            `Employee data not found with id ${req.params.id}`,
            404
          )
        );
      });

      res.status(200).json({ success: true, data: employee });
    },
    (error) => {
      next(error);
    }
  );
};

// @desc   Delete employee
// @route  DELETE /api/v1/employees/:id
// @access Private
exports.deleteEmployee = (req, res, next) => {
  executeDbAction(
    async () => {
      // Find and delete employee data.
      const employee = await Employee.findByIdAndDelete(req.params.id);

      // When a correctly-formatted ID is passed but employee data is null, send error 400.
      checkIfDataIsNull(employee, () => {
        return next(
          new ErrorResponse(
            `Employee data not found with id ${req.params.id}`,
            404
          )
        );
      });

      res.status(200).json({ success: true, data: {} });
    },
    (error) => {
      next(error);
    }
  );
};
