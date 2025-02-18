const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  ID: { type: String, required: true, unique: true }, // Unique ID for each employee
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  class: { type: String, required: true }, // Can represent the employee's class, department, etc.
  subjects: [{ type: String }], // List of subjects the employee is associated with
  attendance: [{ date: Date, present: Boolean }], // Array of attendance records
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
