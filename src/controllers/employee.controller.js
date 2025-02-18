const Employee = require("../models/Employee");

exports.getEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const employees = await Employee.find().skip(skip).limit(limit);
    const totalEmployees = await Employee.countDocuments();
    const totalPages = Math.ceil(totalEmployees / limit);

    res.json({
      employees,
      totalPages,
      totalEmployees,
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Add a new employee
exports.addEmployee = async (req, res) => {
  const {
    ID,
    firstName,
    lastName,
    email,
    age,
    class: empClass,
    subjects,
    attendance,
  } = req.body;

  try {
    const existingEmployee = await Employee.findOne({ ID });

    if (existingEmployee) {
      return res
        .status(400)
        .json({ message: "Employee with this ID already exists." });
    }

    const newEmployee = new Employee({
      ID,
      name: {
        first: firstName,
        last: lastName,
      },
      age,
      email,
      class: empClass,
      subjects,
      attendance,
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.updateEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const {
    firstName,
    lastName,
    email,
    age,
    class: empClass,
    subjects,
    attendance,
  } = req.body;

  try {
    const employee = await Employee.findOne({ ID: employeeId });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    employee.name.first = firstName || employee.name.first;
    employee.name.last = lastName || employee.name.last;
    employee.email = email || employee.email;
    employee.age = age || employee.age;
    employee.class = empClass || employee.class;
    employee.subjects = subjects || employee.subjects;
    employee.attendance = attendance || employee.attendance;

    await employee.save();
    res.status(200).json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Delete an employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await Employee.findOneAndDelete({ ID: id });

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
