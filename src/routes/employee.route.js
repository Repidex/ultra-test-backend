const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller");
const authenticate = require("../middlewares/auth");
const authorize = require("../middlewares/role");

// router.use(authenticate);

router.get(
  "/allUsers",
  // authorize(["admin", "manager"]),
  employeeController.getEmployees
);
router.post("/addUsers", employeeController.addEmployee); // Only admin
router.put("/updateUser/:id", employeeController.updateEmployee); // Admin and manager
router.delete("/deleteUser/:id", employeeController.deleteEmployee); // Only admin

module.exports = router;
