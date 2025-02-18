const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var morgan = require('morgan')
const employeeRoutes = require("./src/routes/employee.route");

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

mongoose
  .connect("mongodb+srv://jitenprmar7:X2QYZRftPjxUBO2T@cluster0.glfcf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/employees", employeeRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
