const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name cannot be blank"],
    trim: true,
    maxLength: [50, "First name cannot be more than 50 characters"],
  },
  lastName: {
    type: String,
    required: [true, "First name cannot be blank"],
    trim: true,
    maxLength: [50, "First name cannot be more than 50 characters"],
  },
  skills: {
    type: [String],
    required: true,
  },
  birthDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
